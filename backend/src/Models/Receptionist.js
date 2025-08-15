import mongoose from 'mongoose';

const receptionistSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

}, {timestamps: true})

const Receptionist = mongoose.model('Receptionist', receptionistSchema)

export default Receptionist;