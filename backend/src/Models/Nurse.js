import mongoose from 'mongoose';

const nurseSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  licenseNo: {type:String, required: true, trim : true},
  department: {type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true},
  
}, {timestamps: true})

const Nurse = mongoose.model('Nurse', nurseSchema);

export default Nurse;