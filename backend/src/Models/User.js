import mongoose from 'mongoose';

const roleInfoSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['nurse', 'doctor', 'staff', 'receptionist', 'admin'],
    required: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  licenseNo: {
    type: String,
    required: function () {
      // only required if doctor or nurse
      return ['doctor', 'nurse'].includes(this.role);
    }
  },
  permission: {
    type: String,
    enum: ['super', 'admin', 'basic'],
    default: function () {
      // auto-assign based on role
      return this.role === 'admin' ? 'admin' : 'basic';
    }
  }
});


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
  roleInfo : roleInfoSchema
}, {timestamps: true}
)

userSchema.index(
  { "roleInfo.licenseNo": 1 },
  { 
    unique: true, 
    partialFilterExpression: { 
      "roleInfo.role": { $in: ["doctor", "nurse"] },
      "roleInfo.licenseNo": { $exists: true, $nin: [null, ""] } 
    } 
  }
);

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  const { firstName, middleName, lastName } = this.personalDetails;
  return middleName 
    ? `${firstName} ${middleName} ${lastName}`
    : `${firstName} ${lastName}`;
});

userSchema.virtual('formattedDOB').get(function(){
  if(!this.personalDetails.dateOfBirth) return null

  return new Date(this.personalDetails.dateOfBirth).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'  
  })

})

// Virtual for age calculation
userSchema.virtual('age').get(function() {
  if (!this.personalDetails.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.personalDetails.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

// Ensure virtuals are included in JSON output
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });



const User = mongoose.model('User', userSchema);

export default User;