import React from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import LandingPage from '@/components/LandingPage'
import Dashboard from '@/components/Dashboard'
import { authOptions } from '@/lib/auth'

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  if (session) {
    return <Dashboard />
  }

  return <LandingPage />
}