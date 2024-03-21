import React, { useState, useEffect, useCallback, useRef, useMemo, Fragment } from 'react';
import { GoogleMap, Marker, Circle } from '@react-google-maps/api';

type LatLangLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

interface LocationCard {
  lat: number;
  lng: number;
}

interface MapProps {
  addresses: LocationCard[];
}

// Import the necessary Google Maps JavaScript API modules
declare global {
  interface Window {
    google: any;
  }
}

const Map: React.FC<MapProps> = ({ addresses }) => {
  const mapRef = useRef<GoogleMap>();
  const [clusters, setClusters] = useState<LatLangLiteral[]>([]);

  useEffect(() => {
    const epsilon = 10;
    const clusteredPoints: LatLangLiteral[] = [];

    for (const currentPoint of addresses) {
      let clusterFound = false;

      for (const address of clusteredPoints) {
        if(address.lat!==currentPoint.lat&& address.lng!==currentPoint.lng){
          let loc1 = new google.maps.LatLng(address.lat,address.lng)
          let loc2 = new google.maps.LatLng(currentPoint.lat,currentPoint.lng)
          const distance = google.maps.geometry.spherical.computeDistanceBetween(loc1,loc2);
          if (distance && distance <= epsilon) {
            clusterFound = true;
            break;
          }
        }
      }

      if (!clusterFound) {
        const isCloseToExistingClusters = clusteredPoints.some((cluster) => {
         if(cluster.lat!==currentPoint.lat && cluster.lng!==currentPoint.lng)
         {
          let loc1 = new google.maps.LatLng(cluster.lat,cluster.lng)
          let loc2 = new google.maps.LatLng(currentPoint.lat,currentPoint.lng)
          const distance = google.maps.geometry.spherical.computeDistanceBetween(loc1,loc2);
          console.log(distance)
          return distance && distance <= epsilon;
         }
        });

        if (!isCloseToExistingClusters) {
          clusteredPoints.push(currentPoint);
        }
      }
    }

    setClusters(clusteredPoints);
  }, []);

  const options = useMemo<MapOptions>(() => ({
    disableDefaultUI: true,
    clickableIcons: false,
    styles: [
      // Your existing styles...
    ],
  }), []);

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  const markerIcon = {
    url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
    scaledSize: new window.google.maps.Size(40, 40),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(20, 40),
  };

  const getClusterColor = (index: number) => {
    const colors = ['#06061e', '#8bc34a', '#fbc02d', '#ff5722', '#2196f3']; // Adjust colors as needed
    return colors[index % colors.length];
  };

  return (
    <div className='flex w-[40vw]'>
      <GoogleMap
        zoom={10}
        center={clusters.length > 0 ? clusters[0] : { lat: 0, lng: 0 }}
        mapContainerStyle={{
          width: '100%',
          height: '65vh',
          borderRadius: 23
        }}
        options={options}
        onLoad={onLoad}
      >
        {clusters.map((cluster, index) => (
          <Fragment key={index}>
            <Marker position={cluster} label={(index + 1).toString()} icon={markerIcon} />

            <Circle
              center={cluster}
              radius={10000}
              options={{ strokeColor: '#06061e', fillColor: getClusterColor(index), strokeWeight: 0, fillOpacity: 0.1 }}
            />
          </Fragment>
        ))}
        {addresses.map((point, index) => (
          !clusters.some(cluster => window.google.maps.geometry.spherical.computeDistanceBetween(cluster, point) >= 10) && (
            <Marker key={index} position={point} label={(clusters.length + index + 1).toString()} icon={markerIcon} />
          )
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
