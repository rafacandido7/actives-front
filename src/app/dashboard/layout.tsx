'use client'

import React from 'react'

import { ActivesProvider } from '@/contexts/ActivesContext'
import { DependenciesProvider } from '@/contexts/DependenciesContext'

import { Sidebar } from '@/components/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ActivesProvider>
      <DependenciesProvider>
        <Sidebar>{children}</Sidebar>
      </DependenciesProvider>
    </ActivesProvider>
  )
}
