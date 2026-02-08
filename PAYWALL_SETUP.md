# Paywall Setup Guide

This guide explains how to complete the paywall system setup for HeatCheck HQ.

## Environment Variables

The following environment variables need to be added to Vercel:

### Supabase
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Stripe
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID=price_1SydnaRILimAkcaK0MTocdOn
NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID=price_1SyduLRILimAkcaKiEWiD6Id
```

## Database Setup

1. **Run the database schema** in Supabase SQL Editor:
   - Navigate to `/supabase/schema.sql`
   - Copy the entire content
   - Go to your Supabase project → SQL Editor
   - Paste and execute the schema

   This will create:
   - `profiles` table (stores user subscription status)
   - `subscriptions` table (stores Stripe subscription details)
   - Row Level Security (RLS) policies
   - Automatic user profile creation trigger

## Stripe Setup

1. **Configure Stripe Webhook** (Production):
   - Go to Stripe Dashboard → Developers → Webhooks
   - Add endpoint: `https://your-domain.com/api/stripe/webhook`
   - Select events to listen for:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
   - Copy the webhook signing secret and add to `STRIPE_WEBHOOK_SECRET`

2. **Verify Price IDs**:
   - Monthly: `price_1SydnaRILimAkcaK0MTocdOn`
   - Annual: `price_1SyduLRILimAkcaKiEWiD6Id`
   - Update in Vercel environment variables if different

## Paywall Features

### Subscription Tiers

1. **No Account (Guest)**
   - Limited to 3 rows on: NRFI, First Basket, Weather
   - All other dashboards fully locked

2. **Free Account** ($0)
   - Access to 6 rows on: NRFI, First Basket, Weather
   - All other dashboards locked
   - No access to filters

3. **Pro** ($12/month or $100/year)
   - Unlimited access to all dashboards
   - Full filter and customization access
   - All features unlocked

### Partially Unlocked Dashboards (Row Limited)
- MLB NRFI (`/mlb/nrfi`)
- NBA First Basket (`/nba/first-basket`)
- MLB Weather (`/mlb/weather`)

### Fully Locked Dashboards (Pro Only)
- MLB Hitting Stats (`/mlb/hitting-stats`)
- MLB Pitching Stats (`/mlb/pitching-stats`)
- MLB Trends (`/mlb/trends`)
- NBA Head-to-Head (`/nba/head-to-head`)
- NBA Trends (`/nba/trends`)
- NFL Matchup (`/nfl/matchup`)
- NFL Redzone (`/nfl/redzone`)
- NFL Trends (`/nfl/trends`)

## User Flow

1. **Sign Up**: `/signup`
   - Creates free account
   - Auto-creates profile in Supabase

2. **Login**: `/login`
   - Email/password authentication

3. **Upgrade**: `/pricing`
   - Choose monthly or annual plan
   - Redirects to Stripe Checkout

4. **Manage Subscription**: `/account`
   - View subscription status
   - Access Stripe Customer Portal
   - Cancel or update subscription

## Testing

1. **Test Free Account**:
   - Sign up with a test email
   - Visit NRFI dashboard
   - Verify 6 rows visible
   - Verify filters are disabled

2. **Test Pro Subscription**:
   - Use Stripe test card: `4242 4242 4242 4242`
   - Subscribe to monthly plan
   - Verify all dashboards unlock
   - Verify filters work

3. **Test Guest Access**:
   - Open incognito window
   - Visit NRFI dashboard
   - Verify only 3 rows visible
   - Visit locked dashboard
   - Verify paywall banner shows

## Troubleshooting

### Users not getting profiles created
- Check Supabase → Database → Triggers
- Verify `on_auth_user_created` trigger exists
- Test by creating new user and checking `profiles` table

### Subscription status not updating
- Check Stripe webhook is configured correctly
- View webhook delivery attempts in Stripe Dashboard
- Check `/api/stripe/webhook` route logs
- Verify `STRIPE_WEBHOOK_SECRET` is correct

### Environment variables not loading
- Ensure all variables are added in Vercel project settings
- Redeploy after adding variables
- Check build logs for missing variable errors

## Next Steps

After setup is complete:
1. Test the entire flow (signup → subscribe → access)
2. Monitor Stripe webhook deliveries
3. Check Supabase logs for any auth issues
4. Consider adding email confirmation for signups (optional)
