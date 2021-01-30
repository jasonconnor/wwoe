import mongoose from 'mongoose'

const PostSchema = mongoose.Schema({
  title: {
    type: String,
  },
  image: {
    type: String,
  },
  content: {
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

export default mongoose.model('Post', PostSchema)