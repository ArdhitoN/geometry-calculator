import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const response = await fetch(
      "http://184.72.209.188:8080/function/luas-persegi",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    // console.error("API Error:", error);
    return NextResponse.json(
      { message: "Error calculating square area" },
      { status: 500 }
    );
  }
}