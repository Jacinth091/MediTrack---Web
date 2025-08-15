import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  permission : {type:String, enum: ["super-admin", "admin"], default: "admin", required: true},
  department: { 
    type: String, 
    enum: [
      'Administration',
      'Human Resources',
      'Finance',
      'IT Department',
      'Operations',
      'Records Management',
      'Procurement',
      'Legal',
      'Quality Assurance'
    ],
    required: true
  },

}, {timestamps: true})

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;