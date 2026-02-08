import { redirect } from 'next/navigation'
import { getUser, getSubscriptionStatus, signOut } from '@/lib/auth/actions'
import { createClient } from '@/lib/supabase/server'
import { ManageSubscription } from '@/components/manage-subscription'

export default async function AccountPage() {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  const subscriptionStatus = await getSubscriptionStatus()
  const supabase = await createClient()

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Account Settings</h1>

        {/* User Info */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Profile</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-400">Email</label>
              <p className="text-white">{user.email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Account Status</label>
              <p className="text-white">
                {subscriptionStatus === 'pro' ? (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    Pro Member
                  </span>
                ) : subscriptionStatus === 'free' ? (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-gray-500/20 text-gray-400 rounded-full">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    Free Account
                  </span>
                ) : (
                  <span className="text-gray-400">Guest</span>
                )}
              </p>
            </div>
          </div>

          <form action={signOut} className="mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </form>
        </div>

        {/* Subscription Info */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Subscription</h2>

          {subscriptionStatus === 'pro' && subscription ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Plan</label>
                <p className="text-white capitalize">{subscription.plan_type} Pro</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Status</label>
                <p className="text-white capitalize">{subscription.status}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Current Period</label>
                <p className="text-white">
                  {new Date(subscription.current_period_start).toLocaleDateString()} -{' '}
                  {new Date(subscription.current_period_end).toLocaleDateString()}
                </p>
              </div>
              {subscription.cancel_at_period_end && (
                <div className="bg-yellow-500/10 border border-yellow-500/50 text-yellow-500 px-4 py-3 rounded">
                  Your subscription will cancel at the end of the current period.
                </div>
              )}

              <ManageSubscription
                stripeCustomerId={subscription.stripe_customer_id}
                subscriptionId={subscription.stripe_subscription_id}
              />
            </div>
          ) : (
            <div>
              <p className="text-gray-400 mb-4">
                You are currently on the free plan. Upgrade to Pro for unlimited access to all dashboards and premium features.
              </p>
              <a
                href="/pricing"
                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Upgrade to Pro
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
