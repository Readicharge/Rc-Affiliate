import { connect } from "@/dbConfig/dbConfig";
import SalesData from "@/models/salesModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {
            perSaleReturn,
            perSaleTargetReturn,
            additional25Sale,
            additional50Sale,
            additional75Sale,
            additional100Sale,
            additional125Sale,
            additional150Sale,
            additional175Sale,
            additional200Sale,
            additional225Sale,
            additional250Sale
        } = reqBody;


        console.log(reqBody)
        const existingData = await SalesData.find();

        if (existingData.length > 0) {
            console.log('Data Already Exists');


            const updatedData = await SalesData.findByIdAndUpdate(existingData[0]._id,reqBody,{new:true})

            return NextResponse.json({
                message: "Salesperson target data updated successfully",
                success: true,
                updatedData,
            });
        }

        // If data doesn't exist, create new data
        const newData = new SalesData({
            perSaleReturn,
            perSaleTargetReturn,
            additional25Sale,
            additional50Sale,
            additional75Sale,
            additional100Sale,
            additional125Sale,
            additional150Sale,
            additional175Sale,
            additional200Sale,
            additional225Sale,
            additional250Sale
        });

        const savedNewData = await newData.save();

        return NextResponse.json({
            message: "Salesperson target data created successfully",
            success: true,
            savedNewData,
        });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
