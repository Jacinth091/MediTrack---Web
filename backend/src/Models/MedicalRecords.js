import mongoose from 'mongoose';

const MedicalRecordsSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  currentPhysician: String,
  complaint: String,
  diagnosis: String,
  medication: String,
  visitDate: { type: Date, default: Date.now }
}, {timestamps: true})

const MedicalRecords = mongoose.model('MedicalRecords', MedicalRecordsSchema)
export default MedicalRecords;