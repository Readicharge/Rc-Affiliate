import { useState, useEffect, useCallback, useRef, useMemo, Fragment } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox, CheckboxGroup, Chip, VisuallyHidden, tv, useCheckbox } from '@nextui-org/react';
import { ScrollArea } from '@/components/ui/scroll-area';

type LatLangLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

interface MapProps {
    addresses: string[];
}

const Map: React.FC<MapProps> = ({ addresses }) => {
    const mapRef = useRef<GoogleMap>();
    const [coordinates, setCoordinates] = useState<LatLangLiteral[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedMarkers, setSelectedMarkers] = useState<LatLangLiteral[]>([]);
    const [selected, setSelected] = useState<string[]>([]);

    useEffect(() => {
        const latLongFiltered = addresses?.map((locationCard: any) => {
            return {
                id: locationCard._id,
                name: locationCard.locationCard_name,
                lat: locationCard.lat,
                lng: locationCard.lng
            }
        })
        setCoordinates(latLongFiltered)
    }, [addresses]);

    const center = useMemo<LatLangLiteral>(() => {
        const avgLat = coordinates.reduce((sum, coord) => sum + coord.lat, 0) / coordinates.length;
        const avgLng = coordinates.reduce((sum, coord) => sum + coord.lng, 0) / coordinates.length;
        return { lat: avgLat, lng: avgLng };
    }, [coordinates]);

    const onLoad = useCallback((map: any) => (mapRef.current = map), []);

    const handleSearch = async () => {
        try {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: searchQuery }, (results: any, status: any) => {
                if (status === 'OK' && results[0]) {
                    const { lat, lng } = results[0].geometry.location;
                    mapRef?.current?.panTo({ lat: lat(), lng: lng() });

                    // Filter markers within 50km radius
                    const filteredMarkers = coordinates.filter(coord =>
                        getDistanceFromLatLonInKm(lat(), lng(), coord.lat, coord.lng) <= 10
                    );
                    console.log(filteredMarkers, "FilteredMarkers")
                    setSelectedMarkers(filteredMarkers);
                } else {
                    console.error('Geocode was not successful for the following reason: ', status);
                }
            });
        } catch (error) {
            console.error('Error occurred during geocoding: ', error);
        }
    };

    // Function to calculate distance between two points in kilometers
    const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);  // deg2rad below
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d;
    };

    const deg2rad = (deg: number) => {
        return deg * (Math.PI / 180)
    };

    const handleSave = () => {
        // Logic to save selected markers
        console.log("Saving selected markers:", selected);
    };

    return (
        <div className='relative'>
            <Card className='bg-[#06061e] absolute top-4 right-4 bg-opacity-50 flex flex-row gap-x-2 p-4 border-none' style={{ borderRadius: 33, zIndex: 200 }}>
                <input
                    type="text"
                    placeholder="Search Address"
                    className='p-2 bg-transparent placeholder-white text-whtie border-none focus:outline-none focus:border-transparent focus:bg-transparent rounded-2xl'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="outline" className='p-4 rounded-2xl border-white ' onClick={handleSearch}>Find Area</Button>
            </Card>
            <div className='w-[50vw]'>
                <GoogleMap
                    zoom={12}
                    center={center}
                    options={{
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }}
                    mapContainerStyle={{
                        width: '100%',
                        height: '65vh',
                        borderRadius: 23,
                        position: 'relative' // Ensure map container has position: relative
                    }}
                    onLoad={onLoad}
                >
                    {coordinates?.map((coord, index) => (
                        <Fragment key={index}>
                            <Marker
                                position={coord}
                                label={(index + 1).toString()}
                            />
                        </Fragment>
                    ))}
                    {/* Scroll area positioned at bottom left */}
                    <ScrollArea className='absolute top-10 left-0 w-[50%] h-[40vh] flex flex-row gap-x-2 p-4 border-none' style={{ zIndex: 200 }}>
                        <CheckboxGroup
                            value={selected}
                            onValueChange={setSelected}
                        >
                            {selectedMarkers.map((marker, index) => (
                                <CustomCheckBox value={marker.id}>{marker.name}</CustomCheckBox>
                            ))}
                        </CheckboxGroup>
                    </ScrollArea>
                </GoogleMap>
                {selected.length > 0 && (
                            <Button className='absolute bottom-10 right-10 bg-[#96d232] text-[#06061e]' onClick={handleSave}>
                                Save
                            </Button>
                        )}
            </div>
        </div>
    );
};

export default Map;




const CheckIcon = (props: any) => {
    return (<svg
        aria-hidden="true"
        fill='none'
        focusable="false"
        height="2em"
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        viewBox='0 0 24 24'
        width='2em'
        {...props}
    >
        <polyline points='20 6 9 17 4 12' />
    </svg>)
}


// Custom CheckBox

const checkBox = tv({
    slots: {
        base: "border-none bg-[#06061e] bg-opacity-80 hover:bg-[#96d232]  px-4 py-6",
        content: "text-default-500"
    },
    variants: {
        isSelected: {
            true: {
                base: "border-[#96d232] bg-[#96d232] hover:bg-[#96d232] hover:border-[#96d232]",
                content: "text-[#06061e] pl-1"
            }
        },
        isFocusVisible: {
            true: {
                base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
            }
        }
    }
});


const CustomCheckBox = (props: any) => {
    const {
        children,
        isSelected,
        isFocusVisible,
        getBaseProps,
        getLabelProps,
        getInputProps
    } = useCheckbox({ ...props });

    const styles = checkBox({ isSelected, isFocusVisible });

    return (
        <label {...getBaseProps()}>
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            <Chip
                classNames={{
                    base: styles.base(),
                    content: styles.content()
                }}
                color='primary'
                startContent={isSelected ? <CheckIcon className="ml-1" /> : null}
                variant='faded'
                {...getLabelProps()}
            >
                {children ? children : isSelected ? 'Enabled' : 'Disabled'}
            </Chip>
        </label>
    )
}