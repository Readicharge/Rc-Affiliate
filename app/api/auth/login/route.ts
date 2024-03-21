import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";



connect();

export async function POST(request:NextRequest)
{
    try {

        console.log("Hello")
        const requestBody = await request.json();
        const {email,password,userType} = requestBody;

        console.log(email,password,userType)

        // Check if the User Exist for the given type or not 
        const user = await User.findOne({email,userType});

        if(!user) {
            console.log("Here inside user not found")
            return NextResponse.json({error:"User does not exist"},{status:500});
        }

        // Validate the password 
        const validPassword = await bcryptjs.compare(password,user.password)

        if(!validPassword)
        {
            console.log("Invalid Password")
            return NextResponse.json({error:"Invalid Password"},{status:500});
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