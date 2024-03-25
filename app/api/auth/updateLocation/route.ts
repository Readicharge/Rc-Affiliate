import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";



connect();

export async function PUT(request:NextRequest)
{
    try {

        console.log("Hello")
        const requestBody = await request.json();
        const {email,idata,userType} = requestBody;

        console.log(email,userType)

        // Check if the User Exist for the given type or not 
        const user = await User.findOneAndUpdate({email,userType},{locationData:idata,isVerified:true},{new:true});

        if(!user) {
            console.log("use not found")
            return NextResponse.json({error:"User profile updated successfully"},{status:500});
        }



        // Create Token Data 
        const  tokenData = {
            id:user._id,
            userName:user.userName,
            email:user.email,
            userType:user.userType
        }

        // Create the Token 
        const token = jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"5h"})



        const response = NextResponse.json({
            message:"Login Successful",
            success:true
        });

        response.cookies.set("token",token,{
            httpOnly:true,
        });

        console.log("Resposne for the login ", response)
        return response;
    }
    catch(error:any)
    {
        console.log(error)
        return NextResponse.json({error:error.message},{status:500})
    }
}