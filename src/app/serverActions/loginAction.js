

"use server"

import DBconnection from "../utilis/config/db"
import { signIn } from "../auth";
export async function loginAction(loginDetails) {
    await DBconnection();

    try {
        const response = await signIn("Credentials", {
            email: loginDetails.email,
            password: loginDetails.password,
            redirect: false,
        });
        
        console.log("signIn response:", response);
        
        if (response?.error) {
            return {
                success: false,
                message: response.error,
            };
        }
        
        if (!response?.ok) {
            return {
                success: false,
                message: "Invalid login credentials",
            };
        }
        
        return {
            success: true,
        };
        
    } 
    
    
    catch (error) {
        console.error("Error in loginAction:", error);
        return {
            success: false,
            message: "Login failed. Please try again.",
        };
    }
}
