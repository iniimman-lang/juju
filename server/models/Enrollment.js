import mongoose from 'mongoose'

const enrollmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  course: { type: String, required: true },
  message: { type: String, default: '' },
  status: { 
    type: String, 
    enum: ['pending', 'contacted', 'enrolled', 'rejected'], 
    default: 'pending' 
  },
  notes: { type: String, default: '' }
}, { timestamps: true })

export default mongoose.model('Enrollment', enrollmentSchema)
