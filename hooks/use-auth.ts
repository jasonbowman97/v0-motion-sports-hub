"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

export type UserTier = "anonymous" | "free" | "pro"

// Set to true to bypass paywall during development
const DEV_BYPASS = true

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [tier, setTier] = useState<UserTier>(DEV_BYPASS ? "pro" : "anonymous")

  useEffect(() => {
    const supabase = createClient()

    async function getUser() {
      if (DEV_BYPASS) {
        setTier("pro")
        setLoading(false)
        return
      }
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        const isPro = user.user_metadata?.is_pro === true
        setTier(isPro ? "pro" : "free")
      } else {
        setTier("anonymous")
      }
      setLoading(false)
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) {
        const isPro = u.user_metadata?.is_pro === true
        setTier(isPro ? "pro" : "free")
      } else {
        setTier("anonymous")
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return { user, loading, tier }
}
