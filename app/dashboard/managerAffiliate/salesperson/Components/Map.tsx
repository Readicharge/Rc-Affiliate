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

const Map: React.FC<MapProps> = ({ addresses }) => {
  const mapRef = useRef<GoogleMap>();
  const [clusters, setClusters] = useState<LatLangLiteral[]>([]);

  useEffect(() => {
    // Perform clustering using centroid of points within 50 km
    const epsilon = 10000; // Radius within which points are considered part of a cluster (50 km)
    const clusteredPoints: LatLangLiteral[] = [];

    for (const currentPoint of addresses) {
      let clusterFound = false;

      // Check if the current point is close to any existing cluster
      for (const cluster of clusteredPoints) {
        const distance = google.maps?.geometry?.spherical.computeDistanceBetween(cluster, currentPoint);
        if (distance && distance <= epsilon) {
          clusterFound = true;
          break;
        }
      }

      // If no cluster found, add a new cluster at the current point
      if (!clusterFound) {
        const isCloseToExistingClusters = clusteredPoints.some((cluster) => {
          const distance = google.maps?.geometry?.spherical.computeDistanceBetween(cluster, currentPoint);
          return distance && distance <= epsilon;
        });

        if (!isCloseToExistingClusters) {
          clusteredPoints.push(currentPoint);
        }
      }
    }

    setClusters(clusteredPoints);
  }, [addresses]);

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
        center={clusters.length > 0 ? clusters[0] : { lat: 0, lng: 0 }} // Center map on the first cluster if available
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

            {/* Single circle around each cluster */}
            <Circle
              center={cluster}
              radius={5000} // Fixed radius of 50 km
              options={{ strokeColor: '#06061e', fillColor: getClusterColor(index), strokeWeight: 0, fillOpacity: 0.1 }}
            />
          </Fragment>
        ))}
        {addresses.map((point, index) => (
          // Display remaining points without clusters
          !clusters.some(cluster => google.maps?.geometry?.spherical.computeDistanceBetween(cluster, point) <= 5000) && (
            <Marker key={index} position={point} label={(clusters.length + index + 1).toString()} icon={markerIcon} />
          )
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
