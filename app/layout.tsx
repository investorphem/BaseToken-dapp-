// app/layout.js (NO 'use client' neede

import { Inter } from 'next/font/google'
import './globals.css'
import { WalletProviders } from './providers' // Import the new component

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // No useState, useEffect, or globalThis access here! This is purely server code.

  return (
    <html lang="en">
      <head>
        <title>Base Token dApp – Send BTK on Base Mainnet</title>
        <meta name="description" content="Connect any wallet & send BTK tokens instantly on Base Chain" />
      </head>
      <body className={inter.className}>
        {/* Wrap the children with the Client-Side Providers */}
        <WalletProviders>
          {children}
        </WalletProviders>
      </body>
    </html>
  )
}
