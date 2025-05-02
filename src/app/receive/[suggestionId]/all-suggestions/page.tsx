"use client";
import { contractABI } from "@/abi";
import FeedbackList from "@/components/dashboard/feedbackList";
import { decryptFromBytes } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { BrowserProvider, Contract } from "ethers";
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
  const secretKey = String(getCookie("userAccount"));
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const fetchSuggestionById = async () => {
    try {
      if (!window.ethereum || !suggestionId) return;

      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(contractAddress, contractABI, provider);

      const info = await contract.getFullLinkInfo(suggestionId);
      // console.log("Contract Info:", info);

      const encryptedTopicHex = info[1];
      const encryptedDescHex = info[2];

      const decryptedTopic = decryptFromBytes(secretKey, encryptedTopicHex);
      const decryptedDesc = decryptFromBytes(secretKey, encryptedDescHex);

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
      if (!window.ethereum || !suggestionId) return;

      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(contractAddress, contractABI, provider);

      const info = await contract.getLinkFeedbacks(suggestionId);

      const encryptedContents = info[0];
      const feedbackSenders = info[1];
      const timestamps = info[2];

      const feedbacks = encryptedContents.map(
        (encryptedContent: string, index: number) => {
          const decryptedContent = decryptFromBytes(
            secretKey,
            encryptedContent
          );
          return {
            content: decryptedContent,
            author: feedbackSenders[index],
            timestamp: new Date(
              Number(timestamps[index]) * 1000
            ).toLocaleString(), // already formatted for UI
          };
        }
      );

      setFeedbacks(feedbacks);
    } catch (err) {
      toast.error("Error fetching feedbacks");
    } finally {
      setLoadingSuggestions(false);
    }
  };

  useEffect(() => {
    fetchSuggestionById();
    fetchFeedbacks();
  }, []);
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
