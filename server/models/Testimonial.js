import mongoose from 'mongoose'

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  text: { type: String, required: true },
  featured: { type: Boolean, default: false }
}, { timestamps: true })

export default mongoose.model('Testimonial', testimonialSchema)
