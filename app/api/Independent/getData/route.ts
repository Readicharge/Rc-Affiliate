import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import IndependentData from "@/models/independentModel";


connect();


export async function GET(request:NextRequest)
{
    try {
        
       console.log(request);
       const independentData = await IndependentData.find();

       return NextResponse.json({
           message:"Independent Data Found",
           data:independentData
       })

    } catch (error:any) {
        console.log(error,"hello")
        return NextResponse.json({error:error.message},{status:400})
    }
};