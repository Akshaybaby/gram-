const express = require('express')
const router = express.Router()

// Placeholder routes for prayer requests
router.get('/', (req, res) => {
  res.json({ message: 'Prayer Requests API - Coming soon!' })
})

router.post('/', (req, res) => {
  res.json({ message: 'Create prayer request - Coming soon!' })
})

module.exports = router