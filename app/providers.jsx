// app/AppKitProviders.jsx
'use client'; // This is essential for all wallet logic

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { useEffect, useState } from 'react'
import { AppKitProvider } from '@reown/appkit/react'
import { mainnet, base } from '@reown/appkit/networks' 

// --- Configuration Setup (Moved from your original config file) ---
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID; // Use env variable directly here
const networks = [mainnet, base];
// Note: You likely need the createConfig logic here as well, 
// but using the components directly as you had in layout is okay if configured right

// Create a client for react-query
const queryClient = new QueryClient()
// --- End Config Setup ---


export function WalletProviders({ children }) {
  const [ready, setReady] = useState(false)

  // This useEffect ensures the component mounts only in the browser
  useEffect(() => setReady(true), [])

  if (!ready) {
    // This is the minimum required loading state shown only briefly in the browser
    return (
        <div className="flex min-h-screen items-center justify-center">
            Loading wallet...
        </div>
    );
  }

  // The 'config' object must be available here. 
  // You might need to use `createConfig` from `wagmi` based on your libraries documentation.
  // Assuming the previous global hook logic works for now, we leave this placeholder:
  const config = (globalThis as any).wagmiConfig; 

  if (!config) {
      // Handle the error where config wasn't initialized by the global script
      return <div>Error initializing wallet configuration.</div>
  }

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        {/* Pass the props correctly */}
        <AppKitProvider projectId={projectId} networks={networks as any}> 
          {children}
        </AppKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  )
}
