import { Paper } from '@mui/material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';
import icon from '../../images/place.svg';
import { LeafletMapProps } from '../../types';
import styles from './LeafletMap.module.css';

export default function LeafletMap(props: LeafletMapProps) {
  const { name, position } = props;

  const customIcon = new L.Icon({//creating a custom icon to use in Marker
    iconUrl: icon.toString(),
    iconSize: [48, 48],
    iconAnchor: [24, 48]
  });

  return (
    <Paper sx={{ width: '50%', height: '480px' }} elevation={1}>
      <MapContainer
        center={position}
        className={styles.map}
        zoom={16}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker key={name} position={position} icon={customIcon}>
          <Tooltip>{name}</Tooltip>
        </Marker>
      </MapContainer>
    </Paper>
  );
}
