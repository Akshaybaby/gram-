const express = require('express')
const router = express.Router()

// Placeholder routes for Bible
router.get('/', (req, res) => {
  res.json({ message: 'Bible API - Coming soon!' })
})

router.get('/verse/:book/:chapter/:verse', (req, res) => {
  res.json({ message: 'Get Bible verse - Coming soon!' })
})

module.exports = router