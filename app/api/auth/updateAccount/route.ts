import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);




connect();

export async function PUT(request:NextRequest)
{
    try {

        console.log("Hell AccountUpdate o")
        const requestBody = await request.json();
        const {email,idata,userType,userData} = requestBody;

        console.log(email,userType,userData,idata);

        // Adding the Logic to add the stripe with the user bank Account 
        // Required Fields

        const firstName = userData.userBasedData.firstName;
        const lastName = userData.userBasedData.lastName;
        const phone = userData.userBasedData.contactNo;
        // WE already have email as the sepreate field 


        const addressLine1 = userData?.userBasedData?.addressLine1;
        const city = userData?.userBasedData.city;
        const state = userData?.userBasedData?.state;
        const postal_code = userData?.userBasedData?.zipCode;


        const accountNumber = idata.accountNumber;
        const routingNumber = idata.routingNumber;


        const industry = "7372";
        const busnessWebsite = 'ReadiCharge.com';
        const termsOfServiceAcceptance = {
            date:Math.floor(Date.now()/1000),
            ip:request.headers.get('host')?.split(':')[0]
        }


        console.log(termsOfServiceAcceptance,)

        // Final Data starts here 
        const account = await stripe.accounts.create({
            type:"custom",
            country:'us',
            business_type : "individual",
            individual :{
                first_name : firstName,
                last_name : lastName,
                email :email , 
                phone : phone,
                address : {
                    line1 : addressLine1,
                    city : city , 
                    state : state,
                    postal_code : postal_code
                },
                dob : {
                    day :26,
                    month : 8,
                    year:2001
                },
                id_number : idata.SSNNumber,
            },
            company : {
                tax_id : idata.SSNNumber,
                name : "ReadiCharge LLC"
            },
            business_profile:{
                url : busnessWebsite,
                mcc : industry
            },
            tos_acceptance :{
                date: termsOfServiceAcceptance.date,
                ip : termsOfServiceAcceptance.ip === "localhost"? "127.0.0.1" : termsOfServiceAcceptance.ip,
            },
            external_account : {
              object : "bank_account",
              account_number : accountNumber,
              routing_number : routingNumber,
              country : 'US',
              currency : 'usd'
            },
            requested_capabilities : ['card_payments','transfers']
        });



        console.log(account)

        const stripe_account = {
           id: account.id,
        object: account.object,
        business_type: account.business_type,
        charges_enabled: account.charges_enabled,
        country: account.country,
        created: account.created,
        default_currency: account.default_currency,
        email: account.email,
        external_accounts: {
          data: account.external_accounts.data.map((externalAccount:any) => ({
            id: externalAccount.id,
            object: externalAccount.object,
            account_holder_name: externalAccount.account_holder_name,
            account_holder_type: externalAccount.account_holder_type,
            account_type: externalAccount.account_type,
            bank_name: externalAccount.bank_name,
            country: externalAccount.country,
            currency: externalAccount.currency,
            default_for_currency: externalAccount.default_for_currency,
            fingerprint: externalAccount.fingerprint,
            last4: externalAccount.last4,
            routing_number: externalAccount.routing_number,
            status: externalAccount.status,
          })),
        },
        individual: {
          id: account.individual.id,
          object: account.individual.object,
          account: account.individual.account,
          address: {
            city: account.individual.address.city,
            country: account.individual.address.country,
            line1: account.individual.address.line1,
            line2: account.individual.address.line2,
            postal_code: account.individual.address.postal_code,
            state: account.individual.address.state,
          },
          created: account.individual.created,
          dob: {
            day: 26,
            month: 8,
            year:2001,
          },
          first_name: account.individual.first_name,
          last_name: account.individual.last_name,
          relationship: {
            percent_ownership: account.individual.relationship.percent_ownership,
            title: account.individual.relationship.title,
          },
        },
        payouts_enabled: account.payouts_enabled,
        }


        // Check if the User Exist for the given type or not 
        const user = await User.findOneAndUpdate({email,userType},{accountData:stripe_account,isVerified:true},{new:true});

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

        // console.log("Resposne for the login ", response)
        return response;
    }
    catch(error:any)
    {
        console.log(error)
        return NextResponse.json({error:error.message},{status:500})
    }
}