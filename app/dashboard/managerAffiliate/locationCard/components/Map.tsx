import { useState, useEffect, useCallback, useRef, useMemo, Fragment } from 'react';
import { GoogleMap, Marker, Circle } from '@react-google-maps/api';

type LatLangLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

interface MapProps {
    addresses: string[];
}

const Map: React.FC<MapProps> = ({ addresses }) => {
    const mapRef = useRef<GoogleMap>();
    const [coordinates, setCoordinates] = useState<LatLangLiteral[]>([]);

    useEffect(()=>{
        const latLongFiltered = addresses?.map((locationCard:any)=>{
            return {
                lat:locationCard.lat,
                lng:locationCard.lng
            }
        })
        console.log(latLongFiltered);
        setCoordinates(latLongFiltered)
    },[])

    const center = useMemo<LatLangLiteral>(() => {
        const avgLat = coordinates.reduce((sum, coord) => sum + coord.lat, 0) / coordinates.length;
        const avgLng = coordinates.reduce((sum, coord) => sum + coord.lng, 0) / coordinates.length;
        return { lat: avgLat, lng: avgLng };
    }, [coordinates]);

    const options = useMemo<MapOptions>(() => ({
        disableDefaultUI: true,
        clickableIcons: false,
        styles: [
            {
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [
                    {
                        color: '#2596be', // Darker blue color for water (adjust as needed)
                    },
                ],
            },
            {
                featureType: 'all',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#333333', // Dark text color
                    },
                ],
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.fill',
                stylers: [
                    {
                        color: '#a1b3ca', // Gray color for streets
                    },
                ],
            },
        ]

    }), []);

    const onLoad = useCallback((map: any) => (mapRef.current = map), []);

    const markerIcon = {
        url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        scaledSize: new window.google.maps.Size(40, 40),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(20, 40),
    };



    return (
        <div className='flex w-[50vw]'>
            <GoogleMap
                zoom={10}
                center={center}
                mapContainerStyle={{
                    width: '100%',
                    height: '65vh',
                    borderRadius: 23,
                }}
                options={options}
                onLoad={onLoad}
            >
                {coordinates?.map((coord, index) => (
                    <Fragment key={index}>
                        <Marker
                            position={coord}
                            label={(index + 1).toString()}
                            icon={markerIcon}
                        />


 
                        {/* 85% radius circle */}
                        <Circle
                            center={center}
                            radius={google.maps?.geometry?.spherical.computeDistanceBetween(center, coord) * 1.9}
                            options={{ strokeColor: '#06061e', fillColor: '#06061e', strokeWeight: 0, fillOpacity: 0.1 }}
                        />
                     {/* 40% radius circle */}
                        <Circle
                            center={center}
                            radius={google.maps?.geometry?.spherical.computeDistanceBetween(center, coord) * 0.8}
                            options={{ strokeColor: '#8bc34a', fillColor: '#8bc34a', strokeWeight: 0, fillOpacity: 0.1 }}
                        />
                        {/* 60% radius circle */}
                        <Circle
                            center={center}
                            radius={google.maps?.geometry?.spherical.computeDistanceBetween(center, coord) * 1.4}
                            options={{ strokeColor: '#fbc02d', fillColor: '#fbc02d', strokeWeight: 0, fillOpacity: 0.1 }}
                        />

                    </Fragment>
                ))}
            </GoogleMap>
        </div>
    );
};

export default Map;
