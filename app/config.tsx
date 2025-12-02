import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { baseSepolia, base } from '@reown/appkit/networks'  // Use base for mainnet, baseSepolia for testnet
import { createConfig, http } from 'wagmi'
import { QueryClientReact } from '@reown/appkit'  // For AppKit query integration

const queryClient = new QueryClient()
const projectId = 'YOUR_PROJECT_ID'  // From Reown Cloud

const networks = [baseSepolia]  // Switch to [base] for mainnet

const metadata = {
  name: 'Base Token dApp',
  description: 'Transfer BTK tokens on Base',
  url: 'https://your-app-url.com',  // Your deployed URL
  icons: ['https://your-icon-url.com/icon.png']  // Optional logo
}

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
})

const config = createConfig(wagmiAdapter.wagmiConfig)
const modal = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  metadata,
  projectId,
  features: { analytics: true }
})

export { config, QueryClient, QueryClientProvider, WagmiProvider, modal, QueryClientReact }
