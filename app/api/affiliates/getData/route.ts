import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";


connect();


export async function GET(request:NextRequest)
{
    try {
        
       console.log(request);
       const product = await User.find();

       return NextResponse.json({
           message:"User Found",
           data:product
       })

    } catch (error:any) {
        console.log(error,"hello")
        return NextResponse.json({error:error.message},{status:400})
    }
};