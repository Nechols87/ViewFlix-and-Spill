const express = require('express') 
const router = express.Router()
const bcrypt = require('bcryptjs')

//User Model
const User = require('../models/User')

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
    const { name, email, password, password2 } = req.body;
    let errors = [];

    //Check required fields
    if(!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    // Check passwords match
    if(password !== password2) {
        errors.push({ msg: 'Passwords do not match'})
    }

    // Check passwords length
    if(password.length < 6) {
        errors.push({ msg: 'Password too short'})
    }

    if(errors.length > 0) {
        res.render('signup', {
            errors,
            name, 
            email,
            password,
            password2
        });
    } else {
        // Validation pass
        User.findOne({ email: email })
        .then(user => {
            if(user) {
                // User exists
                // res.send({ msg: 'Email is already registered'})
                res.render('signup', {
                    errors,
                    name, 
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });

                //Hash Password
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    //set password to hashed
                    newUser.password = hash;
                    //Save user
                    newUser.save()
                    .then(user => {
                        res.redirect('/');
                    })
                    .catch(err => console.log(err));
                }))
            }
        })
    }



});

//dashboard page
//router get dashboard
router.get('/dashboard', (req, res) => {
    res.render('dashboard')
})


module.exports = router