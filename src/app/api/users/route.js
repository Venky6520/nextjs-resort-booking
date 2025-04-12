

import DBconnection from "../../utilis/config/db";
import UserModel from "../../utilis/models/Users"
import { NextResponse } from "next/server";

export async function GET() {
    await DBconnection();
try{
    const users = await UserModel.find({role:{$ne:"admin"}}, {password:0});
    if (!users) {
        return NextResponse.json({success:false, message:"No users found"}, {status:404});
    }
    return NextResponse.json({success:true, message: users }, {status:200});
}
catch(error){
    console.log(error);
    return NextResponse.json({success:false, message:"Internal server error"}, {status:500});

}

}