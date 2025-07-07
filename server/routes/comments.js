const express = require('express')
const router = express.Router()

// Placeholder routes for comments
router.get('/', (req, res) => {
  res.json({ message: 'Comments API - Coming soon!' })
})

router.post('/', (req, res) => {
  res.json({ message: 'Create comment - Coming soon!' })
})

module.exports = router