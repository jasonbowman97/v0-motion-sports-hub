'use client'

import Link from 'next/link'
import { Lock } from 'lucide-react'

interface PaywallBannerProps {
  userStatus: 'none' | 'free' | 'pro'
  dashboardName: string
}

export function PaywallBanner({ userStatus, dashboardName }: PaywallBannerProps) {
  if (userStatus === 'pro') {
    return null
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700 p-12 text-center backdrop-blur-sm">
        <div className="mb-6 flex justify-center">
          <div className="p-4 bg-blue-500/20 rounded-full">
            <Lock className="w-12 h-12 text-blue-400" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-4">
          {dashboardName} Dashboard
        </h2>

        <p className="text-gray-300 text-lg mb-8">
          This dashboard is exclusively available to Pro subscribers.
        </p>

        <div className="space-y-4 mb-8 text-left max-w-md mx-auto">
          <div className="flex items-start gap-3">
            <div className="mt-1 p-1 bg-green-500/20 rounded">
              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-300">Unlimited access to all dashboards and data</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1 p-1 bg-green-500/20 rounded">
              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-300">Advanced filtering and customization tools</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1 p-1 bg-green-500/20 rounded">
              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-300">Real-time updates and premium analytics</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/pricing"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Upgrade to Pro
          </Link>
          {userStatus === 'none' && (
            <Link
              href="/signup"
              className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
            >
              Sign up for Free
            </Link>
          )}
        </div>

        <p className="text-sm text-gray-500 mt-6">
          Starting at $12/month or $100/year
        </p>
      </div>
    </div>
  )
}
