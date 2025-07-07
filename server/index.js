const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const compression = require('compression')
const rateLimit = require('express-rate-limit')
const { createServer } = require('http')
const { Server } = require('socket.io')
require('dotenv').config()

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
  }
})

const PORT = process.env.PORT || 3001

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
})

// Middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'", "https:", "http:", "ws:", "wss:"],
    },
  },
}))

app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}))

app.use(compression())
app.use(morgan('combined'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use('/api', limiter)

// Import routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')
const postRoutes = require('./routes/posts')
const commentRoutes = require('./routes/comments')
const messageRoutes = require('./routes/messages')
const prayerRoutes = require('./routes/prayers')
const forumRoutes = require('./routes/forums')
const eventRoutes = require('./routes/events')
const bibleRoutes = require('./routes/bible')
const notificationRoutes = require('./routes/notifications')
const adminRoutes = require('./routes/admin')

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/prayers', prayerRoutes)
app.use('/api/forums', forumRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/bible', bibleRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/admin', adminRoutes)

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'ChristConnect API',
    version: '1.0.0'
  })
})

// Socket.IO for real-time features
io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  // Join user to their personal room
  socket.on('join-user-room', (userId) => {
    socket.join(`user-${userId}`)
    console.log(`User ${userId} joined their room`)
  })

  // Join prayer room
  socket.on('join-prayer-room', (roomId) => {
    socket.join(`prayer-${roomId}`)
    socket.to(`prayer-${roomId}`).emit('user-joined-prayer', {
      userId: socket.userId,
      timestamp: new Date()
    })
  })

  // Leave prayer room
  socket.on('leave-prayer-room', (roomId) => {
    socket.leave(`prayer-${roomId}`)
    socket.to(`prayer-${roomId}`).emit('user-left-prayer', {
      userId: socket.userId,
      timestamp: new Date()
    })
  })

  // Handle private messages
  socket.on('send-message', (data) => {
    const { receiverId, message } = data
    socket.to(`user-${receiverId}`).emit('new-message', {
      senderId: socket.userId,
      message,
      timestamp: new Date()
    })
  })

  // Handle prayer requests
  socket.on('new-prayer-request', (data) => {
    socket.broadcast.emit('prayer-request-created', data)
  })

  // Handle live prayer updates
  socket.on('prayer-support', (data) => {
    const { prayerRequestId } = data
    socket.broadcast.emit('prayer-support-added', data)
  })

  // Handle notifications
  socket.on('send-notification', (data) => {
    const { userId, notification } = data
    socket.to(`user-${userId}`).emit('new-notification', notification)
  })

  // Handle typing indicators
  socket.on('typing-start', (data) => {
    const { receiverId } = data
    socket.to(`user-${receiverId}`).emit('user-typing', {
      userId: socket.userId,
      isTyping: true
    })
  })

  socket.on('typing-stop', (data) => {
    const { receiverId } = data
    socket.to(`user-${receiverId}`).emit('user-typing', {
      userId: socket.userId,
      isTyping: false
    })
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.message
    })
  }
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid or missing authentication token'
    })
  }
  
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong!' 
      : err.message
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  })
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...')
  server.close(() => {
    console.log('Process terminated')
  })
})

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...')
  server.close(() => {
    console.log('Process terminated')
  })
})

server.listen(PORT, () => {
  console.log(`🙏 ChristConnect Server running on port ${PORT}`)
  console.log(`📖 Environment: ${process.env.NODE_ENV}`)
  console.log(`🌐 API available at: http://localhost:${PORT}/api`)
  console.log(`❤️  Health check: http://localhost:${PORT}/api/health`)
})