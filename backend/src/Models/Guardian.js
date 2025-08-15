import mongoose from 'mongoose';

const guardianSchema = new mongoose.Schema({

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
    enum: ["Male", "Female", "Other","Prefer not to say"],
    required: true,
  },
  contactNumber: {
    type:String,
    required: true,
  },
  email: {
    type:String,
    required: true,
    unique: true
  },
  relationship: { type: String, enum: ["Parent", "Sibling", "Relative", "Legal Guardian"], required: true },
  address: { type: String, required: true },
}, {timestamps: true})

const Guardian = mongoose.model('Guardian', guardianSchema);
export default Guardian;