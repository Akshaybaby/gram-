const express = require('express')
const { body, validationResult } = require('express-validator')
const { PrismaClient } = require('@prisma/client')
const auth = require('../middleware/auth')

const prisma = new PrismaClient()
const router = express.Router()

// Get feed posts
router.get('/feed', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query
    const offset = (parseInt(page) - 1) * parseInt(limit)

    const posts = await prisma.post.findMany({
      skip: offset,
      take: parseInt(limit),
      orderBy: { createdAt: 'desc' },
      where: {
        OR: [
          { isPrivate: false },
          { 
            userId: req.userId,
          },
          {
            user: {
              followers: {
                some: {
                  followerId: req.userId
                }
              }
            }
          }
        ]
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            denomination: true,
            isVerified: true,
          }
        },
        _count: {
          select: {
            likes: true,
            comments: true,
            bookmarks: true,
          }
        },
        likes: {
          where: {
            userId: req.userId
          },
          select: {
            id: true
          }
        },
        bookmarks: {
          where: {
            userId: req.userId
          },
          select: {
            id: true
          }
        }
      }
    })

    // Add isLiked and isBookmarked flags
    const postsWithFlags = posts.map(post => ({
      ...post,
      isLiked: post.likes.length > 0,
      isBookmarked: post.bookmarks.length > 0,
      likes: post._count.likes,
      comments: post._count.comments,
      bookmarks: post._count.bookmarks,
      _count: undefined
    }))

    res.json({
      posts: postsWithFlags,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        hasMore: posts.length === parseInt(limit)
      }
    })

  } catch (error) {
    console.error('Get feed error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Create post
router.post('/', [
  auth,
  body('content').isLength({ min: 1 }).trim(),
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { 
      content, 
      mediaUrls = [], 
      videoUrl, 
      youtubeUrl, 
      bibleVerse, 
      location,
      isPrivate = false 
    } = req.body

    const post = await prisma.post.create({
      data: {
        content,
        mediaUrls,
        videoUrl,
        youtubeUrl,
        bibleVerse,
        location,
        isPrivate,
        userId: req.userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            denomination: true,
            isVerified: true,
          }
        },
        _count: {
          select: {
            likes: true,
            comments: true,
            bookmarks: true,
          }
        }
      }
    })

    res.status(201).json({
      message: 'Post created successfully',
      post: {
        ...post,
        isLiked: false,
        isBookmarked: false,
        likes: 0,
        comments: 0,
        bookmarks: 0,
      }
    })

  } catch (error) {
    console.error('Create post error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Get single post
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            denomination: true,
            isVerified: true,
          }
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
                denomination: true,
                isVerified: true,
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: {
            likes: true,
            comments: true,
            bookmarks: true,
          }
        },
        likes: {
          where: {
            userId: req.userId
          }
        },
        bookmarks: {
          where: {
            userId: req.userId
          }
        }
      }
    })

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    // Check if user has access to private post
    if (post.isPrivate && post.userId !== req.userId) {
      const isFollowing = await prisma.follow.findFirst({
        where: {
          followerId: req.userId,
          followingId: post.userId
        }
      })

      if (!isFollowing) {
        return res.status(403).json({ message: 'Access denied' })
      }
    }

    res.json({
      post: {
        ...post,
        isLiked: post.likes.length > 0,
        isBookmarked: post.bookmarks.length > 0,
        likes: post._count.likes,
        bookmarks: post._count.bookmarks,
      }
    })

  } catch (error) {
    console.error('Get post error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Like/Unlike post
router.post('/:id/like', auth, async (req, res) => {
  try {
    const { id } = req.params

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: req.userId,
          postId: id
        }
      }
    })

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: { id: existingLike.id }
      })
      
      res.json({ message: 'Post unliked', isLiked: false })
    } else {
      // Like
      await prisma.like.create({
        data: {
          userId: req.userId,
          postId: id
        }
      })

      res.json({ message: 'Post liked', isLiked: true })
    }

  } catch (error) {
    console.error('Like post error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Bookmark/Unbookmark post
router.post('/:id/bookmark', auth, async (req, res) => {
  try {
    const { id } = req.params

    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        userId_postId: {
          userId: req.userId,
          postId: id
        }
      }
    })

    if (existingBookmark) {
      // Unbookmark
      await prisma.bookmark.delete({
        where: { id: existingBookmark.id }
      })
      
      res.json({ message: 'Post unbookmarked', isBookmarked: false })
    } else {
      // Bookmark
      await prisma.bookmark.create({
        data: {
          userId: req.userId,
          postId: id
        }
      })

      res.json({ message: 'Post bookmarked', isBookmarked: true })
    }

  } catch (error) {
    console.error('Bookmark post error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params

    const post = await prisma.post.findUnique({
      where: { id },
      select: { userId: true }
    })

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    if (post.userId !== req.userId) {
      return res.status(403).json({ message: 'Access denied' })
    }

    await prisma.post.delete({
      where: { id }
    })

    res.json({ message: 'Post deleted successfully' })

  } catch (error) {
    console.error('Delete post error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = router