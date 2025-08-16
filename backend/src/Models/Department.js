import mongoose from 'mongoose';

const DepartmentSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    unique: true
  },
  allowedRoles: [{
    type:String,
    enum : ["doctor", "nurse", "staff", "receptionist", "admin"]
  }]

}, {timestamps: true})

const Department = mongoose.model('Department', DepartmentSchema)

export default Department;