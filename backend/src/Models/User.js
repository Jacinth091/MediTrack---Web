import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName:
  {
    type:String,
    required: true,
  },
  middleName: {
    type:String,
    required: false
  },
  lastName: {
    type:String,
    required: true,
  },
  dateOfBirth: {
    type:Date,
    required: true,
  },
  gender :{
    type:String,
    required: true,
  },
  contactNumber: {
    type:String,
    required: true,
  },
  role: {
    type:String,
    enum: ['admin', 'doctor', 'nurse', 'admin'],
  }
  
}, {timestamps: true}
)


const User = mongoose.model('User', userSchema);

export default User;