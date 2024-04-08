import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";


connect();


export async function GET(request:NextRequest)
{
    try {
        const userId = await getDataFromToken(request);
        if(userId!== undefined)
            {
                const user = await User.findOne({_id:userId?.id}).select("-password");

                return NextResponse.json({
                    message:"User Found",
                    data:user
                })
            }
             else {
                return NextResponse.json({
                    message:"User Not Found Found",
                })
             }

      
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({error:error.message},{status:400})
    }
}