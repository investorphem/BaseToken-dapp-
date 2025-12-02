// app/config.tsx
'use client'

import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { baseSepolia } from '@reown/appkit/networks'

// ←←← PUT YOUR REAL REOWN PROJECT ID HERE ←←←
const projectId = 'YOUR_REAL_PROJECT_ID'

const metadata = {
  name: 'Base Token dApp',
  description: 'Send BTK tokens instantly on Base Chain',
  url: 'https://your-app.vercel.app',
  icons: ['https://avatars.githubusercontent.com/u/131020027']
}

// Declare window properties so TypeScript is happy
declare global {
  interface Window {
    wagmiConfig?: any
  }
}

// Run only in browser — completely eliminates porto/internal error
if (typeof window !== 'undefined' && !window.wagmiConfig) {
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

  // This is the exact config WagmiProvider expects
  window.wagmiConfig = adapter.wagmiConfig
}