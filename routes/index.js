const express = require('express') 
const router = express.Router()

// This will be the Login page
//router get login
router.get('/', (req, res) => {
    res.render('login')
})

//signup page router to get signup
router.get('/signup', (req, res) => {
    res.render('signup')
})

//Sign Up Handle
router.post('/signup', (req, res) => {
    console.log(reg.body)
    res.send('hello')
})

//dashboard page
//router get dashboard
router.get('/dashboard', (req, res) => {
    res.render('dashboard')
})


module.exports = router