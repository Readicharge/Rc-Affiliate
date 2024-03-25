import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import axios from "axios";


connect();


export async function POST(request:NextRequest)
{
    try {
        const requestBody = await request.json();
        const {affiliate_id} = requestBody;
  
       const team_members = await User.find({
        'socialData.rcSalesPersonId':affiliate_id 
      });

      console.log(team_members)
      

       return NextResponse.json({
           message:"User Found",
           data:team_members
       })

    } catch (error:any) {
        console.log(error,"hello")
        return NextResponse.json({error:error.message},{status:400})
    }
};