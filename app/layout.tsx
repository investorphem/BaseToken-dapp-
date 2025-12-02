'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { AppKitProvider } from '@reown/appkit/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  const queryClient = new QueryClient(

  useEffect(() => {
    setReady(true)
  }, [])

  if (!ready) {
    return (
      <html lang="en">
        <body className={inter.className}>Loading...</body>
      </html>
    )
  }

  const config = (globalThis as any).wagmiConfig

  return (
    <html lang="en">
      <head>
        <title>Base Token dApp – BTK on Base</title>
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