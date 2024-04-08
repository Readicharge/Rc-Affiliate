import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


export const getDataFromToken = async (request:NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || '';
        const decodedToken:any = token==='' ? undefined : jwt.verify(token,process.env.TOKEN_SECRET!);   
        return decodedToken;    
    } catch (error:any) {
        console.log(error)
        throw new Error("error",error.message);
    }
}