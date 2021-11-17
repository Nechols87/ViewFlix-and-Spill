const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../config/auth');

// Load Reviews model
const Reviews = require('../models/Reviews')

router.get('/reviews', ensureAuth, async (req, res) => {
    try {
      const reviews = await Reviews.find({ status: 'public' })
        .populate('user')
        .lean()
  
      res.render('reviews', {
        reviews,
      })
    } catch (err) {
      console.error(err)
    }
  })

module.exports = router;