import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import LocationCard from "@/models/locationCardModel";


connect();


export async function GET(request:NextRequest)
{
    try {
        
       console.log(request);
       const locationCard = await LocationCard.find();

       return NextResponse.json({
           message:"Location Cards Found",
           data:locationCard
       })

    } catch (error:any) {
        console.log(error,"hello")
        return NextResponse.json({error:error.message},{status:400})
    }
};