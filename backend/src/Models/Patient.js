import mongoose from 'mongoose';
import MedicalHistorySchema from './MedicalHistory';

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
    enum: ["Male", "Female", "Other","Prefer not to say"],
    required: true,
  },
  contactNumber: {
    type:String,
    required: true,
  },
  address: {type:String, required: true},
  email: {
    type:String,
    required: true,
    unique: true
  },
  religion: {
    type: String,
    enum: [
      'Roman Catholic',
      'Protestant',
      'Iglesia ni Cristo',
      'Born Again Christian',
      'Islam',
      'Buddhism',
      'Hinduism',
      'Judaism',
      'None',
      'Other'
    ],
    required: false
  },
  nationality: {
    type: String,
    enum: [
      'Filipino',
      'American',
      'Canadian',
      'Chinese',
      'Japanese',
      'Korean',
      'Indian',
      'Australian',
      'British',
      'Other'
    ],
    required: false
  },
  maritalStatus: {
    type: String,
    enum: [
      'Single',
      'Married',
      'Divorced',
      'Widowed',
      'Separated'
    ],
    required: false
  },
  guardians: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Guardian'
    }
  ],
  medicalHistory :{
    type: [MedicalHistorySchema],
    default: []
  }

}, {timestamps: true})

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;