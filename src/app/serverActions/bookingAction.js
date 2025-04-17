"use server"
import DBconnection from "../utilis/config/db"
export async function bookingAction(bookingDeetails){
    await DBconnection()

    console.log("Booking Details", bookingDeetails)
}