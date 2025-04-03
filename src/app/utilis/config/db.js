


import mongoose from 'mongoose';
const DBconnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, );
        console.log('Connected to MongoDB Database');
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

export default DBconnection;
