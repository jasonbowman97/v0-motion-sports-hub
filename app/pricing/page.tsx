'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { useRouter } from 'next/navigation'

const MONTHLY_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID!
const ANNUAL_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID!

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null)
  const router = useRouter()

  async function handleCheckout(priceId: string) {
    setLoading(priceId)

    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      })

      const data = await response.json()

      if (data.error) {
        if (response.status === 401) {
          router.push('/login?redirect=pricing')
        } else {
          alert('Failed to start checkout')
        }
      } else if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to start checkout')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-400">
            Unlock premium sports analytics and predictions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Tier */}
          <div className="bg-gray-800/50 rounded-2xl border border-gray-700 p-8">
            <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$0</span>
              <span className="text-gray-400">/forever</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <span className="text-gray-300">Access to 6 rows on select dashboards</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <span className="text-gray-300">NRFI, First Basket, Weather dashboards</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <span className="text-gray-300">Basic analytics</span>
              </li>
            </ul>
            <button
              onClick={() => router.push('/signup')}
              className="w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
            >
              Sign Up Free
            </button>
          </div>

          {/* Monthly Pro */}
          <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-2xl border-2 border-blue-500 p-8 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Popular
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Pro Monthly</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$12</span>
              <span className="text-gray-400">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <span className="text-gray-300">Unlimited access to all dashboards</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <span className="text-gray-300">Advanced filtering and customization</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <span className="text-gray-300">Real-time updates</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <span className="text-gray-300">Premium analytics</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <span className="text-gray-300">Cancel anytime</span>
              </li>
            </ul>
            <button
              onClick={() => handleCheckout(MONTHLY_PRICE_ID)}
              disabled={loading === MONTHLY_PRICE_ID}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              {loading === MONTHLY_PRICE_ID ? 'Loading...' : 'Subscribe Monthly'}
            </button>
          </div>

          {/* Annual Pro */}
          <div className="bg-gray-800/50 rounded-2xl border border-gray-700 p-8">
            <h3 className="text-2xl font-bold text-white mb-2">Pro Annual</h3>
            <div className="mb-2">
              <span className="text-4xl font-bold text-white">$100</span>
              <span className="text-gray-400">/year</span>
            </div>
            <p className="text-green-400 text-sm mb-6">Save $44/year</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <span className="text-gray-300">Everything in Monthly Pro</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <span className="text-gray-300">2 months free</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <span className="text-gray-300">Best value</span>
              </li>
            </ul>
            <button
              onClick={() => handleCheckout(ANNUAL_PRICE_ID)}
              disabled={loading === ANNUAL_PRICE_ID}
              className="w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              {loading === ANNUAL_PRICE_ID ? 'Loading...' : 'Subscribe Annually'}
            </button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400">
            All plans include access to our comprehensive sports analytics platform
          </p>
        </div>
      </div>
    </div>
  )
}
