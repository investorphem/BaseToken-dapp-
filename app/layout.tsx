'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

// This component comes from Reown – it auto-reads everything from createAppKit()
import { AppKitProvider } from '@reown/appkit/react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  const queryClient = new QueryClient()

  useEffect(() => setReady(true), [])

  if (!ready) {
    return <html><body className={inter.className}>Loading wallet...</body></html>
  }

  // Reown already initialized the config in config.tsx → just grab it
  const config = (globalThis as any).wagmiConfig

  return (
    <html lang="en">
      <head>
        <title>Base Token dApp – Send BTK on Base Chain</title>
        <meta name="description" content="Connect any wallet & send BTK tokens instantly on Base L2" />
      </head>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={config}>
            <AppKitProvider>{children}</AppKitProvider>
          </WagmiProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}