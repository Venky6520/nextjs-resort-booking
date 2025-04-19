// import { NextResponse } from "next/server";
// import DBconnection from "../../../../utilis/config/db";

// import ProductModel from "../../../../utilis/models/Product";
// export async function GET(request, context) {
//     await DBconnection()

//     // const { id } = params

//     const { params } = context; // get `params` from context
//     const { id } = params;

//     console.log("Dynamic ID",id)


//     try{
//         if(!id) {
//             return NextResponse.json({success:false, message: "no user found"}, {status: 404})
//         }
//         const user= await ProductModel.findById(id)

//         return NextResponse.json({success:true, user}, {status: 200})
//     }
//     catch(error){
//         return NextResponse.json({success:false, message: "Internal server error"}, {status: 500})

//     }
// }



import { NextResponse } from "next/server";
import DBconnection from "../../../../utilis/config/db";
import ProductModel from "../../../../utilis/models/Product";

export async function GET(request, context) {
    await DBconnection();

    const { id } = await context.params;

    console.log("Dynamic ID", id);

    try {
        if (!id) {
            return NextResponse.json(
                { success: false, message: "No user found" },
                { status: 404 }
            );
        }

        const user = await ProductModel.findById(id);

        if (!user) {
            return NextResponse.json(
                { success: false, message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, user }, { status: 200 });
    } catch (error) {
        console.error("Error fetching product:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
