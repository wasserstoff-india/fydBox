"use client";

import { Ellipsis, Trash } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import { contractABI } from "@/abi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface MoreOptionsProps {
  suggestion: string;
}

const contractAddress = String(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

export default function MoreOptions({ suggestion }: MoreOptionsProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const deleteLink = async () => {
    try {
      if (!window.ethereum) {
        console.error("No wallet found");
        return;
      }

      setLoading(true);

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, contractABI, signer);

      const tx = await contract.deleteLink(suggestion);
      await tx.wait();

      toast.success("Link deleted successfully!");
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message || "Error Deleting Suggestion");
      } else {
        toast.error("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="bg-main/50">
            <Button variant={"reverse"}>
              <span className="sr-only">More Options</span>
              <Ellipsis className="h-auto w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-main/50">
            <DropdownMenuItem className="bg-transparent">
              <DialogTrigger asChild>
                <button className="flex items-center justify-start gap-2 text-sm">
                  <Trash className="h-auto w-4" />
                  Delete Feedback
                </button>
              </DialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              feedback and remove the data from this account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="neutral">
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant={"default"}
              onClick={deleteLink}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete Feedback"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
