
import DBconnection from "../../../utilis/config/db"
import { NextResponse } from "next/server"
import { writeFile } from "fs/promises";

import path from "path"
import ProductModel from "../../../utilis/models/Product"

export async function GET(){
    await DBconnection()

    const records = await ProductModel.find({});
      return NextResponse.json({ data: records});
    
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
        const newProduct= new ProductModel({
            title:title,
            price:price,
            offer:offer,
            ammen:ammen,
            desc:desc,
            image:`/uploads/${image.name}`
        })
        await newProduct.save()
        return NextResponse.json({response:"Product added successfully", success:true},
        {status:201})
        
    }
    catch(error){
        console.log(error)
        return NextResponse.json({response:"Product not added", success:false},
        {status:500})

    }


}

// import DBconnection from "../../../utilis/config/db";
// import { NextResponse } from "next/server";
// import { writeFile, mkdir } from "fs/promises";
// import fs from "fs";
// import path from "path";
// import ProductModel from "../../../utilis/models/Product";

// export async function GET() {
//   await DBconnection();
//   const records = await ProductModel.find({});
//   return NextResponse.json({ data: records});
// }

// export async function POST(req) {
//   await DBconnection();

//   const data = await req.formData();

//   const title = data.get("title");
//   const price = data.get("price");
//   const offer = data.get("offer");
//   const ammen = data.get("ammen");
//   const desc = data.get("desc");
//   const image = data.get("image");

//   const bufferData = await image.arrayBuffer();
//   const buffer = Buffer.from(bufferData);

//   const imageDir = path.join(process.cwd(), "public", "images");
//   const imagePath = path.join(imageDir, image.name);

//   try {
//     // Check if the directory exists; if not, create it
//     if (!fs.existsSync(imageDir)) {
//       await mkdir(imageDir, { recursive: true });
//     }

//     // Save the uploaded image file
//     await writeFile(imagePath, buffer);

//     // Save the product to the database
//     const newProduct = new ProductModel({
//       title: title,
//       price: price,
//       offer: offer,
//       ammen: ammen,
//       desc: desc,
//       image: `/images/${image.name}`, // Correct path to access in frontend
//     });

//     await newProduct.save();

//     return NextResponse.json(
//       { response: "Product added successfully", success: true },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { response: "Product not added", success: false },
//       { status: 500 }
//     );
//   }
// }
