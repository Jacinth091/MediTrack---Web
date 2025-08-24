import mongoose from 'mongoose';

const MedicalHistorySchema = new mongoose.Schema({

  diagnosedWith: {
    type: String,
    required: true
  },
  diagnosedWhere: {
    type: String,
    required: true
  },
  dateOfDiagnosis: {
    type: Date,
    required: true
  },
  hasMaintenance: {
    type: Boolean,
    default: false
  },
  medication: {
    type: String,
    default: null
  }

}, {timestamps: true}, {_id: false})

// const MedicalHistory = mongoose.model('MedicalHistory', MedicalHistorySchema);
export default MedicalHistorySchema;