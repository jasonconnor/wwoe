import mongoose from 'mongoose'

const connect = async (url) => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }, console.log('Connected to MongoDB.'))
  } catch(error) {
    console.error(error)
    process.exit(1)
  }
}

export default connect