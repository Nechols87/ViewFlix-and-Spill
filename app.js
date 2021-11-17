const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')

const app = express()

connectDB()

require('./config/passport')(passport);

// Loading config for knowing what to load
dotenv.config({path: './config/config.env'})

const db = require('./config/config.env').MongoURI;

mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

//Handlebars
app.engine('.hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')


//Bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

//Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/3000' })
}))

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());



// Logging information to check if it's development or production
if(process.env.NODE_ENV === 'devolopment') {
    app.use(morgan('dev'))
}

//Static Folder
//Can impliment CSS through public folder
app.use(express.static(path.join(__dirname, 'public')))



app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))
// app.use('/reviews', require('./routes/reviews'))

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))
