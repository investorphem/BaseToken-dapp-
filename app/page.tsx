'use client'
import { useState } from 'react'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { useAppKit } from '@reown/appkit/react'
import { parseEther } from 'viem'
import { baseSepolia } from '@reown/appkit/networks'  // Or base for mainnet

const TOKEN_CONTRACT_ADDRESS = 'YOUR_DEPLOYED_TOKEN_ADDRESS'  // e.g., '0x123...'

const ABI = [
  // Minimal ABI for balanceOf and transfer
  {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "to", "type": "address"}, {"internalType": "uint256", "name": "amount", "type": "uint256"}],
    "name": "transfer",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const

export default function Home() {
  const { open } = useAppKit()
  const { address, isConnected } = useAccount()
  const [toAddress, setToAddress] = useState('')
  const [amount, setAmount] = useState('')

  const { data: balance } = useReadContract({
    address: TOKEN_CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    chainId: baseSepolia.id  // Or base.id for mainnet
  })

  const { writeContractAsync } = useWriteContract()

  const handleTransfer = async () => {
    if (!toAddress || !amount) return
    try {
      await writeContractAsync({
        address: TOKEN_CONTRACT_ADDRESS,
        abi: ABI,
        functionName: 'transfer',
        args: [toAddress as `0x${string}`, BigInt(amount + '000000000000000000')],  // Assuming 18 decimals
        chainId: baseSepolia.id
      })
      alert('Transfer successful!')
      setToAddress('')
      setAmount('')
    } catch (error) {
      console.error(error)
      alert('Transfer failed!')
    }
  }

  const formattedBalance = balance ? (Number(balance) / 1e18).toFixed(2) : '0'

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Base Token dApp</h1>
      
      {!isConnected ? (
        <button
          onClick={() => open()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="text-center space-y-4">
          <p>Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</p>
          <p>Balance: {formattedBalance} BTK</p>
          
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Recipient Address"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              className="border p-2 rounded w-64"
            />
            <input
              type="number"
              placeholder="Amount (BTK)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border p-2 rounded w-64"
            />
            <button
              onClick={handleTransfer}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Transfer
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
