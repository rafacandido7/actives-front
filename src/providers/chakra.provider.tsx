'use client'

import { ChakraProvider } from '@chakra-ui/react'

import { customTheme } from '@/utils/customTheme'

export function ChakraProviders({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
}
