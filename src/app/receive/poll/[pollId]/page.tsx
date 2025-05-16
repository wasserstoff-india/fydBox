"use client";
import { contractABI } from "@/abi";
import Loading from "@/app/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, decryptFromBytes, encryptToBytes } from "@/lib/utils";
import { BrowserProvider, Contract, ethers } from "ethers";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";


  const poll = {
    topic: "What feature should we build next?",
    options: [
      { id: "feature_1", content: "Dark Mode Support" },
      { id: "feature_2", content: "Mobile App" },
      { id: "feature_3", content: "Offline Access" },
    ],
    isActive: true,
    isDeleted: false,
    isPrivate: true,
  };

export default function ReceivePollPage() {
  const { pollId } = useParams();
  const router = useRouter();
  const contractAddress = String(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

  // const [poll, setPoll] = useState<{
  //   topic: string;
  //   options: { id: string; content: string }[];
  //   isActive: boolean;
  //   isDeleted: boolean;
  //   isPrivate: boolean;
  // } | null>(null);

  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [encryptionKey, setEncryptionKey] = useState("");
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const fetchPollById = async () => {
    try {
      if (!pollId) return;

      const provider = new ethers.JsonRpcProvider(
        "https://bsc-testnet-dataseed.bnbchain.org"
      );
      const contract = new Contract(contractAddress, contractABI, provider);
      const info = await contract.getFullLinkInfo(pollId);

      const decryptionKey = info[0].toLowerCase();
      setEncryptionKey(decryptionKey);

      const decryptedTopic = decryptFromBytes(decryptionKey, info[1]);

      const encryptedOptions: [string, string][] = info[2]; // array of [idHex, contentHex]

      const decryptedOptions = encryptedOptions.map(([idHex, contentHex]) => ({
        id: decryptFromBytes(decryptionKey, idHex),
        content: decryptFromBytes(decryptionKey, contentHex),
      }));

      // setPoll({
      //   topic: decryptedTopic,
      //   options: decryptedOptions,
      //   isActive: info[3],
      //   isPrivate: info[4],
      //   isDeleted: info[5],
      // });
    } catch (err) {
      console.error("Error:", err);
      if (err instanceof Error) toast.error("Error fetching poll info.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPollById();
  }, []);

  const submitVote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!pollId || !selectedOptionId) {
      toast.info("Please select an option to submit your vote.");
      return;
    }

    try {
      setPending(true);
      if (!window.ethereum) {
        toast.info(
          "No wallet detected! Please install MetaMask or another wallet."
        );
        return;
      }

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, contractABI, signer);

      const encryptedOptionId = encryptToBytes(encryptionKey, selectedOptionId);
      const encryptedBytes = new TextEncoder().encode(encryptedOptionId);

      const tx = await contract.submitFeedback(pollId, encryptedBytes);
      await tx.wait();

      toast.success("Vote submitted successfully!");
      router.push(`${pollId}/submitted`);
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error("Failed to submit vote!");
    } finally {
      setPending(false);
    }
  };

  if (poll?.isDeleted) {
    notFound();
  }

  if (loading) {
    return <Loading />;
  }

  if (!poll?.isActive) {
    return (
      <div className="text-foreground max-h-[80dvh] h-[100dvh] portrait:max-h-[100dvh] portrait:h-[100dvh] w-full flex items-center justify-center bg-background prose-headings:font-heading prose-h1:md:text-5xl prose-h1:text-3xl">
        <div className="flex flex-col items-center text-center max-w-(--breakpoint-xl) px-5">
          <h1 className="leading-normal text-4xl font-bold">Inactive Link</h1>
          <p className="leading-snug font-base sm:mt-[30px] sm:mb-[40px] my-9 2xl:text-3xl xl:text-2xl lg:text-2xl w-full md:text-2xl sm:text-xl text-xl">
            Admin is no longer accepting votes on this link.
          </p>
          <Link
            className="flex items-center font-base gap-2.5 w-max text-main-foreground rounded-base border-2 border-border bg-main md:px-10 px-4 md:py-3 py-2 md:text-[22px] text-base shadow-shadow transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
            href="/"
          >
            Create your own link
            <ArrowUpRight className="md:size-[30px] size-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1300px] mx-auto mt-24 px-5">
      <form
        className="max-w-2xl mx-auto flex w-full flex-col gap-6"
        onSubmit={submitVote}
      >
        <div className="text-xl font-semibold mt-6 sm:mt-8 space-y-2 max-w-sm">
          <p>
            Submit your vote for:
            <span className="text-brand font-bold italic text-orange-600">
              &nbsp;{poll?.topic}
            </span>
          </p>
        </div>

        <div className="flex sm:items-center gap-2 flex-col sm:flex-row items-start">
          <Badge className={cn("capitalize bg-red-500")}>Private</Badge>
          <div>
            <p>Only Admin can see the poll results</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {poll?.options.map((opt) => (
            <label
              key={opt.id}
              className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted transition"
            >
              <input
                type="radio"
                name="poll-option"
                value={opt.id}
                checked={selectedOptionId === opt.id}
                onChange={() => setSelectedOptionId(opt.id)}
                className="form-radio accent-orange-600"
              />
              <span className="text-base">{opt.content}</span>
            </label>
          ))}
        </div>

        <Button
          type="submit"
          className="relative w-full font-semibold px-4 py-2"
          disabled={pending}
        >
          <span className={pending ? "text-transparent" : ""}>
            Submit Your Vote
          </span>
          {pending && (
            <span className="flex justify-center items-center absolute w-full h-full text-slate-400">
              <LoaderCircle className="animate-spin" />
            </span>
          )}
        </Button>
      </form>

      <div className="max-w-2xl mx-auto text-sm md:text-xl font-semibold mt-8">
        NOTE : Your vote is completely anonymous and helps make things better.
        Be honest, be constructive, and share your thoughts freely.
      </div>
    </div>
  );
}
