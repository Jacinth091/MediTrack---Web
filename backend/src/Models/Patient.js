import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({

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
  email: {
    type:String,
    required: true,
    unique: true
  },
  religion: {
    type:String,
    required: false
  },
  nationality : {
    type: String,
    required :false
  },
  maritalStatus: {
    type: String,
    enum: ["Married", "Single", "Divorced"]
  }

}, {timestamps: true})

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;