import React, { ReactNode } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const defaultCenter = { lat: 0, lng: 0 };

interface GoogleMaps {
  initialPosition: Location;
  selectedPosition?: Location;
  keyMap?: string;
  handleMapClick(location: Location): void;
}

interface RegularMapProps extends GoogleMaps {
  googleMapURL: string;
  loadingElement: ReactNode;
  containerElement: ReactNode;
  mapElement: ReactNode;
}

interface Location {
  lat: number;
  lng: number;
}

const RegularMap = withScriptjs(
  withGoogleMap(
    ({initialPosition, selectedPosition = defaultCenter, handleMapClick}: RegularMapProps) => {
    return (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={initialPosition}
        defaultOptions={{ 
          scrollwheel: true,
        }}
        onClick={(event) => {
          handleMapClick({
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
          })
        }}
      >
        <Marker position={ initialPosition || selectedPosition } />
      </GoogleMap>
    )
  }
  )
);

const loadingElementStyle = { height: '100%' };
const containerElementStyle = { height: '320px', marginBottom: 32 };
const mapElementStyle = { height: '100%', borderRadius: 10 };


export default function GoogleMaps({ initialPosition, selectedPosition, keyMap, handleMapClick }: GoogleMaps){
  return (
    <RegularMap
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${keyMap || ''}`}
      loadingElement={<div style={ loadingElementStyle } />}
      containerElement={<div style={ containerElementStyle } />}
      mapElement={<div style={ mapElementStyle } />}
      initialPosition={initialPosition}
      selectedPosition={selectedPosition}
      handleMapClick={handleMapClick}
    />
  );
}