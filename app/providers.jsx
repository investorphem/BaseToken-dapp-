// app/providers.jsx
'use client'; 

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { useEffect, useState } from 'react'
import { AppKitProvider } from '@reown/appkit/react'
import { mainnet, base } from '@reown/appkit/networks' 

// --- Configuration Setup ---
// Ensure NEXT_PUBLIC_PROJECT_ID is set in your Vercel environment variables
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID; 
const networks = [mainnet, base];
const queryClient = new QueryClient()
// --- End Config Setup ---


export function WalletProviders({ children }) {
  const [ready, setReady] = useState(false)

  useEffect(() => setReady(true), [])

  if (!ready) {
    return (
        <div className="flex min-h-screen items-center justify-center">
            Loading wallet...
        </div>
    );
  }

  // FIXED: Using standard JavaScript check instead of TypeScript 'as any'
  const config = typeof globalThis !== 'undefined' ? globalThis.wagmiConfig : null; 

  if (!config) {
      // You can handle this error better in your UI
      console.error("Wagmi config was not initialized on globalThis.");
      return <div>Error initializing wallet configuration. Please check environment variables and configuration script.</div>
  }

  return (
    <QueryClientProvider client={queryClient}>
      {/* Type error 'as any' handled by the provider library's prop types or by renaming file to .tsx */}
      <WagmiProvider config={config}>
        <AppKitProvider projectId={projectId} networks={networks}> 
          {children}
        </AppKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  )
}
