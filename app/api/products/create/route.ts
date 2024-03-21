import {connect} from "@/dbConfig/dbConfig";
import Product from "@/models/productEcomModel";
import { NextRequest,NextResponse } from "next/server";



connect();


export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {
            product_name,
            product_category,
            product_description,
            product_rating,
            product_stock,
            product_image,
            product_company_name,
            product_price,
            product_listing_page
        } = reqBody;

        const product = await Product.findOne({
            product_name,product_company_name
        });

        if(product)
        {
            return NextResponse.json({error:"Product already exist"},{status:400});
        }

        const newProduct = new Product({
            readicharge_Core_id:`RC-${product_name}-${product_category}`,
            product_name,
            product_category,
            product_description,
            product_rating,
            product_stock,
            product_image,
            product_company_name,
            product_price,
            product_listing_page
        });

        const savedNewProduct = await newProduct.save();

        return NextResponse.json({
            message:"Product Created Successfully",
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