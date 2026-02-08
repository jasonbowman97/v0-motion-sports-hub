'use client'

import Link from 'next/link'
import { Lock } from 'lucide-react'

interface RowLimiterProps {
  userStatus: 'none' | 'free' | 'pro'
  children: React.ReactNode
  totalRows: number
}

export function RowLimiter({ userStatus, children, totalRows }: RowLimiterProps) {
  const rowLimit = userStatus === 'none' ? 3 : userStatus === 'free' ? 6 : Infinity
  const isLimited = totalRows > rowLimit && userStatus !== 'pro'
  const hiddenRows = isLimited ? totalRows - rowLimit : 0

  return (
    <div className="space-y-6">
      {children}

      {isLimited && (
        <div className="relative">
          <div className="absolute inset-x-0 -top-24 h-24 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none z-10" />

          <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 rounded-xl border border-gray-700 p-8 backdrop-blur-sm">
            <div className="flex items-start gap-6">
              <div className="p-3 bg-blue-500/20 rounded-lg shrink-0">
                <Lock className="w-8 h-8 text-blue-400" />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  {hiddenRows} more row{hiddenRows !== 1 ? 's' : ''} available
                </h3>

                {userStatus === 'none' ? (
                  <div>
                    <p className="text-gray-300 mb-4">
                      Sign up for a free account to view 6 rows instead of 3.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href="/signup"
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors inline-block"
                      >
                        Sign up for Free
                      </Link>
                      <Link
                        href="/pricing"
                        className="px-6 py-2.5 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors inline-block"
                      >
                        View Pro Plans
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-300 mb-4">
                      Upgrade to Pro to unlock all {totalRows} rows plus advanced filtering and customization.
                    </p>
                    <Link
                      href="/pricing"
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors inline-block"
                    >
                      Upgrade to Pro
                    </Link>
                  </div>
                )}

                <p className="text-sm text-gray-500 mt-4">
                  Pro plans start at $12/month or $100/year
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function limitRows<T>(data: T[], userStatus: 'none' | 'free' | 'pro'): T[] {
  const rowLimit = userStatus === 'none' ? 3 : userStatus === 'free' ? 6 : Infinity
  return data.slice(0, rowLimit)
}
