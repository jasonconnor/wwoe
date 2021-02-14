import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    max: 20,
    min: 4
  },
  password: {
    type: String,
    required: true,
    select: false,
    max: 20,
    min: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

export default mongoose.model('User', UserSchema)