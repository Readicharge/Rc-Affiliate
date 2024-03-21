import { connect } from "@/dbConfig/dbConfig";
import NetworkData from "@/models/networkModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {
            perSaleReturn
        } = reqBody;


        console.log(reqBody)
        const existingData = await NetworkData.find();

        if (existingData.length > 0) {
            console.log('Data Already Exists');


            const updatedData = await NetworkData.findByIdAndUpdate(existingData[0]._id,reqBody,{new:true})

            return NextResponse.json({
                message: "Network target data updated successfully",
                success: true,
                updatedData,
            });
        }

        // If data doesn't exist, create new data
        const newData = new NetworkData({
           perSaleReturn
        });

        const savedNewData = await newData.save();

        return NextResponse.json({
            message: "Independent target data created successfully",
            success: true,
            savedNewData,
        });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
