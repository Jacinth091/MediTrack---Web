import mongoose from 'mongoose'

const ConsultationSchema = new mongoose.Schema({

  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true
  },
  consultDate: {
    type: Date,
    required: true
  },
  

}, {timestamps: true})