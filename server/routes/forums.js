const express = require('express')
const router = express.Router()

// Placeholder routes for forums
router.get('/', (req, res) => {
  res.json({ message: 'Forums API - Coming soon!' })
})

router.post('/', (req, res) => {
  res.json({ message: 'Create forum post - Coming soon!' })
})

module.exports = router