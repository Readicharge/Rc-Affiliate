"use client"
import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, Circle, InfoWindow, LoadScriptNext, useLoadScript } from '@react-google-maps/api';

const MapComponent = ({ usersData, centralAddress, areaValue }: any) => {
  const googleMapsApiKey = 'AIzaSyAlr7wiWbiPhgKpWAN7lNSAxgwhujouyc4';
  const centralAddressCoordinates = { lat: 40.712, lng: -74.0050 };
  const radius = Math.sqrt(areaValue / Math.PI);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey,
  });

  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    // Add any additional logic or data processing here
  }, [usersData, centralAddress, areaValue]);

  const handleMarkerClick = (marker:any) => {
    setSelectedMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      center={centralAddressCoordinates}
      zoom={13}
      mapContainerStyle={{ height: '400px', width: '100%', borderRadius:19 }}
      options={{
        streetViewControl: false,
        fullscreenControl: false,
      }}
    >
      {/* Central Marker with InfoWindow */}
      <Marker
        position={centralAddressCoordinates}
        icon={{
          url: '/path/to/custom-marker.png',
          scaledSize: new window.google.maps.Size(32, 32),
        }}
        onClick={() => handleMarkerClick('central')}
      />

      {/* User Markers */}
      {usersData.map((user: any, index: any) => (
        <Marker
          key={index}
          position={{ lat: user.latitude, lng: user.longitude }}
          onClick={() => handleMarkerClick(user)}
        >
          {/* You can customize the user markers here */}
        </Marker>
      ))}

      {/* Circumference Circle */}
      <Circle
        center={centralAddressCoordinates}
        radius={radius}
        options={{
          fillColor: '#00FF00',
          fillOpacity: 0.2,
          strokeColor: '#00FF00',
          strokeOpacity: 0.8,
          strokeWeight: 2,
        }}
      />

      {/* InfoWindow */}
      {selectedMarker && (
        <InfoWindow
          position={
            selectedMarker === 'central'
              ? centralAddressCoordinates
              : { lat: selectedMarker.latitude, lng: selectedMarker.longitude }
          }
          onCloseClick={handleInfoWindowClose}
        >
          <div>{selectedMarker === 'central' ? centralAddress : selectedMarker.name}</div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

const WrappedMapComponent = ({ usersData, centralAddress, areaValue }: any) => (
  <LoadScriptNext  googleMapsApiKey="AIzaSyAlr7wiWbiPhgKpWAN7lNSAxgwhujouyc4">
    <MapComponent  usersData={usersData} centralAddress={centralAddress} areaValue={areaValue} />
  </LoadScriptNext>
);

export default WrappedMapComponent;









