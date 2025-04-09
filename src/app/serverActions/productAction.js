"use server"

import DBconnection from "../utilis/config/db"

export async function productAction(productDetails) {
    await DBconnection();
    console.log("Product details:", productDetails);
 
}