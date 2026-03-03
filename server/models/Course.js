import mongoose from 'mongoose'

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  lessons: { type: Number, required: true }
}, { _id: false })

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  icon: { type: String, default: 'FaBullhorn' },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'All Levels'], default: 'Beginner' },
  duration: { type: String, required: true },
  students: { type: String, default: '0+' },
  rating: { type: Number, default: 5.0 },
  price: { type: String, required: true },
  shortDesc: { type: String, required: true },
  description: { type: String, required: true },
  whatYouLearn: [{ type: String }],
  modules: [moduleSchema],
  outcomes: [{ type: String }],
  image: { type: String },
  popular: { type: Boolean, default: false },
  featured: { type: Boolean, default: false }
}, { timestamps: true })

export default mongoose.model('Course', courseSchema)
