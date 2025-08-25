import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  // Auto-generated patient ID
  patientId: {
    type: String,
    required: true
    // You can auto-generate this in a pre-save hook
  },
  // Personal Information - FIXED syntax errors
  personalInfo: {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    middleName: {
      type: String,
      required: false,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
  },
  
  // Contact Information - Better organized
  contactInfo: {
    primaryPhone: {
      type: String,
      required: true,
      match: /^[\+]?[0-9\-\(\)\s]+$/ // Basic phone validation
    },
    alternatePhone: {
      type: String,
      match: /^[\+]?[0-9\-\(\)\s]+$/
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ // Email validation
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      province: { type: String, required: true },
      zipCode: String,
      country: { type: String, default: 'Philippines' }
    }
  },

  // Emergency Contact
  emergencyContact: {
    name: { 
      type: String, 
      required: false,
      trim: true 
    },
    relationship: { 
      type: String, 
      required: false,
      enum: ['Parent', 'Spouse', 'Sibling', 'Child', 'Friend', 'Other']
    },
    phone: {
      type: String,
      required: false,
      match: /^[\+]?[0-9\-\(\)\s]+$/
    },
    email: {
      type: String,
      lowercase: true,
      trim: true
    }
  },

  // Demographics
  demographics: {
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
    }
  },

  // References to other models
  guardians: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guardian'
  }],

  primaryPhysician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor'
  },

  // Medical History - Enhanced
  medicalHistory: {
    allergies: [{
      allergen: { 
        type: String, 
        required: true,
        trim: true 
      },
      reaction: {
        type: String,
        trim: true
      },
      severity: { 
        type: String, 
        enum: ['Mild', 'Moderate', 'Severe'],
        default: 'Mild'
      },
      dateDiscovered: Date
    }],
    
    chronicConditions: [{
      condition: {
        type: String,
        required: true,
        trim: true
      },
      diagnosedDate: Date,
      status: {
        type: String,
        enum: ['Active', 'Controlled', 'Resolved'],
        default: 'Active'
      }
    }],
    
    currentMedications: [{
      name: {
        type: String,
        required: true,
        trim: true
      },
      dosage: String,
      frequency: String,
      startDate: {
        type: Date,
        default: Date.now
      },
      prescribedBy: String,
      purpose: String
    }],
    
    pastSurgeries: [{
      procedure: {
        type: String,
        required: true,
        trim: true
      },
      date: Date,
      hospital: String,
      surgeon: String,
      outcome: String
    }],
    
    familyHistory: [{
      condition: {
        type: String,
        required: true,
        trim: true
      },
      relationship: {
        type: String,
        enum: ['Father', 'Mother', 'Sibling', 'Grandparent', 'Uncle/Aunt', 'Cousin', 'Other']
      },
      ageAtDiagnosis: Number
    }],

    socialHistory: {
      smoking: {
        type: String,
        enum: ['Never', 'Former', 'Current'],
        default: 'Never'
      },
      alcohol: {
        type: String,
        enum: ['Never', 'Occasional', 'Regular'],
        default: 'Never'
      },
      occupation: String,
      exerciseFrequency: {
        type: String,
        enum: ['Never', 'Rarely', 'Weekly', 'Daily']
      }
    }
  },

  // Insurance Information
  insurance: {
    provider: String,
    policyNumber: String,
    groupNumber: String,
    memberName: String,
    expirationDate: Date,
    copayAmount: Number
  },

  // Patient Status
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Deceased'],
    default: 'Active'
  },

  // Additional notes
  notes: {
    type: String,
    maxlength: 1000
  }

}, { 
  timestamps: true,
  // Add version key for optimistic locking
  versionKey: '__v'
});

// Indexes for better performance
patientSchema.index({ patientId: 1 });
patientSchema.index({ 'contactInfo.email': 1 });
patientSchema.index({ 'personalInfo.firstName': 1, 'personalInfo.lastName': 1 });
patientSchema.index({ 'personalInfo.dateOfBirth': 1 });
patientSchema.index({ status: 1 });

// Pre-save hook to auto-generate patientId
patientSchema.pre('save', async function(next) {
  if (this.isNew && !this.patientId) {
    // Generate patient ID: PAT-YYYY-NNNNNN
    const year = new Date().getFullYear();
    const count = await mongoose.model('Patient').countDocuments();
    this.patientId = `PAT-${year}-${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

// Virtual for full name
patientSchema.virtual('fullName').get(function() {
  const { firstName, middleName, lastName } = this.personalInfo;
  return middleName 
    ? `${firstName} ${middleName} ${lastName}`
    : `${firstName} ${lastName}`;
});

// Virtual for age calculation
patientSchema.virtual('age').get(function() {
  if (!this.personalInfo.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.personalInfo.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

// Ensure virtuals are included in JSON output
patientSchema.set('toJSON', { virtuals: true });
patientSchema.set('toObject', { virtuals: true });

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;