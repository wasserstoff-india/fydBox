"use client";
import { contractABI } from "@/abi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn, decryptFromBytes, encryptToBytes } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { BrowserProvider, Contract } from "ethers";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ReceiveSuggestionPage() {
  const { suggestionId } = useParams();
  const [feedbackContent, setFeedbackContent] = useState<string>("");
  const [suggestion, setSuggestion] = useState<{
    topic: string;
    description: string;
    isActive: boolean;
    isDeleted: boolean;
    isPrivate: boolean;
  } | null>(null);
  const router = useRouter();
  const contractAddress = String(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const secretKey = String(getCookie("userAccount"));
  const [pending, setPending] = useState(false);

  const fetchSuggestionById = async () => {
    try {
      if (!window.ethereum || !suggestionId) return;

      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(contractAddress, contractABI, provider);

      const info = await contract.getFullLinkInfo(suggestionId);

    //   console.log("Contract Info:", info[0]);
      const encryptedTopicHex = info[1];
      const encryptedDescHex = info[2];

      const decryptedTopic = decryptFromBytes(secretKey, encryptedTopicHex);
      const decryptedDesc = decryptFromBytes(secretKey, encryptedDescHex);

      setSuggestion({
        topic: decryptedTopic,
        description: decryptedDesc,
        isActive: info[3],
        isPrivate: info[4],
        isDeleted: info[5],
      });
    } catch (err) {
      if (err instanceof Error) toast.error("Error fetching suuggestion info.");
    }
  };

  useEffect(() => {
    fetchSuggestionById();
  }, []);

  const submitFeedback = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!suggestionId) {
      toast.info("Suggestion ID is missing.");
      return;
    }

    if (!feedbackContent || feedbackContent.trim().length < 5) {
      toast.info("Suggestion must be at least 5 characters long.");
      return;
    }

    if (feedbackContent.trim().length > 400) {
      toast.info("Suggestion must be less than 400 characters.");
      return;
    }

    try {
      setPending(true);
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, contractABI, signer);

      const encryptedContent = encryptToBytes(
        secretKey,
        feedbackContent.trim()
      );
      const encryptedContentBytes = new TextEncoder().encode(encryptedContent);

      const linkId = suggestionId;

      const tx = await contract.submitFeedback(linkId, encryptedContentBytes);
      await tx.wait();
      toast.success("Suggestion submitted successfully!");
      router.push(`${linkId}/sent`);
      setFeedbackContent("");
    } catch (err) {
      if (err instanceof Error) {
        toast.error("Failed to submit suggestion!");
      }
    } finally {
      setPending(false);
    }
  };

  console.log(suggestion);
  return (
    <div className="w-full max-w-[1300px] mx-auto mt-24 px-5">
      <form
        className="max-w-2xl mx-auto flex w-full flex-col gap-4"
        onSubmit={submitFeedback}
      >
        <div className="text-xl font-semibold mt-6 sm:mt-8 space-y-2 max-w-sm">
          <p>
            Send your feedback for :
            <span className="text-brand font-bold italic text-orange-600">
              &nbsp; {suggestion?.topic}
            </span>
          </p>
          <p className="text-sm font-normal">{suggestion?.description}</p>
        </div>
        <div className="flex sm:items-center gap-2 flex-col sm:flex-row items-start">
          <Badge
            className={cn(
              "capitalize",
              suggestion?.isPrivate ? "bg-red-500" : "bg-green-500"
            )}
          >
            {suggestion?.isPrivate ? "Private" : "Public"}
          </Badge>
          <div>
            {!suggestion?.isPrivate && (
              <p>
                <Link
                  href={`/receive/${suggestionId}/all-suggestions`}
                  className="underline"
                >
                  Click here
                </Link>{" "}
                to see others&apos; suggestions
              </p>
            )}
            {suggestion?.isPrivate && <p>Only Admin can see the suggestions</p>}
          </div>
        </div>
        <Input
          placeholder="Enter subject..."
          name="feedbackId"
          id="feedbackId"
          required
          type="hidden"
          value={suggestionId}
        />
        <Textarea
          placeholder="Enter suggestion..."
          name="feedback"
          id="feedback"
          rows={7}
          value={feedbackContent}
          onChange={(e) => setFeedbackContent(e.target.value)}
        />
        <Button
          type="submit"
          className={"relative w-full font-semibold cursor-pointer px-4 py-2"}
          disabled={pending}
        >
          <span className={pending ? "text-transparent" : ""}>
            Submit Suggestion
          </span>
          {pending && (
            <span className="flex justify-center items-center absolute w-full h-full text-slate-400">
              <LoaderCircle className="animate-spin" />
            </span>
          )}
        </Button>
      </form>

      <div className="max-w-2xl mx-auto  text-sm md:text-xl font-semibold mt-8">
        NOTE : Your suggestion is completely anonymous and helps make things
        better. Be honest, be constructive, and share your thoughts freely.
      </div>
    </div>
  );
}
