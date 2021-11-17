const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Load Reviews model
const Reviews = require('../models/Reviews')

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    name: req.user.name
  })
);

// Add Content Page
router.get('/addcontent', ensureAuthenticated, (req, res) =>
  res.render('addcontent', {
    name: req.user.name
  })
);

// Add Reviews Page
router.get('/reviews', ensureAuthenticated, (req, res) =>
  res.render('reviews', {
    name: req.user.name
  })
);


// Process add reviews
// POST/add reviews
router.post('/reviews', ensureAuthenticated, async (req, res) => {
  try {
      req.body.user = req.user  
      await Reviews.create(req.body)
      res.redirect('/review')
  } catch (err) {
      console.error(err)
  }
});


router.get('/reviews', ensureAuthenticated, async (req, res) => {
    try {
        const reviews = await Reviews.find({ user: req.user.id }).lean()
        res.render('reviews', {
          name: req.user.name,
          reviews
      })
    }catch (err) {
      console.error(err)
    }
});

module.exports = router;