const express = require('express')
const router = express.Router()

// Placeholder routes for events
router.get('/', (req, res) => {
  res.json({ message: 'Events API - Coming soon!' })
})

router.post('/', (req, res) => {
  res.json({ message: 'Create event - Coming soon!' })
})

module.exports = router