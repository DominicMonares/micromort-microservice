const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
  res.send({message: 'Success!'});
});

module.exports = router;
