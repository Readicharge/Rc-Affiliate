import {connect} from "@/dbConfig/dbConfig";
import LocationCard from "@/models/locationCardModel";
import { NextRequest,NextResponse } from "next/server";



connect();


export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {
           locationCard_name,
           addressLine1,
           addressLine2,
           city,
           state,
           zip,
           lat,
           lng
        } = reqBody;

        console.log(reqBody)

        const location = await LocationCard.findOne({
            locationCard_name
        });

        if(location)
        {
            return NextResponse.json({error:"Location Card already exist"},{status:400});
        }

        const newLocation = new LocationCard({
            readicharge_Core_id:`RC-${locationCard_name}`,
            locationCard_name,
            addressLine1,
            addressLine2,
            city,
            state,
            zip,
            lat,
            lng
        });

        const savedNewLocation = await newLocation.save();

        return NextResponse.json({
            message:"New Location Created Successfully",
            success:true,
            savedNewLocation
        })
    }
    catch(error)
    {
        console.log(error)
        return NextResponse.json({error:error},{status:500});
    }
}