'use client'

import React from 'react'
import {
  UserPlusIcon,
  FireIcon,
  HandRaisedIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline'

const suggestedUsers = [
  {
    id: '1',
    name: 'Pastor David',
    username: 'pastordavid',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    denomination: 'Baptist',
    followers: '2.3k',
  },
  {
    id: '2',
    name: 'Sister Mary',
    username: 'sistermary',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    denomination: 'Catholic',
    followers: '1.8k',
  },
  {
    id: '3',
    name: 'Youth Leader Mike',
    username: 'youthmike',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    denomination: 'Methodist',
    followers: '954',
  },
]

const trendingTopics = [
  { tag: '#PrayerRequest', posts: '2.1k' },
  { tag: '#Testimony', posts: '1.8k' },
  { tag: '#BibleStudy', posts: '1.5k' },
  { tag: '#SundayService', posts: '1.2k' },
  { tag: '#YouthMinistry', posts: '856' },
  { tag: '#ChristmasSermon', posts: '743' },
]

const upcomingEvents = [
  {
    id: '1',
    title: 'Sunday Mass',
    time: 'Tomorrow at 10:00 AM',
    location: 'St. Mary Church',
    attendees: 45,
  },
  {
    id: '2',
    title: 'Youth Bible Study',
    time: 'Wednesday at 7:00 PM',
    location: 'Community Center',
    attendees: 23,
  },
  {
    id: '3',
    title: 'Prayer Meeting',
    time: 'Friday at 6:00 PM',
    location: 'Online',
    attendees: 67,
  },
]

const prayerRequests = [
  {
    id: '1',
    user: 'Anna M.',
    request: 'Please pray for my grandmother\'s recovery',
    time: '2h ago',
    prayers: 24,
  },
  {
    id: '2',
    user: 'John K.',
    request: 'Seeking guidance for a new job opportunity',
    time: '4h ago',
    prayers: 18,
  },
  {
    id: '3',
    user: 'Maria L.',
    request: 'Safe travels for my family vacation',
    time: '6h ago',
    prayers: 31,
  },
]

export default function RightSidebar() {
  return (
    <div className="space-y-6">
      {/* Suggested People */}
      <div className="card p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Suggested for You</h3>
        <div className="space-y-3">
          {suggestedUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.denomination} • {user.followers} followers
                  </p>
                </div>
              </div>
              <button className="p-1 text-spiritual-purple hover:bg-spiritual-purple/10 rounded transition-colors">
                <UserPlusIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 text-sm text-spiritual-purple hover:underline">
          See all suggestions
        </button>
      </div>

      {/* Trending Topics */}
      <div className="card p-4">
        <div className="flex items-center space-x-2 mb-4">
          <FireIcon className="h-5 w-5 text-orange-500" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Trending</h3>
        </div>
        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div key={index} className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 -mx-2 px-2 py-1 rounded transition-colors">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-spiritual-purple">
                  {topic.tag}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {topic.posts} posts
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="card p-4">
        <div className="flex items-center space-x-2 mb-4">
          <CalendarDaysIcon className="h-5 w-5 text-spiritual-purple" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Upcoming Events</h3>
        </div>
        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="border-l-2 border-spiritual-purple pl-3">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                {event.title}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {event.time}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {event.location} • {event.attendees} attending
              </p>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 text-sm text-spiritual-purple hover:underline">
          View all events
        </button>
      </div>

      {/* Prayer Requests */}
      <div className="card p-4">
        <div className="flex items-center space-x-2 mb-4">
          <HandRaisedIcon className="h-5 w-5 text-spiritual-gold" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Prayer Requests</h3>
        </div>
        <div className="space-y-3">
          {prayerRequests.map((request) => (
            <div key={request.id} className="space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {request.user}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {request.request}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {request.time}
                    </span>
                    <button className="flex items-center space-x-1 text-xs text-spiritual-purple hover:underline">
                      <HandRaisedIcon className="h-3 w-3" />
                      <span>{request.prayers} praying</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 text-sm text-spiritual-purple hover:underline">
          View all requests
        </button>
      </div>

      {/* Daily Reflection */}
      <div className="card p-4 bg-gradient-to-br from-spiritual-peace to-spiritual-grace dark:from-gray-800 dark:to-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Daily Reflection</h3>
        <blockquote className="bible-verse text-sm mb-3">
          "Be still and know that I am God; I will be exalted among the nations, I will be exalted in the earth."
        </blockquote>
        <cite className="bible-reference">
          Psalm 46:10 (NIV)
        </cite>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-3">
          Take a moment today to pause and recognize God's presence in your life. In the busyness of daily life, remember that He is in control.
        </p>
      </div>
    </div>
  )
}