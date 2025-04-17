import mongoose from 'mongoose';


const bookingSchema = new mongoose.Schema({
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    offer: {
        type: String,
    },
    image: {
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})


const BookingModel = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
export default BookingModel