'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

// The AppKitProvider component itself
import { AppKitProvider } from '@reown/appkit/react'
// Assuming these are the correct imports for your chain definitions from the package
import { mainnet, base } from '@reown/appkit/networks' 

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

  const config = (globalThis as any).wagmiConfig; 

  if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
    throw new Error('NEXT_PUBLIC_PROJECT_ID is not defined')
  }
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
  
  // The original array definition
  const networks = [mainnet, base];

  return (
    <html lang="en">
      <head>
        <title>Base Token dApp – Send BTK on Base Mainnet</title>
        <meta name="description" content="Connect any wallet & send BTK tokens instantly on Base Chain" />
      </head>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={config}>
            {/* FIX: Use an inline type assertion when passing the prop */}
            <AppKitProvider 
              projectId={projectId} 
              networks={networks as any} // Assert the networks array type here
            >
              {children}
            </AppKitProvider>
          </WagmiProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
