const express = require('express')
const router = express.Router()

// Placeholder routes for notifications
router.get('/', (req, res) => {
  res.json({ message: 'Notifications API - Coming soon!' })
})

router.patch('/:id/read', (req, res) => {
  res.json({ message: 'Mark notification as read - Coming soon!' })
})

module.exports = router