import React from 'react';
import {
    Card,
    CardFooter,
    Image,
    Button,
    CardHeader,
    CardBody,
} from "@nextui-org/react";
import { RecentSales } from '@/components/recent-sales';

const sampleTransactions = [
    {
        avatarSrc: "/avatars/01.png",
        avatarFallback: "OM",
        name: "Olivia Martin",
        email: "olivia.martin@email.com",
        amount: 1999.00,
    },
    {
        avatarSrc: "/avatars/02.png",
        avatarFallback: "JL",
        name: "Jackson Lee",
        email: "jackson.lee@email.com",
        amount: 39.00,
    },
    {
        avatarSrc: "/avatars/03.png",
        avatarFallback: "IN",
        name: "Isabella Nguyen",
        email: "isabella.nguyen@email.com",
        amount: 299.00,
    },
    {
        avatarSrc: "/avatars/04.png",
        avatarFallback: "WK",
        name: "William Kim",
        email: "will@email.com",
        amount: 99.00,
    },
    {
        avatarSrc: "/avatars/05.png",
        avatarFallback: "SD",
        name: "Sofia Davis",
        email: "sofia.davis@email.com",
        amount: 39.00,
    },
    // Add more transactions if needed
];


const quickTableData = {
    title: "Title Here",
    description: "Description Here",
    data: sampleTransactions
}


const HeaderProfile = () => {
    return (
        <div className='flex flex-wrap flex-col gap-y-8 p-10 overflow-y-scroll'>
            <div className='flex flex-wrap flex-row gap-x-8'>
                <Card
                    isFooterBlurred
                    radius='lg'
                    className='border-none w-[30%]'
                >
                    <Image
                        alt='Readicharge Affilaite Manager'
                        className='object-cover'
                        height={400}
                        width={400}
                        src='https://images.pexels.com/photos/3276049/pexels-photo-3276049.jpeg'
                    />
                    <CardFooter
                        className='justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10'>
                        <p className='text-tiny text-white/80'>Company Name</p>
                        <Button
                            className='text-tiny text-white bg-green-800/40'
                            variant='flat'
                            color='default'
                            radius='lg'
                            size='md'
                        >
                            Contact
                        </Button>
                    </CardFooter>
                </Card>

                <Card className='w-[60%]'>
                   

                    <CardBody className='px-3 py-3 text-small text-default-400'>
                        <div >
                            {/* Use an iframe for the address */}
                            <iframe
                                style={{
                                    borderRadius: 19
                                }}
                                width='100%'
                                height='250px'
                                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.2272587992064!2d-75.97785248522091!3d37.52621872093349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b06b16c59b4977%3A0x18db324c0a253bf9!2sGolden%20Gate%20Park!5e0!3m2!1sen!2sus!4v1677765195085!5m2!1sen!2sus`}
                            />
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className='flex flex-wrap flex-row gap-x-8'>
                <Card className="col-span-4 md:col-span-3 w-[30%]">
                    
              
                    <CardBody>
                        <RecentSales transactions={quickTableData.data} />
                    </CardBody>
                </Card>
                <Card className="col-span-4 md:col-span-3 w-[60%]">

                    <CardBody>
                        <RecentSales transactions={quickTableData.data} />
                    </CardBody>
                </Card>
               
            </div>

        </div>
    );
};

export default HeaderProfile;


