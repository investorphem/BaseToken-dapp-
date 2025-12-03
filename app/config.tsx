'use client'

import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { baseSepolia } from '@reown/appkit/networks'

const projectId = 'YOUR_REAL_PROJECT_ID'   // ← replace with yours

const metadata = {
  name: 'Base Token dApp',
  description: 'Send BTK tokens instantly on Base Chain',
  url: 'https://your-app.vercel.app',
  icons: ['https://avatars.githubusercontent.com/u/131020027']
}

declare global {
  interface Window {
    wagmiConfig?: any
  }
}

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

  window.wagmiConfig = adapter.wagmiConfig
}