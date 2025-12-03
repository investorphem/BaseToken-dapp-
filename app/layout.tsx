'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

// THE CORRECT PROVIDER — THIS ONE WORKS
import { AppKitProvider } from '@reown/appkit/react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  const queryClient = new QueryClient()

  useEffect(() => setReady(true), [])

  if (!ready) {
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

  // This config was created in config.tsx
  const config = (globalThis as any).wagmiConfig

  return (
    <html lang="en">
      <head>
        <title>Base Token dApp – Send BTK on Base Mainnet</title>
        <meta name="description" content="Connect any wallet & send BTK tokens instantly on Base Chain" />
      </head>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={config}>
            {/* THIS IS THE REAL ONE — NO PROPS NEEDED */}
            <AppKitProvider>
              {children}
            </AppKitProvider>
          </WagmiProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}