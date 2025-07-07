const express = require('express')
const { PrismaClient } = require('@prisma/client')
const auth = require('../middleware/auth')

const prisma = new PrismaClient()
const router = express.Router()

// Get user profile
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: req.userId === id, // Only show email to self
        image: true,
        bio: true,
        location: true,
        denomination: true,
        website: true,
        isVerified: true,
        createdAt: true,
        _count: {
          select: {
            posts: true,
            followers: true,
            following: true,
          }
        }
      }
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Check if current user follows this user
    const isFollowing = await prisma.follow.findFirst({
      where: {
        followerId: req.userId,
        followingId: id
      }
    })

    res.json({
      user: {
        ...user,
        isFollowing: !!isFollowing,
        isOwnProfile: req.userId === id
      }
    })

  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Follow/Unfollow user
router.post('/:id/follow', auth, async (req, res) => {
  try {
    const { id } = req.params

    if (id === req.userId) {
      return res.status(400).json({ message: 'Cannot follow yourself' })
    }

    const existingFollow = await prisma.follow.findFirst({
      where: {
        followerId: req.userId,
        followingId: id
      }
    })

    if (existingFollow) {
      // Unfollow
      await prisma.follow.delete({
        where: { id: existingFollow.id }
      })
      
      res.json({ message: 'User unfollowed', isFollowing: false })
    } else {
      // Follow
      await prisma.follow.create({
        data: {
          followerId: req.userId,
          followingId: id
        }
      })

      res.json({ message: 'User followed', isFollowing: true })
    }

  } catch (error) {
    console.error('Follow user error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Search users
router.get('/search', auth, async (req, res) => {
  try {
    const { q, denomination } = req.query

    if (!q || q.length < 2) {
      return res.status(400).json({ message: 'Search query must be at least 2 characters' })
    }

    const users = await prisma.user.findMany({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: q, mode: 'insensitive' } },
              { email: { contains: q, mode: 'insensitive' } }
            ]
          },
          denomination ? { denomination } : {}
        ]
      },
      select: {
        id: true,
        name: true,
        image: true,
        denomination: true,
        isVerified: true,
        _count: {
          select: {
            followers: true
          }
        }
      },
      take: 20
    })

    res.json({ users })

  } catch (error) {
    console.error('Search users error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = router