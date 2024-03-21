

import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helpers/mailer";



connect();


export async function POST(request:NextRequest) {
    try{
        const reqBody = await request.json();
        const {userName,email,userType,readicharge_Core_id,password} = reqBody;
        console.log(reqBody);


        // Check If the User already Exist
        const user = await User.findOne({email});

        if(user)
        {
            return NextResponse.json({error:"User already exists"},{status:400})
        }

        // Hash the Password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        const newUser = new User({
            readicharge_Core_id,
            userName,
            email,
            password:hashedPassword,
            userType
        });

        const savedNewUser = await newUser.save();
        console.log(savedNewUser);



        // Send Verification Email 

        await sendMail({
            email,emailType:"VERIFY",userId:savedNewUser._id
        });

        return NextResponse.json({
            message:"User Created Successfully",
            success:true,
            savedNewUser
        })

    }
    catch(error:any)
    {
        console.log("Here",error)
        return NextResponse.json({error:error},{status:500});
    }
}