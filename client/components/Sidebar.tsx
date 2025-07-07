'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import {
  HomeIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  HandRaisedIcon,
  MapPinIcon,
  UserGroupIcon,
  UserIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'
import {
  HomeIcon as HomeIconSolid,
  BookOpenIcon as BookOpenIconSolid,
  ChatBubbleLeftRightIcon as ChatBubbleLeftRightIconSolid,
  HandRaisedIcon as HandRaisedIconSolid,
  MapPinIcon as MapPinIconSolid,
  UserGroupIcon as UserGroupIconSolid,
} from '@heroicons/react/24/solid'

type ActivePanel = 'feed' | 'bible' | 'messages' | 'prayer' | 'church' | 'forums'

interface SidebarProps {
  activePanel: ActivePanel
  setActivePanel: (panel: ActivePanel) => void
}

const navigation = [
  { name: 'Home', icon: HomeIcon, activeIcon: HomeIconSolid, panel: 'feed' as ActivePanel },
  { name: 'Bible Reader', icon: BookOpenIcon, activeIcon: BookOpenIconSolid, panel: 'bible' as ActivePanel },
  { name: 'Messages', icon: ChatBubbleLeftRightIcon, activeIcon: ChatBubbleLeftRightIconSolid, panel: 'messages' as ActivePanel },
  { name: 'Prayer Groups', icon: HandRaisedIcon, activeIcon: HandRaisedIconSolid, panel: 'prayer' as ActivePanel },
  { name: 'Church Meetups', icon: MapPinIcon, activeIcon: MapPinIconSolid, panel: 'church' as ActivePanel },
  { name: 'Forums', icon: UserGroupIcon, activeIcon: UserGroupIconSolid, panel: 'forums' as ActivePanel },
]

export default function Sidebar({ activePanel, setActivePanel }: SidebarProps) {
  const { data: session } = useSession()

  return (
    <div className="space-y-4">
      {/* User Profile Card */}
      <div className="card p-6">
        <div className="flex items-center space-x-3">
          <img
            src={session?.user?.image || '/default-avatar.png'}
            alt={session?.user?.name || 'User'}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {session?.user?.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Follower of Christ
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">127</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Posts</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">1.2k</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Following</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">892</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Followers</div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="card p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = activePanel === item.panel
            const Icon = isActive ? item.activeIcon : item.icon

            return (
              <li key={item.name}>
                <button
                  onClick={() => setActivePanel(item.panel)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-spiritual-purple text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Quick Actions */}
      <div className="card p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <button className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            Create Prayer Request
          </button>
          <button className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            Join Live Prayer
          </button>
          <button className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            Share Bible Verse
          </button>
          <button className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            Find Local Church
          </button>
        </div>
      </div>

      {/* Bible Verse of the Day */}
      <div className="card p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Verse of the Day</h3>
        <blockquote className="bible-verse text-sm">
          "For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, to give you hope and a future."
        </blockquote>
        <cite className="bible-reference">
          Jeremiah 29:11 (NIV)
        </cite>
      </div>
    </div>
  )
}