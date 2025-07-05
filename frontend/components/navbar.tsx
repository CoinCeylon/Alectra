"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sun, Moon } from "lucide-react"

interface NavbarProps {
  isDarkMode: boolean
  setIsDarkMode: (value: boolean) => void
  isWalletConnected: boolean
  walletAddress: string
  connectWallet: () => void
  disconnectWallet: () => void
}

export function Navbar({
  isDarkMode,
  setIsDarkMode,
  isWalletConnected,
  walletAddress,
  connectWallet,
  disconnectWallet,
}: NavbarProps) {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-semibold text-gray-900 dark:text-white">Alectra</span>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)} className="w-10 h-10">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {/* Wallet Connection */}
            {isWalletConnected ? (
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="px-3 py-1">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </Badge>
                <Button variant="outline" onClick={disconnectWallet} size="sm">
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button onClick={connectWallet} className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
