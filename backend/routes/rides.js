const router = require('express').Router();

router.get('/test', (req, res) => {
  res.json({ message: 'Rides route working' });
});

module.exports = router;