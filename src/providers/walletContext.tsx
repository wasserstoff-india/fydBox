"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  error: string | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if previously connected
    const savedAddress = localStorage.getItem("walletAddress");
    if (savedAddress) {
      setAddress(savedAddress);
    }

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          localStorage.setItem("walletAddress", accounts[0]);
        } else {
          disconnectWallet();
        }
      });

      window.ethereum.on("disconnect", () => {
        disconnectWallet();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", () => {});
        window.ethereum.removeListener("disconnect", () => {});
      }
    };
  }, []);

  const connectWallet = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      if (!window.ethereum) {
        throw new Error(
          "MetaMask is not installed. Please install MetaMask to continue."
        );
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);

      if (accounts.length > 0) {
        setAddress(accounts[0]);
        localStorage.setItem("walletAddress", accounts[0]);
      }
      router.push("/dashboard"); // Redirect to home page after connecting
      toast.success("Wallet connected successfully");
    } catch (err: any) {
      console.error("Error connecting wallet:", err);
      setError(err.message || "Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {

    setAddress(null);
    localStorage.removeItem("walletAddress");
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_revokePermissions",
          params: [
            {
              eth_accounts: {},
            },
          ],
        });
        if (!address) {
          toast.success("Wallet disconnected successfully");
        }
      } catch (err) {
        toast.error("Error revoking permissions");
      }
    

  };
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected: !!address,
        isConnecting,
        connectWallet,
        disconnectWallet,
        error,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}

// Add this to make TypeScript happy with the window.ethereum property
declare global {
  interface Window {
    ethereum?: any;
  }
}
