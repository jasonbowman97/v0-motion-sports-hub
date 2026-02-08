import React from "react"
import type { Metadata, Viewport } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'HeatCheck HQ - Sports Analytics Platform',
  description: 'Advanced analytics for MLB, NBA, and NFL. Turn raw data into actionable insights with matchup intelligence, heatmap visualizations, and granular filtering.',
}

export const viewport: Viewport = {
  themeColor: '#0d1117',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
