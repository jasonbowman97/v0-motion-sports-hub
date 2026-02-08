"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already accepted/declined cookies
    const cookieConsent = localStorage.getItem("cookie-consent")
    if (!cookieConsent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowBanner(false)
  }

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
      <div className="mx-auto max-w-7xl">
        <div className="relative rounded-lg border border-border bg-card/95 backdrop-blur-sm shadow-lg p-4 md:p-6">
          <button
            onClick={declineCookies}
            className="absolute top-2 right-2 p-1 rounded-md hover:bg-secondary transition-colors"
            aria-label="Close cookie banner"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 pr-8">
            <div className="flex-1 space-y-2">
              <h3 className="text-sm font-semibold text-foreground">🍪 We use cookies</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We use cookies to enhance your browsing experience, analyze site traffic, and provide personalized content.
                By clicking "Accept", you consent to our use of cookies. Learn more in our{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={declineCookies}
                className="flex-1 md:flex-none text-xs"
              >
                Decline
              </Button>
              <Button
                size="sm"
                onClick={acceptCookies}
                className="flex-1 md:flex-none bg-primary text-primary-foreground hover:bg-primary/90 text-xs"
              >
                Accept
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
