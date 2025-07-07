'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  XMarkIcon,
  PhotoIcon,
  VideoCameraIcon,
  BookOpenIcon,
  MapPinIcon,
  FaceSmileIcon,
} from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'

interface CreatePostProps {
  onClose: () => void
}

export default function CreatePost({ onClose }: CreatePostProps) {
  const { data: session } = useSession()
  const [content, setContent] = useState('')
  const [selectedMedia, setSelectedMedia] = useState<File[]>([])
  const [showBibleSearch, setShowBibleSearch] = useState(false)
  const [selectedVerse, setSelectedVerse] = useState<{text: string, reference: string} | null>(null)
  const [location, setLocation] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle post submission
    console.log('Submitting post:', {
      content,
      selectedMedia,
      selectedVerse,
      location,
      isPrivate
    })
    onClose()
  }

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedMedia(Array.from(e.target.files))
    }
  }

  const removeMedia = (index: number) => {
    setSelectedMedia(selectedMedia.filter((_, i) => i !== index))
  }

  const popularVerses = [
    { text: "For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, to give you hope and a future.", reference: "Jeremiah 29:11 (NIV)" },
    { text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.", reference: "Proverbs 3:5-6 (NIV)" },
    { text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.", reference: "Romans 8:28 (NIV)" },
    { text: "The Lord is my shepherd, I lack nothing.", reference: "Psalm 23:1 (NIV)" },
  ]

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Share Your Faith
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <XMarkIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <form onSubmit={handleSubmit} className="p-6">
              {/* User Info */}
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={session?.user?.image || '/default-avatar.png'}
                  alt={session?.user?.name || 'User'}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {session?.user?.name}
                  </h3>
                  <select 
                    value={isPrivate ? 'private' : 'public'}
                    onChange={(e) => setIsPrivate(e.target.value === 'private')}
                    className="text-sm bg-gray-100 dark:bg-gray-700 border-0 rounded px-2 py-1 text-gray-700 dark:text-gray-300"
                  >
                    <option value="public">Public</option>
                    <option value="private">Friends only</option>
                  </select>
                </div>
              </div>

              {/* Text Content */}
              <div className="mb-4">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share your faith journey, testimony, or thoughts..."
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-spiritual-purple bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  rows={4}
                />
              </div>

              {/* Selected Verse */}
              {selectedVerse && (
                <div className="mb-4 p-4 bg-spiritual-peace dark:bg-gray-700 rounded-lg border-l-4 border-spiritual-gold">
                  <blockquote className="bible-verse mb-2">
                    "{selectedVerse.text}"
                  </blockquote>
                  <cite className="bible-reference">
                    {selectedVerse.reference}
                  </cite>
                  <button
                    type="button"
                    onClick={() => setSelectedVerse(null)}
                    className="ml-2 text-xs text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Media Preview */}
              {selectedMedia.length > 0 && (
                <div className="mb-4">
                  <div className="grid grid-cols-2 gap-2">
                    {selectedMedia.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeMedia(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bible Search */}
              {showBibleSearch && (
                <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Popular Verses</h4>
                  <div className="space-y-2">
                    {popularVerses.map((verse, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setSelectedVerse(verse)
                          setShowBibleSearch(false)
                        }}
                        className="w-full text-left p-3 bg-white dark:bg-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
                      >
                        <p className="text-sm text-gray-900 dark:text-white">
                          "{verse.text.substring(0, 100)}..."
                        </p>
                        <p className="text-xs text-spiritual-purple mt-1">
                          {verse.reference}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Location */}
              {location && (
                <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <MapPinIcon className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-900 dark:text-white">{location}</span>
                    <button
                      type="button"
                      onClick={() => setLocation('')}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={handleMediaUpload}
                      className="hidden"
                    />
                    <div className="flex items-center space-x-1 text-gray-500 hover:text-spiritual-purple transition-colors">
                      <PhotoIcon className="h-5 w-5" />
                      <span className="text-sm">Photo/Video</span>
                    </div>
                  </label>

                  <button
                    type="button"
                    onClick={() => setShowBibleSearch(!showBibleSearch)}
                    className="flex items-center space-x-1 text-gray-500 hover:text-spiritual-purple transition-colors"
                  >
                    <BookOpenIcon className="h-5 w-5" />
                    <span className="text-sm">Bible Verse</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLocation('Current Location')}
                    className="flex items-center space-x-1 text-gray-500 hover:text-spiritual-purple transition-colors"
                  >
                    <MapPinIcon className="h-5 w-5" />
                    <span className="text-sm">Location</span>
                  </button>

                  <button
                    type="button"
                    className="flex items-center space-x-1 text-gray-500 hover:text-spiritual-purple transition-colors"
                  >
                    <FaceSmileIcon className="h-5 w-5" />
                    <span className="text-sm">Feeling</span>
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!content.trim()}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    content.trim()
                      ? 'bg-spiritual-purple text-white hover:bg-spiritual-purple/90'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Share
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  )
}