"use server"
import DBconnection from "../utilis/config/db";
import UserModel from "../utilis/models/Users";
export async function registerAction(registerDetails) {
    await DBconnection()

    console.log("regAction details: ",  registerDetails);
    try{
        await UserModel.create({
            username:registerDetails.username,
            email:registerDetails.email,
            password:registerDetails.password,
           
        })
        return {
           sucess:true,
        }
    }
    catch(err){
        console.log(err);
    }
    
}