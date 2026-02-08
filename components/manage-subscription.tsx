'use client'

import { useState } from 'react'

interface ManageSubscriptionProps {
  stripeCustomerId: string
  subscriptionId: string
}

export function ManageSubscription({
  stripeCustomerId,
}: ManageSubscriptionProps) {
  const [loading, setLoading] = useState(false)

  async function handleManageSubscription() {
    setLoading(true)
    try {
      const response = await fetch('/api/stripe/create-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: stripeCustomerId }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Failed to open billing portal')
      }
    } catch (error) {
      console.error('Portal error:', error)
      alert('Failed to open billing portal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleManageSubscription}
      disabled={loading}
      className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
    >
      {loading ? 'Loading...' : 'Manage Subscription'}
    </button>
  )
}
