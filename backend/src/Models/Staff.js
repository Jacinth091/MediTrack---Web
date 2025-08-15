import mongoose from 'mongoose';

const staffSchema =  new mongoose.Schema({

 userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  department: { 
    type: String, 
    enum: [
      'Housekeeping',
      'Maintenance',
      'Security',
      'Cafeteria',
      'Transport',
      'Front Desk',
      'Supply Room'
    ],
    default: "Front Desk",
    required: true
  },
  position: { 
    type: String, 
    enum: [
      'Clerk',
      'Technician',
      'Attendant',
      'Assistant',
      'Driver',
      'Security Guard'
    ],
    default: "Attendant",
    required: true
  }
}, {timestamps: true})

const Staff = mongoose.model('Staff', staffSchema);
export default Staff