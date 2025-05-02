"use client";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { PlusCircle } from "lucide-react";
import { BrowserProvider, Contract } from "ethers";
import { contractABI } from "@/abi";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { cn, decryptFromBytes } from "@/lib/utils";

type Suggestion = {
  id: string;
  createdAt: string;
  topic: string;
  desc: string;
  isPrivate: boolean;
  isDeleted: boolean;
  isActive: boolean;
  feedbackCount: number;
};

export default function SuggestionsTable() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const contractAddress = String(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const secretKey = String(getCookie("userAccount"));

  const fetchUserLinks = async () => {
    setLoading(true);
    try {
      if (!window.ethereum) return;

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      const contract = new Contract(contractAddress, contractABI, provider);

      const info = await contract.getLinksByCreator(userAddress);

      const ids = info[0];
      const encryptedTopics = info[1];
      const encryptedDescs = info[2];
      const activeStatuses = info[3];
      const privacyLevels = info[4];
      const deletedStatuses = info[5];
      const feedbackCount = info[6];

      const suggestions: Suggestion[] = ids.map(
        (id: string, index: number) => ({
          id,
          createdAt: new Date().toISOString(),
          topic: decryptFromBytes(secretKey, encryptedTopics[index]),
          desc: decryptFromBytes(secretKey, encryptedDescs[index]),
          isActive: activeStatuses[index] === true,
          isPrivate: privacyLevels[index] !== true,
          feedbackCount: feedbackCount[index],
          isDeleted: deletedStatuses[index] === true,
        })
      );

      // Filter out deleted suggestions
      const activeSuggestions = suggestions.filter((s) => !s.isDeleted);

      setSuggestions(activeSuggestions);
    } catch (err) {
      console.error("Error fetching links:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserLinks();
  }, []);

  return (
    <div className="w-full container mx-auto px-4 mt-4">
      <div className="w-full flex justify-between items-baseline mb-4">
        <h2 className="text-2xl font-semibold">Your Suggestions</h2>
        <Button variant="neutral" className="w-max">
          <Link href="/dashboard/create" className="flex items-center gap-2">
            <PlusCircle className="w-4 h-auto" />
            Create
          </Link>
        </Button>
      </div>

      <ScrollArea className="h-[600px] w-full border rounded-md">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead className="w-12 p-2 md:p-4 text-center">#</TableHead>
              <TableHead className="p-2 md:p-4">Name</TableHead>
              <TableHead className="p-2 md:p-4 text-center">Received</TableHead>
              <TableHead className="p-2 md:p-4 text-center">Status</TableHead>
              <TableHead className="p-2 md:p-4 text-center">Privacy</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              // Loading Skeleton
              Array.from({ length: 10 }).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-4 mx-auto" />
                  </TableCell>
                  <TableCell className="p-4">
                    <Skeleton className="h-4 w-3/4" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-4 w-6 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-6 w-16 mx-auto rounded-full" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-6 w-16 mx-auto rounded-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : suggestions.length > 0 ? (
              // Render Suggestions
              suggestions.map((suggestion, index) => (
                <TableRow key={suggestion.id}>
                  <TableCell className="text-center font-semibold">
                    {index + 1}
                  </TableCell>
                  <TableCell className="font-medium p-0">
                    <Link
                      href={`/dashboard/${suggestion.id}`}
                      className="block p-2 md:p-4 capitalize"
                    >
                      {suggestion.topic}
                    </Link>
                  </TableCell>
                  <TableCell className="p-0 text-center">
                    <Link
                      href={`/dashboard/${suggestion.id}`}
                      className="block p-2 md:p-4 capitalize"
                    >
                      {suggestion.feedbackCount}
                    </Link>
                  </TableCell>
                  <TableCell className="text-center p-0">
                    <Link
                      href={`/dashboard/${suggestion.id}`}
                      className="block p-2 md:p-4"
                    >
                      <Badge
                        className={cn(
                          "capitalize",
                          suggestion.isActive ? "bg-yellow-500" : "bg-gray-500"
                        )}
                      >
                        {suggestion.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </Link>
                  </TableCell>
                  <TableCell className="text-center p-0">
                    <Link
                      href={`/dashboard/${suggestion.id}`}
                      className="block p-2 md:p-4"
                    >
                      <Badge
                        className={cn(
                          "capitalize",
                          !suggestion.isPrivate ? "bg-red-500" : "bg-green-500"
                        )}
                      >
                        {!suggestion.isPrivate ? "Private" : "Public"}
                      </Badge>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
                <TableRow>
                <TableCell colSpan={5} className="text-center py-20">
                  <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                    <span className="text-lg font-medium">
                      No suggestions found
                    </span>
                    <Link href="/dashboard/create">
                      <Button  className="mt-2 cursor-pointer">
                        Create your first suggestion
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}