import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String
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