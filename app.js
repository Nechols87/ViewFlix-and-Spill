const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db');
const exphbs = require('express-handlebars');
const MongoStore = require('connect-mongo')

// Loading config for knowing what to load
dotenv.config({path: './config/config.env'})

const db = require('./config/config.env').MongoURI;

mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

connectDB()



const app = express()
// const User = require('./models/User')

// Logging information to check if it's development or production
if(process.env.NODE_ENV === 'devolopment') {
    app.use(morgan('dev'))
}

//Handlebars
app.engine('.hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')

//Static Folder
app.use(express.static(path.join(__dirname, 'public')))

//Bodyparser
app.use(express.urlencoded({ extended: false }));

app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))
