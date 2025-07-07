const express = require('express')
const router = express.Router()

// Placeholder routes for admin
router.get('/stats', (req, res) => {
  res.json({ message: 'Admin stats - Coming soon!' })
})

router.post('/moderate', (req, res) => {
  res.json({ message: 'Content moderation - Coming soon!' })
})

module.exports = router