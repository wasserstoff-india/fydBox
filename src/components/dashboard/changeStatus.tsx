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

const STATUS_OPTIONS = [
  {
    id: "active",
    name: "Active",
    value: true,
  },
  {
    id: "inactive",
    name: "Inactive",
    value: false,
  },
];

const contractAddress = String(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

interface ChangeStatusProps {
  suggestion: string;
}

export default function ChangeStatus({ suggestion }: ChangeStatusProps) {
  const [loading, setLoading] = useState(false);

  const changeStatus = async (isActive: boolean) => {
    try {
      if (!window.ethereum) {
        toast.error("No wallet found");
        return;
      }

      setLoading(true);

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, contractABI, signer);

      const tx = await contract.setLinkStatus(suggestion, isActive);
      await tx.wait();

      toast.success("Status changed successfully!");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message || "Error changing status");
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
            {loading ? "Updating..." : "Change Status"}
            <ChevronDown className="w-4 h-auto" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[152px] bg-main/50">
          {STATUS_OPTIONS.map((status) => (
            <DropdownMenuItem
              key={status.id}
              onClick={() => changeStatus(status.value)}
              className="bg-transparent"
            >
              <span className="capitalize">{status.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
