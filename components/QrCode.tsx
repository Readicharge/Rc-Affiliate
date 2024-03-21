import React from 'react';
import { CalendarIcon, TwitterLogoIcon, LinkedInLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import QRCode from 'react-qr-code';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from './ui/card';
import BusinessCardGenerator from './BusinessCard';

export default function ProfileBusinessCardQRCode({ user }: any) {
  const profileUrl = 'https://github.com/vercel.png'; // replace with the actual URL
  const businessCardUrl = 'https://readicharge.com'; // replace with the actual URL

  return (
    <div className="flex flex-row  flex-wrap items-center justify-center gap-x-8 space-x-8">
      <Card className='sm:w-[100%] md:w-[50%]'>
        <CardHeader> Your Virtual Business Card
          <div className="flex space-x-4 mt-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <InstagramLogoIcon className="text-2xl text-green-300 cursor-pointer" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <TwitterLogoIcon className="text-2xl text-green-300 cursor-pointer" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <CalendarIcon className="text-2xl text-green-300 cursor-pointer" />
            </a>
          </div>
        </CardHeader>

        <CardContent className="bg-gradient-to-r from-[#96d232] to-[#06061e] w-full justify-between items-center flex-wrap flex flex-row p-4 rounded-md shadow-md">

          <CardContent className='mt-8 '>
            <CardContent>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" width={500} height={400} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </CardContent>
            <CardContent>
              <p className="text-lg text-[#06061e] font-semibold">{user.userBasedData.firstName} {user.userBasedData.lastName}</p>
              <p className="text-md text-gray-500">{user.userBasedData.email}</p>
              <p className="text-md text-gray-500">{user.userBasedData.contactNo}</p>
              <p className="text-md text-gray-700">ReadiCharge LLC</p>
            </CardContent>
          </CardContent>
          <div className="bg-white p-4 rounded-md shadow-md">
            <QRCode value={businessCardUrl} size={200} />
          </div>

        </CardContent>

      </Card>


      <div className="flex flex-col items-center space-y-4">
        {/* <h2 className="text-xl font-bold">Refer and Earn </h2>
        <div className="bg-white p-4 rounded-md shadow-md">
          <QRCode value={businessCardUrl} size={240} />
        </div> */}

        {/* Radix UI Icons */}
        {/* <div className="flex space-x-4 mt-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <InstagramLogoIcon className="text-2xl text-green-300 cursor-pointer" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <TwitterLogoIcon className="text-2xl text-green-300 cursor-pointer" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <CalendarIcon className="text-2xl text-green-300 cursor-pointer" />
          </a>
        </div> */}
      </div>
    </div>
  );
}
