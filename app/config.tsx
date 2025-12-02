// app/config.tsx
import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { baseSepolia } from '@reown/appkit/networks'
import { createConfig, http } from 'wagmi'

// ←←← YOUR REOWN PROJECT ID HERE ←←←
const projectId = 'YOUR_PROJECT_ID_REPLACE_ME'

const metadata = {
  name: 'Base Token dApp',
  description: 'Send BTK tokens on Base',
  url: 'https://your-vercel-url.vercel.app', // will be replaced automatically
  icons: ['https://avatars.githubusercontent.com/u/131020027']
}

// This runs only on client – fixes porto/internal error completely
if (typeof window !== 'undefined') {
  const adapter = new WagmiAdapter({
    projectId,
    networks: [baseSepolia],
    ssr: false
  })

  const config = createConfig(adapter.wagmiConfig)

  createAppKit({
    adapters: [adapter],
    projectId,
    networks: [baseSepolia],
    metadata,
    features: { analytics: true }
  })

  // Export for WagmiProvider only
  ;(globalThis as any).wagmiConfig = config
}