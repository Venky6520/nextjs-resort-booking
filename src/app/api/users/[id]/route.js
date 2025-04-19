import { NextResponse } from "next/server";
import DBconnection from "../../../utilis/config/db";
import UserModel from "../../../utilis/models/Users"
export async function GET(request, { params }) {
    await DBconnection()

    const { id } = params

    console.log("Dynamic ID",id)


    try{
        if(!id) {
            return NextResponse.json({success:false, message: "no user found"}, {status: 404})
        }
        const user= await UserModel.findById(id).populate("bookings")

        return NextResponse.json({success:true, user}, {status: 200})
    }
    catch(error){
        return NextResponse.json({success:false, message: "Internal server error"}, {status: 500})

    }
}