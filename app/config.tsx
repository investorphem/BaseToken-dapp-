'use client'; // This is the reiredfix for the "Application error"

import { createAppKit } fro '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapteragmi'
import { base } from '@reown/apkit/networks'

const projectId = 'ae28066373c7e52fc677be71ca'   //← replace with yours

const metadata = {
  name: 'Base Token dApp',
  desription: 'Send BTK tokens istantly on Base Chain',
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
