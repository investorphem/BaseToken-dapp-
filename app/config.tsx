// app/config.tsx
'use client'

import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { baseSepolia } from '@reown/appkit/networks'

// ←←← REPLACE WITH YOUR REAL REOWN PROJECT ID ←←←
const projectId = 'YOUR_PROJECT_ID_HERE'

const metadata = {
  name: 'Base Token dApp',
  description: 'Send BTK tokens instantly on Base Chain',
  url: 'https://your-app.vercel.app',
  icons: ['https://avatars.githubusercontent.com/u/131020027']
}

// This runs only in the browser → kills porto/internal + fixes types
if (typeof window !== 'undefined' && !window.wagmiAdapter) {
  const adapter = new WagmiAdapter({
    projectId,
    networks: [baseSepolia],
    ssr: false
  })

  createAppKit({
    adapters: [adapter],
    projectId,
    networks: [baseSepolia],
    metadata,
    features: { analytics: true }
  })

  // Export the correct wagmi config directly from adapter
  window.wagmiConfig = adapter.wagmiConfig
  window.wagmiAdapter = adapter
}