
import DBconnection from "../../../utilis/config/db"
import { NextResponse } from "next/server"


export async function GET(){
    await DBconnection()

    return NextResponse.json({message:"api testing"})
}