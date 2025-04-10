
import DBconnection from "../../../utilis/config/db"
import { NextResponse } from "next/server"
import { writeFile } from "fs"
import path from "path"
import ProductModel from "@/app/utilis/models/Product"

export async function GET(){
    await DBconnection()

    return NextResponse.json({message:"api testing"})
}


export async function POST(req){
    await DBconnection()

    const data = await req.formData()
    console.log(data)
    const title = data.get("title");
    const price = data.get("price");
    const offer = data.get("offer");
    const ammen = data.get("ammen");
    const desc = data.get("desc");
    const image = data.get("image");

    const bufferData= await image.arrayBuffer();
    const buffer = Buffer.from(bufferData);
    const imagePath =path.join(process.cwd(), "public", "images", image.name)

    try{
        await writeFile(imagePath, buffer) 
        const newProduct= new ProductModel()
    }
    catch(err){

    }


}