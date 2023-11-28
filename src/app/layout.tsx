import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ChakraProviders } from '@/providers/chakra.provider'

import '../styles/globals.css'
import { AuthProvider } from '@/context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Genactive',
  description: 'Your service management for IT actives',
  icons: {
    icon: '/assets/logo.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ChakraProviders>{children}</ChakraProviders>
        </AuthProvider>
      </body>
    </html>
  )
}
