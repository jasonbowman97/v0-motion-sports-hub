"use client"

import { FullPageLock } from "./full-page-lock"

interface FullPageLockWrapperProps {
  dashboardName: string
  children: React.ReactNode
}

export function FullPageLockWrapper({ dashboardName, children }: FullPageLockWrapperProps) {
  return <FullPageLock dashboardName={dashboardName}>{children}</FullPageLock>
}
