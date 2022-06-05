const express = require('express');
const router = express.Router();

router.post('/commute', (req, res) => {
  console.log('REQ ', req.body);
  res.send({test: 1});
})

module.exports = router;
