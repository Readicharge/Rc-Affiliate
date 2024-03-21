import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productEcomModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    console.log(requestBody);

    // Access the data from the query parameters
    const userData = request.nextUrl.searchParams.get("userData");

    if (!userData) {
      throw new Error("User data not provided");
    }

    // Parse the JSON-encoded user data
    const data = JSON.parse(decodeURIComponent(userData));

    console.log(data);

    // You can now use the data as needed in your backend logic

    return NextResponse.json({
      message: "User Found",
      // data: product,
    });
  } catch (error: any) {
    console.error(error, "hello");
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
