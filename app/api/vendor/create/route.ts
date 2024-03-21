import {connect} from "@/dbConfig/dbConfig";
import Vendor from "@/models/vendorModel";
import { NextRequest,NextResponse } from "next/server";



connect();


export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {
           vendor_name,
           addressLine1,
           addressLine2,
           city,
           state,
           zip
        } = reqBody;

        const product = await Vendor.findOne({
            vendor_name
        });

        if(product)
        {
            return NextResponse.json({error:"Product already exist"},{status:400});
        }

        const newProduct = new Vendor({
            readicharge_Core_id:`RC-${vendor_name}`,
            vendor_name,
            addressLine1,
            addressLine2,
            city,
            state,
            zip
        });

        const savedNewProduct = await newProduct.save();

        return NextResponse.json({
            message:"Vendor Created Successfully",
            success:true,
            savedNewProduct
        })
    }
    catch(error)
    {
        console.log(error)
        return NextResponse.json({error:error},{status:500});
    }
}