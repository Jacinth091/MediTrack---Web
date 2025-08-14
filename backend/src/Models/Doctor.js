import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {type: String, required: true, trim : true},
  department: {type: String, enum: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics',
    'Dermatology', 'Radiology', 'Psychiatry', 'Ophthalmology'
  ],
    required :true
  },
  licenseNo: {type:String, required: true, trim : true} 
})

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;