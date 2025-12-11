'use client'; // This is the required f
import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { base } from '@reown/appkit/networks'

const projectId = 'ae28066373c7ee52fc6eb7457bbe71ca'   // ← replace with yours

const metadata = {
  name: 'Base Token dApp',
  description: 'Send BTK tokens instantly on Base Chain',
  url: 'https://your-app.vercel.app',
  icons: ['avatars.githubusercontent.com']
}

declare global {
  interface Window {
    wagmiConfig?: any
  }
}

if (typeof window !== 'undefined' && !window.wagmiConfig) {
  const adapter = new WagmiAdapter({
    projectId,
    networks: [base],
    ssr: false
  })

  createAppKit({
    adapters: [adapter],
    projectId,
    networks: [base],
    metadata,
    features: { analytics: true }
  })

  window.wagmiConfig = adapter.wagmiConfig
}