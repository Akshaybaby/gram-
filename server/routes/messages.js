const express = require('express')
const router = express.Router()

// Placeholder routes for messages
router.get('/', (req, res) => {
  res.json({ message: 'Messages API - Coming soon!' })
})

router.post('/', (req, res) => {
  res.json({ message: 'Send message - Coming soon!' })
})

module.exports = router