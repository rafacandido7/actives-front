'use client'

import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { ActivesProvider } from '@/contexts/ActivesContext'
import { DependenciesProvider } from '@/contexts/DependenciesContext'

import { Sidebar } from '@/components/Sidebar'

const queryClient = new QueryClient()

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ActivesProvider>
        <DependenciesProvider>
          <Sidebar>{children}</Sidebar>
        </DependenciesProvider>
      </ActivesProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
