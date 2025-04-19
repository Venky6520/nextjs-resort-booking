// "use server"

// import { auth } from "../auth"
// import DBconnection from "../utilis/config/db"
// import BookingModel from "../utilis/models/Bookings"
// import UserModel from "../utilis/models/Users"
// export async function bookingAction(bookingDetails){
//     const session= await auth()
//     console.log("Email Check", session.email)
//     await DBconnection()

//     console.log("server Booking Details", bookingDetails)

//     const user = await UserModel.findOne({email: session.email})
    

//     try{
        
//     if (!user){
//         return {success: false, message: "User not found"}
//     }


//     const userId = user._id.toString()

//     console.log("booking check",bookingDetails)

//     const userBookingDetails =  await BookingModel.create({
//    startDate: bookingDetails.selectedDates.startDate,
//     endDate: bookingDetails.selectedDates.endDate,
//     productName: bookingDetails.record.title,
//     price: bookingDetails.record.price,
//     offer: bookingDetails.record.offer,
//     image: bookingDetails.record.image,
//     })

//     await UserModel.findByIdAndUpdate(userId,
//         {$push: {bookings: userBookingDetails._id}},
//     {new: true}
//     )

//     return {success: true, message: "Booking successful"}
//     }
//     catch(error){
//         return {success: false, message: "Booking failed"}
//     }
// }


"use server";

import { auth } from "../auth";
import DBconnection from "../utilis/config/db"
import BookingModel from "../utilis/models/Bookings"
import UserModel from "../utilis/models/Users"

export async function bookingAction(bookingDetails) {
    await DBconnection();

    const session = await auth();

    console.log("user email:", session.email);

    try {
        const user = await UserModel.findOne({ email: session.email });

        if (!user) {
            return { success: false, message: 'User not found' };
        }

        const userId = user._id.toString();

        console.log("booking check:", bookingDetails)

        const userBookingDetails = await BookingModel.create({
            startDate: bookingDetails.selectedDates.startDate,
            endDate: bookingDetails.selectedDates.endDate,
            productName: bookingDetails.record.title,
            price: bookingDetails.record.price,
            offer: bookingDetails.record.offer,
            image: bookingDetails.record.image,
            user: userId, // <-- this was missing and is required by the schema

        });

        await UserModel.findByIdAndUpdate(
            userId,
            { $push: { bookings: userBookingDetails._id } },
            { new: true }
        );

        return { success: true };
    } catch (error) {
        console.error('Error creating booking:', error);
        return { success: false, message: 'Failed to create booking' };
    }
}