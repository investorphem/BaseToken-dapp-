'use client'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { config, WagmiProvider, QueryClient, QueryClientProvider } from './config'
import { AppKitProvider } from '@reown/appkit/react'
import { QueryClientReact } from './config'  // Assuming you export it

const inter = Inter({ subsets: ['latin'] })
const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={config}>
            <QueryClientReact client={queryClient}>
              <AppKitProvider>
                {children}
              </AppKitProvider>
            </QueryClientReact>
          </WagmiProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
