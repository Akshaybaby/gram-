const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.userId
    
    next()
  } catch (error) {
    console.error('Auth middleware error:', error)
    res.status(401).json({ message: 'Invalid token.' })
  }
}

module.exports = auth