import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import SalesData from "@/models/salesModel";


connect();


export async function GET(request:NextRequest)
{
    try {
        
       console.log(request);
       const salesData = await SalesData.find();

       return NextResponse.json({
           message:"Sales Data Found",
           data:salesData
       })

    } catch (error:any) {
        console.log(error,"hello")
        return NextResponse.json({error:error.message},{status:400})
    }
};