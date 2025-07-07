'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  HeartIcon, 
  BookOpenIcon, 
  UsersIcon, 
  ChatBubbleLeftRightIcon,
  MapPinIcon,
  HandRaisedIcon,
  ShieldCheckIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'
import { useTheme } from '@/app/providers'

const features = [
  {
    name: 'Share Your Faith',
    description: 'Post inspirational content, Bible verses, and testimony through photos, reels, and videos.',
    icon: HeartIcon,
  },
  {
    name: 'Bible Reader',
    description: 'Read the Bible in multiple translations with offline access and verse sharing capabilities.',
    icon: BookOpenIcon,
  },
  {
    name: 'Christian Community',
    description: 'Join forums for prayer requests, apologetics, youth discussions, and faith testimonies.',
    icon: UsersIcon,
  },
  {
    name: 'Live Prayer Groups',
    description: 'Participate in live prayer sessions with voice and video calling features.',
    icon: HandRaisedIcon,
  },
  {
    name: 'Church Meetups',
    description: 'Coordinate Mass attendance and holy site visits with fellow believers.',
    icon: MapPinIcon,
  },
  {
    name: 'Private Messaging',
    description: 'Connect personally with other believers through secure direct messaging.',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'Safe Environment',
    description: 'Moderated content ensures a respectful and uplifting Christian environment.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Global Fellowship',
    description: 'Connect with Christians worldwide and explore different denominations.',
    icon: GlobeAltIcon,
  },
]

const testimonials = [
  {
    name: 'Maria Santos',
    role: 'Youth Ministry Leader',
    content: 'ChristConnect has transformed how our youth group stays connected. The prayer features are amazing!',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
  },
  {
    name: 'Father Michael',
    role: 'Catholic Priest',
    content: 'The Bible reader feature with Catholic translations is exactly what our parish needed.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
  },
  {
    name: 'Sarah Johnson',
    role: 'Missionary',
    content: 'Being able to coordinate prayer groups across continents has been a blessing for our mission work.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
  },
]

export default function LandingPage() {
  const { isDark } = useTheme()

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="container-responsive">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-spiritual-purple rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">†</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">ChristConnect</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/auth/signin"
                className="text-gray-600 dark:text-gray-300 hover:text-spiritual-purple transition-colors"
              >
                Sign In
              </Link>
              <Link 
                href="/auth/signup"
                className="btn-primary"
              >
                Join Community
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-spiritual-peace via-white to-spiritual-grace dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container-responsive py-24 lg:py-32">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
              >
                <span className="block">Connect with</span>
                <span className="block text-spiritual-purple">Fellow Believers</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
              >
                Share your faith journey, read the Bible together, join prayer groups, and build meaningful 
                relationships with Christians worldwide in a safe, moderated environment.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0"
              >
                <Link 
                  href="/auth/signup"
                  className="btn-primary text-lg px-8 py-3 divine-glow"
                >
                  Start Your Journey
                </Link>
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  Free to join • Safe environment • Catholic approved Bible translations
                </p>
              </motion.div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative mx-auto w-full rounded-lg shadow-holy lg:max-w-md"
              >
                <div className="relative block w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    className="w-full h-96 object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop"
                    alt="Christians praying together"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-spiritual-purple/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="font-semibold">Join millions of believers</p>
                    <p className="text-sm opacity-90">Growing together in faith</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="container-responsive">
          <div className="lg:text-center">
            <h2 className="text-base text-spiritual-purple font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need for Christian fellowship
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
              From Bible study to prayer groups, discover all the tools to grow and connect in your faith journey.
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card p-6 text-center hover:shadow-holy transition-all duration-300"
                >
                  <div className="mx-auto h-12 w-12 text-spiritual-purple">
                    <feature.icon className="h-12 w-12" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-spiritual-grace dark:bg-gray-900">
        <div className="container-responsive">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Loved by believers worldwide
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
              See how ChristConnect is blessing communities around the globe
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <p className="text-gray-600 dark:text-gray-300 italic">
                  "{testimonial.content}"
                </p>
                <div className="mt-4 flex items-center">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-spiritual-purple">
        <div className="container-responsive py-16">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Ready to join our community?
              </h2>
              <p className="mt-3 text-xl text-spiritual-heavenly">
                Start your faith journey with millions of believers today.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-spiritual-purple bg-white hover:bg-gray-50 transition-colors duration-200"
                >
                  Get started for free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="container-responsive py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-spiritual-purple rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">†</span>
              </div>
              <span className="text-xl font-bold text-white">ChristConnect</span>
            </div>
            <p className="text-gray-400">
              © 2024 ChristConnect. Building communities in faith.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}