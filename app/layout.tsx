'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { useEffect, useState } from 'react'
// The required 'networks' type is likely needed from the AppKit package
import { mainnet, base } from '@reown/appkit/networks' 

const inter = Inter({ subsets: ['latin'] })

// The AppKitProvider *does* require props for correct configuration with TypeScript
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
  // We use type assertion to access the global variable safely
  const config = (globalThis as any).wagmiConfig; 

  // --- FIX: Define Project ID and Networks ---
  // You must define your WalletConnect project ID as an environment variable
  // e.g., in a .env.local file: NEXT_PUBLIC_PROJECT_ID="YOUR_PROJECT_ID"
  if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
    throw new Error('NEXT_PUBLIC_PROJECT_ID is not defined')
  }
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
  
  // You might be able to get networks from the config object itself, but this is explicit
  const networks = [mainnet, base]; // Adjust this array based on the chains you support

  return (
    <html lang="en">
      <head>
        <title>Base Token dApp – Send BTK on Base Mainnet</title>
        <meta name="description" content="Connect any wallet & send BTK tokens instantly on Base Chain" />
      </head>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={config}>
            {/* FIX: Pass the required props to AppKitProvider */}
            <AppKitProvider projectId={projectId} networks={networks}>
              {children}
            </AppKitProvider>
          </WagmiProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
