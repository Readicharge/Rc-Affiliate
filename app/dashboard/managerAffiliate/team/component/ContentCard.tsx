"use client";
import React from 'react';
import { Card,CardHeader,CardBody,CardFooter,Divider,Link,Image } from '@nextui-org/react';
import CreateData from './CreateData';


export default function ContentCard({title,description,buttonFunction,buttonFields,buttonTitle,buttonDescription}:any) {
    return (
        <Card className='max-w-[400px] bg-[#06061e] bg-opacity-80'>
            <CardHeader className='flex gap-3'>
                <div className='flex flex-col'>
                    <p className='text-md'>
                        {title}
                    </p>
                    <p className='text-small text-default-500'>
                        {description}
                    </p>
                </div>
            </CardHeader>
            <Divider/>
            <CardBody>
                <CreateData fields={buttonFields} onSave={buttonFunction} title={buttonTitle} description={buttonDescription} />
            </CardBody>
        </Card>
    )
}