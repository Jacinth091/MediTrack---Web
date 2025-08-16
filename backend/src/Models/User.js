import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  personalDetails: {
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
      enum: ['male', 'female', 'other'],
      required: true,
    },
    contactNumber: {
      type:String,
      required: true,
    },
  },
  roleInfo :
  {
    role: {
      type:String,
      enum: ['nurse', 'doctor', 'staff', 'receptionist', 'admin'],
      required: true
    },
    department: {type:mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    licenseNo: 
    {
      type:String,
      unique:true,
      required: function(){
        return ['doctor', 'nurse'].includes(this.role)
      }
    },
    permission: 
    {
      type:String, 
      enum :['super', 'admin', 'basic'],
      required:function() {
        return this.role === 'admin'
      },
      default: 'basic'
    }
  
  },

}, {timestamps: true}
)


const User = mongoose.model('User', userSchema);

export default User;