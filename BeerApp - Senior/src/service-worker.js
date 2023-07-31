self.addEventListener('install', event => {
  const offlinePage = new Request('/');
  event.waitUntil(
    fetch(offlinePage).then(response => {
      return caches.open('offline').then(cache => {
        return cache.put(offlinePage, response);
      });
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.open('offline').then(cache => {
        return cache.match('/');
      });
    })
  );
});
