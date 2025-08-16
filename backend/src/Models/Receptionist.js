import mongoose from 'mongoose';

const receptionistSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  department: {type:mongoose.Schema.Types.ObjectId, ref: 'Department', required: true},

}, {timestamps: true})

const Receptionist = mongoose.model('Receptionist', receptionistSchema)

export default Receptionist;