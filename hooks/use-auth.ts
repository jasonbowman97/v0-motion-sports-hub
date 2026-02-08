"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

export type UserTier = "anonymous" | "free" | "pro"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [tier, setTier] = useState<UserTier>("anonymous")

  useEffect(() => {
    const supabase = createClient()

    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        // Check user metadata for pro subscription
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
