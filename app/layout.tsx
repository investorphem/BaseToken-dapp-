'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppKitProvider } from '@reown/appkit/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { useState, useEffect } from 'react'

// Dynamic import for config to avoid SSR issues with Reown/Wagmi
async function getConfig() {
  const { config } = await import('./config')
  return config
}

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Base Token dApp',
  description: 'Transfer tokens on Base',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)
  const [config, setConfig] = useState<ReturnType<typeof getConfig> | null>(null)
  const [queryClient] = useState(() => new QueryClient())

  useEffect(() => {
    async function loadConfig() {
      const cfg = await getConfig()
      setConfig(cfg)
      setMounted(true)
    }
    loadConfig()
  }, [])

  if (!mounted || !config) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <div>Loading...</div>
        </body>
      </html>
    )
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={config}>
            <AppKitProvider>
              {children}
            </AppKitProvider>
          </WagmiProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}