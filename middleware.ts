// middleware/auth.js
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getDataFromToken } from './helpers/getDataFromToken';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = (path === "/auth/signin" || path === "/auth/signup");

    const token = request.cookies.get('token')?.value

    console.log(token)



    console.log(token)
    if (token === undefined) {
        console.log("Path Here " + path)
        // Redirect to login if token is missing and the current path is not the login page
        if (path !== "/login" && !isPublicPath) {
            return NextResponse.redirect(new URL('auth/signin', request.nextUrl));
        } else if(isPublicPath) {
            console.log(isPublicPath,path,"toto")
            return NextResponse.next();
        }
    }

    // Decode the token manually
    let decodedData;
    try {
        const [, tokenPayloadBase64] = (token!==undefined) ? token.split('.'):[];
        decodedData = JSON.parse(
            Buffer.from((tokenPayloadBase64!==undefined && tokenPayloadBase64 !==null)?tokenPayloadBase64:"", 'base64').toString('utf-8')
        );
    } catch (error: any) {
        console.error('Token decoding error:', error);
        return NextResponse.redirect(new URL('/auth/signin', request.nextUrl));
    }

    const userType = decodedData?.userType;

    const allowedUserTypes: any = {
        "masterAdmin": "/dashboard/masterAdmin",
        "admin": "/dashboard/admin",
        "managerCX": "/dashboard/managerCX",
        "customerSupport": "/dashboard/customerSupport",
        "managerInventory": "/dashboard/managerInventory",
        "vendorInventory": "/dashboard/vendorInventory",
        "companyInstaller": "/dashboard/companyInstaller",
        "managerAffiliate": "/dashboard/managerAffiliate",
        "readichargeSalesPerson": "/dashboard/readichargeSalesPerson",
        "affiliateViaNetwork": "/dashboard/affiliateViaNetwork",
        "independentAffiliate": "/dashboard/independentAffiliate"
    };

    if (!isPublicPath) {
        // Check if the user is logged in and the userType is valid
        if (userType) {
            const allowedPath = allowedUserTypes[userType];
            // Check user type for protected paths
            if (allowedPath && path !== allowedPath) {
                
                // Redirect to appropriate page for the user type
                return NextResponse.redirect(new URL(allowedPath, request.nextUrl));
            }
        } else {
            // Redirect to signup if user is not logged in or user type is missing
            return NextResponse.redirect(new URL('/login', request.nextUrl));
        }
    } else if (isPublicPath && token) {
        // Redirect to dashboard if trying to access public pages while logged in
        return NextResponse.redirect(new URL(`/dashboard/${userType}`, request.nextUrl));
    }

    // Continue with the request if no redirection is needed
    return NextResponse.next();

        // Allow requests to static assets without authentication check
        // const isStaticAsset = request.nextUrl.searchParams.has('next-static') || path.startsWith('/_next/static');

        // if (isStaticAsset) {
        //     return NextResponse.next();
        // }
}

export const config = {
    matcher: [

        // '/((?!api|_next/static|_next/image|favicon.ico).*)'
        "/",
        "/auth/login",
        "/auth/signup",
        "/dashboard",
        "/dashboard/compnayInstaller",
        "/dashboard/masterAdmin",
        "/dashboard/affiliateViaNetwork",
        "/dashboard/managerAffiliate",
    ],
};




