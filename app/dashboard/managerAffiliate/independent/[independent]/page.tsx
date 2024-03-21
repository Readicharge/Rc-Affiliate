import React from 'react';
import {
    Card,
    CardFooter,
    Image,
    Button,
    CardHeader,
    CardBody,
} from "@nextui-org/react";
import SalesGraph from '@/components/SalesConversion';
import { Separator } from '@/components/ui/separator';
import { InstagramIcon, TwitterIcon } from 'lucide-react';




const HeaderProfile = () => {
    return (
        <div className='flex flex-wrap flex-col gap-x-8 p-10 justify-center items-center overflow-y-scroll h-full'>
            <Card
                isFooterBlurred
                radius='lg'
                className='border-none w-[25%] '
            >
                <Image
                    alt='Readicharge Affilaite Manager'
                    className='object-cover'
                    height={400}
                    width={400}
                    src='https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
                />
                <CardFooter
                    className='justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10'>
                    <p className='text-md text-white/80'>User Name</p>
                    <Button
                        className='text-tiny text-white bg-white/10'
                        variant='flat'
                        color='default'
                        radius='lg'
                        size='md'
                    >
                        Contact
                    </Button>
                </CardFooter>
            </Card>
            <div className='flex flex-wrap flex-row  gap-y-8  gap-x-8'>


                <div className='flex flex-wrap flex-row gap-x-8 '>
                    <Card className='bg-[#06061e] bg-opacity-80'>
                        <CardHeader>
                            Contact Information
                        </CardHeader>
                        <Separator />
                        <CardBody>
                            <p>Test@email.coml</p>
                        </CardBody>
                        <CardBody>
                            <p> (+01) 5550123456</p>
                        </CardBody>
                    </Card>

                    <Card className='bg-[#06061e] bg-opacity-80'>
                        <CardHeader>
                            Total Conversions
                        </CardHeader>
                        <Separator />
                        <CardBody>
                            450
                        </CardBody>
                    </Card>
                    <Card className='bg-[#06061e] bg-opacity-80'>
                        <CardHeader>
                            Amount in Wallet
                        </CardHeader>
                        <Separator />
                        <CardBody>
                            $900
                        </CardBody>
                    </Card>
                    <Card className='bg-[#06061e] bg-opacity-80'>
                        <CardHeader>
                            Others
                        </CardHeader>
                        <Separator />
                        <CardBody>
                            To be Decided
                        </CardBody>
                    </Card>
                </div>
                <Card className='w-[50%] h-[65%] bg-[#06061e] bg-opacity-80'>
                    <CardBody className='px-3 py-3 text-small text-default-400'>
                        <SalesGraph />
                    </CardBody>
                </Card>
                <Card className='bg-[#06061e] bg-opacity-80'>
                    <CardHeader className='items-center justify-center'>
                        Social
                    </CardHeader>
                    <Separator />
                    <CardBody className='gap-y-2 p-4'>
                    <div className='flex flex-row'>
                        <InstagramIcon />
                        <p className='text-[#96d232] ml-8' > ~ 4500 followers</p>
                   </div>
                    <div className='flex flex-row '>
                        <TwitterIcon />
                        <p className='text-[#96d232] ml-8' > ~ 4500 followsers</p>
                        </div>
                    </CardBody>

                </Card>
            </div>


        </div>
    );
};

export default HeaderProfile;


