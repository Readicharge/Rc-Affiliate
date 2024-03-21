import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import NetworkData from "@/models/networkModel";


connect();


export async function GET(request:NextRequest)
{
    try {
        
       console.log(request);
       const networkData = await NetworkData.find();

       return NextResponse.json({
           message:"Network Data Found",
           data:networkData
       })

    } catch (error:any) {
        console.log(error,"hello")
        return NextResponse.json({error:error.message},{status:400})
    }
};