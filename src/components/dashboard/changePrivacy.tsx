"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import { contractABI } from "@/abi";
import { toast } from "sonner";

const PRIVACY_OPTIONS = [
  {
    id: "public",
    name: "Public",
    value: false,
  },
  {
    id: "private",
    name: "Private",
    value: true,
  },
];

const contractAddress = String(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

export default function ChangePrivacy({ suggestion }: { suggestion: string }) {
  const [loading, setLoading] = useState(false);

  const changePrivacy = async (isPrivate: boolean) => {
    try {
      if (!window.ethereum) {
        toast.error("No wallet found");
        return;
      }

      setLoading(true);

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, contractABI, signer);

      const tx = await contract.setLinkPrivacy(suggestion, isPrivate);
      await tx.wait();

      toast.success("Privacy changed successfully!");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message || "Error changing privacy");
      } else {
        toast.error("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"reverse"}
            className="flex items-center gap-2 justify-center outline-none bg-main/50"
            disabled={loading}
          >
            {loading ? "Updating..." : "Change Privacy"}
            <ChevronDown className="w-4 h-auto" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[156px] bg-main/50">
          {PRIVACY_OPTIONS.map((privacy) => (
            <DropdownMenuItem
              key={privacy.id}
              onClick={() => changePrivacy(privacy.value)}
              className="bg-transparent"
            >
              <span className="capitalize">{privacy.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
