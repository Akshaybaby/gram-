'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  BookmarkIcon,
  ShareIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid'

const translations = [
  { id: 'niv', name: 'NIV', fullName: 'New International Version' },
  { id: 'esv', name: 'ESV', fullName: 'English Standard Version' },
  { id: 'nrsv', name: 'NRSV', fullName: 'New Revised Standard Version' },
  { id: 'nabre', name: 'NABRE', fullName: 'New American Bible Revised Edition (Catholic)' },
  { id: 'rsvce', name: 'RSV-CE', fullName: 'Revised Standard Version Catholic Edition' },
  { id: 'dr', name: 'DR', fullName: 'Douay-Rheims (Catholic)' },
]

const books = [
  // Old Testament
  { name: 'Genesis', chapters: 50, testament: 'Old' },
  { name: 'Exodus', chapters: 40, testament: 'Old' },
  { name: 'Leviticus', chapters: 27, testament: 'Old' },
  { name: 'Numbers', chapters: 36, testament: 'Old' },
  { name: 'Deuteronomy', chapters: 34, testament: 'Old' },
  { name: 'Joshua', chapters: 24, testament: 'Old' },
  { name: 'Judges', chapters: 21, testament: 'Old' },
  { name: 'Ruth', chapters: 4, testament: 'Old' },
  { name: '1 Samuel', chapters: 31, testament: 'Old' },
  { name: '2 Samuel', chapters: 24, testament: 'Old' },
  { name: '1 Kings', chapters: 22, testament: 'Old' },
  { name: '2 Kings', chapters: 25, testament: 'Old' },
  { name: 'Psalms', chapters: 150, testament: 'Old' },
  { name: 'Proverbs', chapters: 31, testament: 'Old' },
  { name: 'Ecclesiastes', chapters: 12, testament: 'Old' },
  { name: 'Isaiah', chapters: 66, testament: 'Old' },
  { name: 'Jeremiah', chapters: 52, testament: 'Old' },
  { name: 'Daniel', chapters: 12, testament: 'Old' },
  // New Testament
  { name: 'Matthew', chapters: 28, testament: 'New' },
  { name: 'Mark', chapters: 16, testament: 'New' },
  { name: 'Luke', chapters: 24, testament: 'New' },
  { name: 'John', chapters: 21, testament: 'New' },
  { name: 'Acts', chapters: 28, testament: 'New' },
  { name: 'Romans', chapters: 16, testament: 'New' },
  { name: '1 Corinthians', chapters: 16, testament: 'New' },
  { name: '2 Corinthians', chapters: 13, testament: 'New' },
  { name: 'Galatians', chapters: 6, testament: 'New' },
  { name: 'Ephesians', chapters: 6, testament: 'New' },
  { name: 'Philippians', chapters: 4, testament: 'New' },
  { name: 'Colossians', chapters: 4, testament: 'New' },
  { name: '1 Timothy', chapters: 6, testament: 'New' },
  { name: '2 Timothy', chapters: 4, testament: 'New' },
  { name: 'James', chapters: 5, testament: 'New' },
  { name: '1 Peter', chapters: 5, testament: 'New' },
  { name: '2 Peter', chapters: 3, testament: 'New' },
  { name: '1 John', chapters: 5, testament: 'New' },
  { name: 'Revelation', chapters: 22, testament: 'New' },
]

// Sample Bible text (John 3:16-17)
const sampleText = {
  'john': {
    3: {
      verses: [
        { number: 16, text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." },
        { number: 17, text: "For God did not send his Son into the world to condemn the world, but to save the world through him." },
        { number: 18, text: "Whoever believes in him is not condemned, but whoever does not believe stands condemned already because they have not believed in the name of God's one and only Son." },
        { number: 19, text: "This is the verdict: Light has come into the world, but people loved darkness instead of light because their deeds were evil." },
        { number: 20, text: "Everyone who does evil hates the light, and will not come into the light for fear that their deeds will be exposed." },
        { number: 21, text: "But whoever lives by the truth comes into the light, so that it may be seen plainly that what they have done has been done in the sight of God." }
      ]
    }
  }
}

export default function BibleReader() {
  const [selectedTranslation, setSelectedTranslation] = useState('niv')
  const [selectedBook, setSelectedBook] = useState('John')
  const [selectedChapter, setSelectedChapter] = useState(3)
  const [showBookSelector, setShowBookSelector] = useState(false)
  const [fontSize, setFontSize] = useState('text-base')
  const [bookmarkedVerses, setBookmarkedVerses] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const currentBook = books.find(book => book.name === selectedBook)
  const currentChapterText = sampleText.john[3]

  const toggleBookmark = (verse: string) => {
    if (bookmarkedVerses.includes(verse)) {
      setBookmarkedVerses(bookmarkedVerses.filter(v => v !== verse))
    } else {
      setBookmarkedVerses([...bookmarkedVerses, verse])
    }
  }

  const shareVerse = (verse: any) => {
    const text = `"${verse.text}" - ${selectedBook} ${selectedChapter}:${verse.number} (${selectedTranslation.toUpperCase()})`
    if (navigator.share) {
      navigator.share({ text })
    } else {
      navigator.clipboard.writeText(text)
    }
  }

  const previousChapter = () => {
    if (selectedChapter > 1) {
      setSelectedChapter(selectedChapter - 1)
    }
  }

  const nextChapter = () => {
    if (currentBook && selectedChapter < currentBook.chapters) {
      setSelectedChapter(selectedChapter + 1)
    }
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="card p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Translation Selector */}
          <div className="flex items-center space-x-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Translation:
            </label>
            <select
              value={selectedTranslation}
              onChange={(e) => setSelectedTranslation(e.target.value)}
              className="input-field text-sm"
            >
              {translations.map((translation) => (
                <option key={translation.id} value={translation.id}>
                  {translation.name} - {translation.fullName}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search verses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 input-field"
              />
            </div>
          </div>

          {/* Font Size */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setFontSize('text-sm')}
              className={`px-2 py-1 text-xs rounded ${fontSize === 'text-sm' ? 'bg-spiritual-purple text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize('text-base')}
              className={`px-2 py-1 text-sm rounded ${fontSize === 'text-base' ? 'bg-spiritual-purple text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize('text-lg')}
              className={`px-2 py-1 text-base rounded ${fontSize === 'text-lg' ? 'bg-spiritual-purple text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            >
              A
            </button>
          </div>
        </div>
      </div>

      {/* Book and Chapter Navigation */}
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowBookSelector(!showBookSelector)}
              className="btn-secondary"
            >
              {selectedBook}
            </button>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={previousChapter}
                disabled={selectedChapter === 1}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              
              <span className="text-lg font-semibold text-gray-900 dark:text-white px-4">
                Chapter {selectedChapter}
              </span>
              
              <button
                onClick={nextChapter}
                disabled={!currentBook || selectedChapter === currentBook.chapters}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            {currentBook && `${selectedChapter} of ${currentBook.chapters} chapters`}
          </div>
        </div>

        {/* Book Selector */}
        {showBookSelector && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {books.map((book) => (
                <button
                  key={book.name}
                  onClick={() => {
                    setSelectedBook(book.name)
                    setSelectedChapter(1)
                    setShowBookSelector(false)
                  }}
                  className={`p-2 text-sm rounded transition-colors ${
                    selectedBook === book.name
                      ? 'bg-spiritual-purple text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {book.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Bible Text */}
      <div className="card p-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {selectedBook} {selectedChapter}
          </h2>
          
          <div className="space-y-3">
            {currentChapterText.verses.map((verse) => {
              const verseId = `${selectedBook.toLowerCase()}-${selectedChapter}-${verse.number}`
              const isBookmarked = bookmarkedVerses.includes(verseId)
              
              return (
                <motion.div
                  key={verse.number}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: verse.number * 0.1 }}
                  className="group relative"
                >
                  <div className={`${fontSize} leading-relaxed text-gray-800 dark:text-gray-200 font-scripture`}>
                    <span className="text-spiritual-purple font-bold mr-2">
                      {verse.number}
                    </span>
                    {verse.text}
                  </div>
                  
                  {/* Verse Actions */}
                  <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-2">
                    <button
                      onClick={() => toggleBookmark(verseId)}
                      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {isBookmarked ? (
                        <BookmarkIconSolid className="h-4 w-4 text-spiritual-gold" />
                      ) : (
                        <BookmarkIcon className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                    
                    <button
                      onClick={() => shareVerse(verse)}
                      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <ShareIcon className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Reading Plan Suggestion */}
      <div className="card p-6 bg-gradient-to-r from-spiritual-peace to-spiritual-grace dark:from-gray-800 dark:to-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          Daily Reading Plan
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Join thousands of believers reading through the Bible in a year. Today's reading includes:
        </p>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700 dark:text-gray-300">Genesis 1-2</span>
            <button className="text-xs text-spiritual-purple hover:underline">Read</button>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700 dark:text-gray-300">Psalm 1</span>
            <button className="text-xs text-spiritual-purple hover:underline">Read</button>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700 dark:text-gray-300">Matthew 1</span>
            <button className="text-xs text-spiritual-purple hover:underline">Read</button>
          </div>
        </div>
      </div>
    </div>
  )
}