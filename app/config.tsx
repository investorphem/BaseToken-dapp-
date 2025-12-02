import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { baseSepolia } from '@reown/appkit/networks'
import { createConfig, http } from 'wagmi'

const queryClient = new QueryClient()

const projectId = 'YOUR_PROJECT_ID' // From Reown Cloud

const networks = [baseSepolia] // Switch to [base] for mainnet

const metadata = {
  name: 'Base Token dApp',
  description: 'Transfer BTK tokens on Base',
  url: 'https://your-app-url.com', // Update after deploy
  icons: ['https://avatars.githubusercontent.com/u/131020027'] // Reown icon or your own
}

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true // Keep true; dynamic import handles the rest
})

const config = createConfig(wagmiAdapter.wagmiConfig)

const modal = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  metadata,
  projectId,
  features: { analytics: true }
})

export { config, QueryClient, QueryClientProvider, WagmiProvider, modal }