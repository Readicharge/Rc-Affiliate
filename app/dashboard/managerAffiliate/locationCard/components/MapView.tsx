import { useLoadScript } from "@react-google-maps/api";
import Map from "./Map";



type LatLangLiteral = google.maps.LatLngLiteral;

export default function MapView ({addresses}:any) {
  
  const {isLoaded } = useLoadScript({
    googleMapsApiKey:'AIzaSyAlr7wiWbiPhgKpWAN7lNSAxgwhujouyc4',
    libraries:['places','maps','marker']
  });


  console.log(addresses)
  

  if(!isLoaded)
  {
    return (
      <div>
        Loading ...
      </div>
    )
  }

  return (
   <div className="w-[50vw]">
     <Map addresses={addresses} />
    </div>
  )
}







// import React, { useState, useEffect } from 'react';
// import GoogleMapReact from 'google-map-react';
// import { LocateFixedIcon } from 'lucide-react';

// // Marker component to represent a single address on the map
// const Marker = ({ lat, lng, map }: any) => {
//   const markerPosition = {
//     transform: 'translate(-50%, -50%)',
//     color: 'red',
//     fontWeight: 'bold',
//     backgroundColor: '#fafafa',
//     padding: '8px',
//     borderRadius: '8px',
//     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//   };

//   const calculateMarkerPosition = () => {
//     if (map) {
//       const projection = map.getProjection();

//       if (projection) {
//         const point = projection.fromLatLngToPoint({ lat, lng });
//         const x = point.x;
//         const y = point.y;

//         return {
//           top: `${(y / map.getDiv().offsetHeight) * 100}%`,
//           left: `${(x / map.getDiv().offsetWidth) * 100}%`,
//         };
//       }
//     }

//     return {};
//   };

//   return <div style={{ ...markerPosition, ...calculateMarkerPosition() }}>
//     <LocateFixedIcon color='primary' />
//   </div>;
// };

// function MapView() {
//   const [map, setMap] = useState(null);
//   const initialCoordinates = {
//     lat: 42.329410,
//     lng: -83.046980,
//   };

//   const addresses = [
//     { lat: 42.329410, lng: -83.046980, text: 'Address 1' },
//     { lat: 42.329210, lng: -83.036980, text: 'Address 2' },
//     { lat: 42.529410, lng: -83.044980, text: 'Address 3' },
//     { lat: 42.629410, lng: -83.076980, text: 'Address 4' },
//     // Add more addresses as needed
//   ];

//   const handleMapLoaded = (map:any) => {
//     setMap(map);
//   };

//   return (
//     <div className='w-full h-full' style={{ height: '65vh', width: '30vw', borderRadius: 19, overflow: 'hidden' }}>
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: 'AIzaSyAlr7wiWbiPhgKpWAN7lNSAxgwhujouyc4' }}
//         defaultCenter={initialCoordinates}
//         center={initialCoordinates}
//         defaultZoom={14}
//         margin={[50, 50, 50, 50]}
//         onGoogleApiLoaded={({ map }:any) => handleMapLoaded(map)}
//       >
//         {/* Render markers based on the addresses array */}
//         {addresses.map((address, index) => (
//           <Marker
//             key={index}
//             lat={address.lat}
//             lng={address.lng}
//             map={map}
//           />
//         ))}
//       </GoogleMapReact>
//     </div>
//   );
// }

// export default MapView;
