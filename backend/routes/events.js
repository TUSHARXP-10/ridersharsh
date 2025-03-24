const router = require('express').Router();

router.get('/test', (req, res) => {
  res.json({ message: 'Events route working' });
});

module.exports = router;