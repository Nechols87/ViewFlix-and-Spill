const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifidedTopology: true,
            useFindAndModify: false
      })

      console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
        console.log(error(err))
        process.exit(1)
    }
}

module.exports = connectDB