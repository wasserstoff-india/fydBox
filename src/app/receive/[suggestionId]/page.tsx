"use client";
import { contractABI } from "@/abi";
import Loading from "@/app/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn, decryptFromBytes, encryptToBytes } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { BrowserProvider, Contract, ethers } from "ethers";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
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
  // const secretKey = String(getCookie("userAccount"));
  const secretKey = String(process.env.NEXT_PUBLIC_SECRET_KEY);
  const [pending, setPending] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchSuggestionById = async () => {
    try {
      if (!suggestionId) return;

      const provider = new ethers.JsonRpcProvider(
        "https://bsc-testnet-dataseed.bnbchain.org",
        // {
        //   chainId: 97,
        // }
        // "https://endpoints.omniatech.io/v1/bsc/testnet/public"
      ); // BrowserProvider(window.ethereum);
      const contract = new Contract(contractAddress, contractABI, provider);

      const info = await contract.getFullLinkInfo(suggestionId);

        // console.log("Contract Info:", info);
        console.log(secretKey===info[0])
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
      console.log("Error", err);
      if (err instanceof Error) toast.error("Error fetching suuggestion info.");
    } finally{
      setLoading(false)
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

  // console.log(suggestion);

  if (suggestion?.isDeleted) {
    notFound();
  }

  if(loading){
    return (
      <Loading />
    )
  }

  // console.log(suggestion?.isActive);
  if (!suggestion?.isActive) {
    return (
      <div className="text-foreground max-h-[80dvh] h-[100dvh] portrait:max-h-[100dvh] portrait:h-[100dvh] w-full flex items-center justify-center bg-background prose-headings:font-heading prose-h1:md:text-5xl prose-h1:text-3xl">
        <div className="flex flex-col items-center text-center max-w-(--breakpoint-xl) px-5">
          <h1 className="leading-normal text-4xl font-bold">Inactive Link</h1>

          <p className="leading-snug font-base sm:mt-[30px] sm:mb-[40px] my-9 2xl:text-3xl xl:text-2xl lg:text-2xl w-full md:text-2xl sm:text-xl text-xl">
            Admin is no longer accepting feedbacks on this link.
          </p>
          <button onClick={fetchSuggestionById}>CLick</button>
          <Link
            className="flex items-center font-base gap-2.5 w-max text-main-foreground rounded-base border-2 border-border bg-main md:px-10 px-4 md:py-3 py-2 md:text-[22px] text-base shadow-shadow transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
            href={"/"}
          >
            Create your own link
            <ArrowUpRight className="md:size-[30px] size-5" />
          </Link>
        </div>
      </div>
    );
  }
  // console.log(suggestion?.isActive);
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
