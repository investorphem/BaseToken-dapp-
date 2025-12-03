'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

// This is the correct component – no props needed when createAppKit() was already called
import { AppKit } from '@reown/appkit/react'

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

  const wagmiConfig = (globalThis as any).wagmiConfig

  return (
    <html lang="en">
      <head>
        <title>Base Token dApp – Send BTK on Base Chain</title>
        <meta name="description" content="Connect any wallet & send BTK tokens instantly on Base L2 with Reown AppKit" />
      </head>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={wagmiConfig}>
            {/* This is the correct provider component – no props required */}
            <AppKit>
              {children}
            </AppKit>
          </WagmiProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}