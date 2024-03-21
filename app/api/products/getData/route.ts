import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productEcomModel";


connect();


export async function GET(request:NextRequest)
{
    try {
        
       console.log(request);
       const product = await Product.find();

       return NextResponse.json({
           message:"Product Found",
           data:product
       })

    } catch (error:any) {
        console.log(error,"hello")
        return NextResponse.json({error:error.message},{status:400})
    }
};