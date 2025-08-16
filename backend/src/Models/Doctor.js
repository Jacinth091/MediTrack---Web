import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum :["Present", "Busy", "Not Available"], 
    default: "Not Available",
    required: true,
    trim : true
  },
  department: {type: mongoose.Schema.Types.ObjectId, ref:'Department', required: true},
  licenseNo: {type:String, required: true, trim : true} 
}, {timestamps: true})

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;