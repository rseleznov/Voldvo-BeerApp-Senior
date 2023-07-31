type TYPE =
  | 'micro'
  | 'nano'
  | 'regional'
  | 'brewpub'
  | 'large'
  | 'planning'
  | 'bar'
  | 'contract'
  | 'proprietor'
  | 'closed';

type SORT = 'asc' | 'desc';

type SORT_BY =
  | 'id'
  | 'name'
  | 'brewery_type'
  | 'address_1'
  | 'address_2'
  | 'address_3'
  | 'city'
  | 'state_province'
  | 'postal_code'
  | 'country'
  | 'longitude'
  | 'latitude'
  | 'phone'
  | 'website_url'
  | 'state'
  | 'street';

type ALIGN =
  | 'center'
  | 'left'
  | 'right'
  | 'justify'
  | 'inherit'
  | undefined;

export type { TYPE, SORT, SORT_BY, ALIGN };
