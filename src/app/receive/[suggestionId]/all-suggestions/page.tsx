"use client";
import { contractABI } from "@/abi";
import FeedbackList from "@/components/dashboard/feedbackList";
import { decryptFromBytes } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { BrowserProvider, Contract, ethers } from "ethers";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function PublicSuggestionPage() {
  const { suggestionId } = useParams();
  const [loadingSuggestions, setLoadingSuggestions] = useState(true);
  const [suggestion, setSuggestion] = useState<{
    topic: string;
    description: string;
    isActive: boolean;
    isDeleted: boolean;
    isPrivate: boolean;
  } | null>(null);
  const [feedbacks, setFeedbacks] = useState<
    { content: string; author: string; timestamp: string }[]
  >([]);
  const contractAddress = String(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  // const secretKey = String(getCookie("userAccount"));
  // const secretKey = String(process.env.NEXT_PUBLIC_SECRET_KEY);
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const [decryptionKeyForMsg, setDecryptionKeyForMsg] = useState("")

  const fetchSuggestionById = async () => {
    try {
      if (!suggestionId) return;

      // const provider = new BrowserProvider(window.ethereum);
       const provider = new ethers.JsonRpcProvider(
              "https://bsc-testnet-dataseed.bnbchain.org"
            );
      const contract = new Contract(contractAddress, contractABI, provider);

      const info = await contract.getFullLinkInfo(suggestionId);
      // console.log("Contract Info:", info);
      const decryptionKey = info[0].toLowerCase();
      setDecryptionKeyForMsg(info[0].toLowerCase())

      const encryptedTopicHex = info[1];
      const encryptedDescHex = info[2];

      const decryptedTopic = decryptFromBytes(decryptionKey, encryptedTopicHex);
      const decryptedDesc = decryptFromBytes(decryptionKey, encryptedDescHex);

      // console.log("Decrypted Topic:", decryptedTopic);

      setSuggestion({
        topic: decryptedTopic,
        description: decryptedDesc,
        isActive: info[3],
        isPrivate: info[4],
        isDeleted: info[5],
      });
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message || "Error changing privacy");
      } else {
        toast.error("Unexpected error occurred");
      }
    }
  };

  const fetchFeedbacks = async () => {
    setLoadingSuggestions(true);

    try {
      if (!suggestionId) return;

      // const provider = new BrowserProvider(window.ethereum);
      const provider = new ethers.JsonRpcProvider(
        "https://bsc-testnet-dataseed.bnbchain.org"
      );
      const contract = new Contract(contractAddress, contractABI, provider);

      const info = await contract.getLinkFeedbacks(suggestionId);
      const encryptedContents = info[0];
      const feedbackSenders = info[1];
      const timestamps = info[2];

      // console.log(info)
      // console.log('>>>>>',decryptionKeyForMsg)
      const feedbacks = encryptedContents.map(
        (encryptedContent: string, index: number) => {
          const decryptedContent = decryptFromBytes(
            decryptionKeyForMsg,
            encryptedContent
          );
          return {
            content: decryptedContent,
            author: feedbackSenders[index],
            timestamp: new Date(
              Number(timestamps[index]) * 1000
            ).toLocaleString(), 
          };
        }
      );

      setFeedbacks(feedbacks);
    } catch (err) {
      console.log(err);
      toast.error("Error fetching feedbacks");
    } finally {
      setLoadingSuggestions(false);
    }
  };

  useEffect(() => {
    fetchSuggestionById();
    // fetchFeedbacks();
  }, []);

  useEffect(()=>{
    fetchFeedbacks()
  }, [suggestion])
  
  // console.log(suggestionId);

  if (suggestion?.isPrivate) {
    router.push("/");
  }
  return (
    <div className="w-full max-w-[1300px] mx-auto mt-24 px-5">
      <div className="text-xl font-semibold mt-6 sm:mt-8 space-y-2 max-w-sm">
        <h1>All Suggestions For Topic : </h1>
        <p>
          <span className="text-brand font-bold italic text-orange-600">
            {suggestion?.topic}
          </span>
        </p>
        <p className="text-sm font-normal">{suggestion?.description}</p>
      </div>

      <FeedbackList feedbacks={feedbacks} loading={loadingSuggestions} />
    </div>
  );
}
