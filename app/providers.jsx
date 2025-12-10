// app/providers.jsx
'use client'; 

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, createConfig, http } from 'wagmi' // Import createConfig and http
import { useEffect, useState } from 'react'
import { mainnet, base } from 'wagmi/chains' // Import chains from wagmi/chains if available

// Your AppKit library imports (adjust paths ne
import { AppKitProvider } from '@reown/appkit/react'

// 1. Define Project ID and Chains
// Ensure NEXT_PUBLIC_PROJECT_ID is set in you Vercel environment variables
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID; 

if (!projectId) {
    throw new Error('NEXT_PUBLIC_PROJECT_ID is not defined');
}

const chains = [mainnet, base];
const queryClient = new QueryClient();


// 2. Create the wagmi config outside the component
// This uses the official wagmi way to create a configuration object
const wagmiConfig = createConfig({
  chains: chains,
  transports: {
    // You need to define how to talk to the blockchain
    [mainnet.id]: http(),
    [base.id]: http(),
  },
  projectId, // Use your project ID here
});


export function WalletProviders({ children }) {
  const [ready, setReady] = useState(false)

  // This ensures the component mounts only in the browser
  useEffect(() => setReady(true), [])

  if (!ready) {
    return (
        <div className="flex min-h-screen items-center justify-center">
            Loading application...
        </div>
    );
  }

  // Use the pre-created wagmiConfig object
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        {/* Pass the props to the AppKitProvider */}
        <AppKitProvider projectId={projectId} networks={chains}> 
          {children}
        </AppKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  )
}
