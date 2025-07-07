'use client'

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import Navigation from './Navigation'
import Sidebar from './Sidebar'
import Feed from './Feed'
import RightSidebar from './RightSidebar'
import CreatePost from './CreatePost'
import BibleReader from './BibleReader'
import MessagesPanel from './MessagesPanel'
import PrayerGroups from './PrayerGroups'
import ChurchMeetups from './ChurchMeetups'
import ForumsPanel from './ForumsPanel'

type ActivePanel = 'feed' | 'bible' | 'messages' | 'prayer' | 'church' | 'forums'

export default function Dashboard() {
  const { data: session } = useSession()
  const [activePanel, setActivePanel] = useState<ActivePanel>('feed')
  const [showCreatePost, setShowCreatePost] = useState(false)

  const renderMainContent = () => {
    switch (activePanel) {
      case 'feed':
        return (
          <div className="space-y-6">
            <div className="card p-6">
              <button
                onClick={() => setShowCreatePost(true)}
                className="w-full text-left p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={session?.user?.image || '/default-avatar.png'}
                    alt={session?.user?.name || 'User'}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-gray-500 dark:text-gray-400">
                    Share your faith journey, Bible verse, or testimony...
                  </span>
                </div>
              </button>
            </div>
            <Feed />
          </div>
        )
      case 'bible':
        return <BibleReader />
      case 'messages':
        return <MessagesPanel />
      case 'prayer':
        return <PrayerGroups />
      case 'church':
        return <ChurchMeetups />
      case 'forums':
        return <ForumsPanel />
      default:
        return <Feed />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation activePanel={activePanel} setActivePanel={setActivePanel} />
      
      <div className="pt-16"> {/* Account for fixed navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-6">
            {/* Left Sidebar */}
            <div className="lg:col-span-3">
              <Sidebar activePanel={activePanel} setActivePanel={setActivePanel} />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-6">
              <main className="space-y-6">
                {renderMainContent()}
              </main>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-3">
              <RightSidebar />
            </div>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <CreatePost onClose={() => setShowCreatePost(false)} />
      )}
    </div>
  )
}