'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { AppKitProvider } from '@reown/appkit/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { useState, useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

// Dynamic import to avoid SSR issues with Reown/Wagmi
async function getConfig() {
  const { config } = await import('./config')
  return config
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)
  const [wagmiConfig, setWagmiConfig] = useState<any>(null)
  const [queryClient] = useState(() => new QueryClient())

  useEffect(() => {
    getConfig().then((cfg) => {
      setWagmiConfig(cfg)
      setMounted(true)
    })
  }, [])

  if (!mounted || !wagmiConfig) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <div className="flex min-h-screen items-center justify-center">
            Loading wallet...
          </div>
        </body>
      </html>
    )
  }

  return (
    <html lang="en">
      <head>
        <title>Base Token dApp – Send BTK on Base Chain</title>
        <meta name="description" content="Connect wallet & transfer BTK tokens instantly on Base L2 with Reown AppKit" />
      </head>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={wagmiConfig}>
            <AppKitProvider>
              {children}
            </AppKitProvider>
          </WagmiProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}