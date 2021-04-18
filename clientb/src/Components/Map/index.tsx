import { LeafletMouseEvent } from 'leaflet';
import { Map as ReactLeafletMap, Popup, TileLayer, Marker } from 'react-leaflet';

interface MapProps {
  handleMapClick(event: LeafletMouseEvent): void;
  initialPosition: [number, number];
  selectedPosition: [number, number];
}

export default function ({ handleMapClick, initialPosition, selectedPosition }: MapProps){
  return (
    <ReactLeafletMap center={initialPosition} zoom={13} onClick={handleMapClick}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={selectedPosition || initialPosition}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
      </Marker>
    </ReactLeafletMap>
  )
}