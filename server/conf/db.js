import mongoose from 'mongoose'

const connect = async (url) => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

  try {
    await mongoose.connect(url, options)
    console.log('Connected to MongoDB.')
  } catch(error) {
    console.error(error)
    process.exit(1)
  }

  mongoose.connection.on('error', (error) => {
    console.error(`MongoDB Error: ${error}`)
  })
}

export default connect