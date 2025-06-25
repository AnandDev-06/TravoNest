const express = require('express');
const router = express.Router();

router.get('/about', (req, res) => {
  res.render("listings/about.ejs");
});

router.get('/privacy', (req, res) => {
  res.render("listings/privacy.ejs");
});

module.exports = router;
