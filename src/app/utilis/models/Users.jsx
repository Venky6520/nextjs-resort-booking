// const {default:mongoose}=require('mongoose')
// const UserSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
        
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     role: {
//         type: String,
//         default: 'user',
//     },
//     bookings: {
//         type: mongoose.Types.ObjectId,
//         ref: 'bookings',
//     },
// })


// const UserModel = mongoose.models.User || mongoose.model('User', UserSchema)

// export default UserModel;


import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
  },
  bookings: [{
    type: mongoose.Types.ObjectId,
    ref: 'bookings',
  }],
});

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

export default UserModel;
