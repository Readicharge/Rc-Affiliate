import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Vendor from "@/models/vendorModel";


connect();


export async function GET(request:NextRequest)
{
    try {
        
       console.log(request);
       const product = await Vendor.find();

       return NextResponse.json({
           message:"Vendors Found",
           data:product
       })

    } catch (error:any) {
        console.log(error,"hello")
        return NextResponse.json({error:error.message},{status:400})
    }
};