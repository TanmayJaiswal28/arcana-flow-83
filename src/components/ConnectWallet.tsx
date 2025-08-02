import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Wallet, ExternalLink } from "lucide-react"

interface ConnectWalletProps {
  className?: string
}

export function ConnectWallet({ className = "" }: ConnectWalletProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)

  // Mock wallet connection - in a real app, this would connect to MetaMask
  const connectWallet = async () => {
    setIsConnecting(true)
    
    // Simulate wallet connection delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock wallet address for demo
    const mockAddress = "0x742d35Cc8C17e57E0C6d5A8e5B9F95c34A9B2C1D"
    setWalletAddress(mockAddress)
    setIsConnected(true)
    setIsConnecting(false)
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setWalletAddress("")
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (isConnected) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/20 border border-accent/30">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
          <span className="text-sm font-mono text-accent">
            {formatAddress(walletAddress)}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={disconnectWallet}
          className="text-muted-foreground hover:text-destructive"
        >
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <Button
      onClick={connectWallet}
      disabled={isConnecting}
      variant="neon"
      className={`flex items-center gap-2 ${className}`}
    >
      <Wallet className="h-4 w-4" />
      {isConnecting ? "Connecting..." : "Connect Wallet"}
      {!isConnecting && <ExternalLink className="h-3 w-3 opacity-70" />}
    </Button>
  )
}