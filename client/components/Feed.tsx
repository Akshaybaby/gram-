'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  ShareIcon,
  BookmarkIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline'
import {
  HeartIcon as HeartIconSolid,
} from '@heroicons/react/24/solid'
import { formatDistanceToNow } from 'date-fns'

// Mock data for posts
const mockPosts = [
  {
    id: '1',
    user: {
      id: '1',
      name: 'Sarah Johnson',
      username: 'sarahj',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      denomination: 'Methodist',
    },
    content: "Just finished reading Psalm 23 and feeling so grateful for God's guidance in my life. 'The Lord is my shepherd, I shall not want.' These words bring such peace to my heart. 🙏",
    images: [],
    video: null,
    bibleVerse: {
      text: "The Lord is my shepherd, I shall not want. He makes me lie down in green pastures; he leads me beside quiet waters.",
      reference: "Psalm 23:1-2 (NIV)"
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    likes: 24,
    comments: 8,
    shares: 3,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: '2',
    user: {
      id: '2',
      name: 'Father Michael',
      username: 'frmichael',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      denomination: 'Catholic',
    },
    content: "Beautiful morning at our parish! Reminder that we have confession available every Saturday from 3-5 PM. Come as you are - God's mercy is endless. ✝️",
    images: [
      'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600&h=400&fit=crop'
    ],
    video: null,
    bibleVerse: null,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    likes: 67,
    comments: 15,
    shares: 12,
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: '3',
    user: {
      id: '3',
      name: 'Youth Group Leaders',
      username: 'youthministry',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      denomination: 'Evangelical',
    },
    content: "Our youth had an amazing time at the retreat last weekend! So much growth and fellowship. Thank you to everyone who made it possible. Check out this awesome worship session! 🎵",
    images: [],
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    bibleVerse: null,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    likes: 156,
    comments: 32,
    shares: 28,
    isLiked: false,
    isBookmarked: true,
  },
]

interface PostProps {
  post: typeof mockPosts[0]
}

function Post({ post }: PostProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [likesCount, setLikesCount] = useState(post.likes)
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card p-6"
    >
      {/* Post Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={post.user.image}
            alt={post.user.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {post.user.name}
              </h3>
              <span className="text-xs bg-spiritual-purple/20 text-spiritual-purple px-2 py-1 rounded-full">
                {post.user.denomination}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              @{post.user.username} • {formatDistanceToNow(post.createdAt)} ago
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
          <EllipsisHorizontalIcon className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
          {post.content}
        </p>
      </div>

      {/* Bible Verse */}
      {post.bibleVerse && (
        <div className="mb-4 p-4 bg-spiritual-peace dark:bg-gray-700 rounded-lg border-l-4 border-spiritual-gold">
          <blockquote className="bible-verse mb-2">
            "{post.bibleVerse.text}"
          </blockquote>
          <cite className="bible-reference">
            {post.bibleVerse.reference}
          </cite>
        </div>
      )}

      {/* Post Images */}
      {post.images && post.images.length > 0 && (
        <div className="mb-4">
          <div className="grid grid-cols-1 gap-2">
            {post.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Post image ${index + 1}`}
                className="w-full rounded-lg object-cover max-h-96"
              />
            ))}
          </div>
        </div>
      )}

      {/* Video Preview */}
      {post.video && (
        <div className="mb-4">
          <div className="relative bg-gray-100 dark:bg-gray-700 rounded-lg aspect-video">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-spiritual-purple text-white p-4 rounded-full">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <p className="absolute bottom-2 left-2 text-white text-sm bg-black/50 px-2 py-1 rounded">
              Worship Session
            </p>
          </div>
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            className="flex items-center space-x-2 text-gray-500 hover:text-christian-love transition-colors"
          >
            {isLiked ? (
              <HeartIconSolid className="h-5 w-5 text-christian-love" />
            ) : (
              <HeartIcon className="h-5 w-5" />
            )}
            <span className="text-sm font-medium">{likesCount}</span>
          </button>

          <button className="flex items-center space-x-2 text-gray-500 hover:text-spiritual-purple transition-colors">
            <ChatBubbleOvalLeftIcon className="h-5 w-5" />
            <span className="text-sm font-medium">{post.comments}</span>
          </button>

          <button className="flex items-center space-x-2 text-gray-500 hover:text-christian-hope transition-colors">
            <ShareIcon className="h-5 w-5" />
            <span className="text-sm font-medium">{post.shares}</span>
          </button>
        </div>

        <button
          onClick={handleBookmark}
          className={`p-2 rounded-full transition-colors ${
            isBookmarked
              ? 'text-spiritual-gold hover:text-spiritual-gold/70'
              : 'text-gray-500 hover:text-spiritual-gold'
          }`}
        >
          <BookmarkIcon className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>
    </motion.div>
  )
}

export default function Feed() {
  return (
    <div className="space-y-6">
      {mockPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      
      {/* Load More */}
      <div className="text-center py-8">
        <button className="btn-primary">
          Load More Posts
        </button>
      </div>
    </div>
  )
}