"use client";

import { contractABI } from "@/abi";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn, decryptFromBytes } from "@/lib/utils";
import { BrowserProvider, Contract } from "ethers";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getCookie } from "cookies-next";
import Link from "next/link";

// import ChangePrivacy from "@/components/dashboard/changePrivacy";
// import ChangeStatus from "@/components/dashboard/changeStatus";

// import MoreOptions from "@/components/dashboard/moreOptions";
import { Skeleton } from "@/components/ui/skeleton";
// import FeedbackList from "@/components/dashboard/feedbackList";

import { toast } from "sonner";
import CopyButton from "@/components/general/copyButton";
import FeedbackList from "@/components/dashboard/feedbackList";
// import ReloadButton from "@/components/general/reloadButton";
import ChangePrivacy from "@/components/dashboard/changePrivacy";
import ChangeStatus from "@/components/dashboard/changeStatus";
import MoreOptions from "@/components/dashboard/moreOptions";

export default function SuggestionPage() {
  const { suggestionId } = useParams();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChangingPrivacy, setIsChangingPrivacy] = useState(false);
  const [isChangingStatus, setIsChangingStatus] = useState(false);
  const router = useRouter();
  const [suggestion, setSuggestion] = useState<{
    topic: string;
    description: string;
    isActive: boolean;
    isPrivate: boolean;
    isDeleted: boolean;
    feedbackCount: number;
  } | null>(null);

  const contractAddress = String(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const secretKey = String(getCookie("userAccount"));
  // const secretKey = String(process.env.NEXT_PUBLIC_SECRET_KEY);
  const [feedbacks, setFeedbacks] = useState<
    { content: string; author: string; timestamp: string }[]
  >([]);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const fetchSuggestionById = async () => {
    try {
      if (!window.ethereum || !suggestionId) return;

      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(contractAddress, contractABI, provider);

      const info = await contract.getFullLinkInfo(suggestionId);

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
        feedbackCount: Number(info[6]),
      });
    } catch (err) {
      if (err instanceof Error) toast.error("Error fetching suggestion info.");
    }
  };

  const fetchFeedbacks = async () => {
    setLoadingFeedbacks(true);
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
            ).toLocaleString(),
          };
        }
      );

      setFeedbacks(feedbacks);
    } catch (err) {
      if (err instanceof Error) toast.error("Error fetching suggestions.");
    } finally {
      setLoadingFeedbacks(false);
    }
  };

  useEffect(() => {
    fetchSuggestionById();
    fetchFeedbacks();
  }, []);

  useEffect(() => {
    fetchSuggestionById();
  }, [suggestion]);

  const handleChangePrivacy = async (isPrivate: boolean) => {
    try {
      if (!window.ethereum) {
        toast.error("No wallet found");
        return;
      }

      setIsChangingPrivacy(true);

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, contractABI, signer);

      const tx = await contract.setLinkPrivacy(suggestionId, isPrivate);
      await tx.wait();

      toast.success("Privacy changed successfully!");
    } catch (err) {
      if (err instanceof Error) {
        toast.error("Error changing privacy");
      } else {
        toast.error("Unexpected error occurred");
      }
    } finally {
      setIsChangingPrivacy(false);
    }
  };

  const handleChangeStatus = async (isActive: boolean) => {
    try {
      if (!window.ethereum) {
        toast.error("No wallet found");
        return;
      }

      setIsChangingStatus(true);

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, contractABI, signer);

      const tx = await contract.setLinkStatus(suggestionId, isActive);
      await tx.wait();

      toast.success("Status changed successfully!");
    } catch (err) {
      if (err instanceof Error) {
        toast.error("Error changing status");
      } else {
        toast.error("Unexpected error occurred");
      }
    } finally {
      setIsChangingStatus(false);
    }
  };

  const handleDeleteLink = async () => {
    try {
      if (!window.ethereum) {
        toast.error("No wallet found");
        return;
      }

      setIsDeleting(true);

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, contractABI, signer);

      const tx = await contract.deleteLink(suggestionId);
      await tx.wait();

      toast.success("Link deleted successfully!");
      router.push("/dashboard");
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        toast.error("Error Deleting Suggestion");
      } else {
        toast.error("Unexpected error occurred");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full max-w-[1300px] mx-auto mt-24 px-5">
      <div className="w-full px-4 mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard"> Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{suggestion?.topic || "..."}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0 my-4 px-4">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold">
            {suggestion?.topic || <Skeleton className="h-6 w-40" />}
          </span>
          {suggestion && (
            <>
              <Badge
                className={cn(
                  "capitalize",
                  suggestion.isActive ? "bg-yellow-500" : "bg-gray-500"
                )}
              >
                {suggestion.isActive ? "Active" : "Inactive"}
              </Badge>
              <Badge
                className={cn(
                  "capitalize",
                  suggestion.isPrivate ? "bg-red-500" : "bg-green-500"
                )}
              >
                {suggestion.isPrivate ? "Private" : "Public"}
              </Badge>
            </>
          )}
        </div>

        {suggestion && (
          <div className="flex items-center gap-2">
            {/* <ChangePrivacy suggestion={String(suggestionId)} /> */}
            <ChangePrivacy
              onChangePrivacy={handleChangePrivacy}
              loading={isChangingPrivacy}
            />

            <ChangeStatus
              onChangeStatus={handleChangeStatus}
              loading={isChangingStatus}
            />
            <MoreOptions onDelete={handleDeleteLink} loading={isDeleting} />
          </div>
        )}
      </div>

      <div className="text-sm text-wrap w-full px-4  max-w-sm md:max-w-md">
        {suggestion?.description || <Skeleton className="h-16 w-full" />}
      </div>

      {/* Link Section */}
      {suggestion && (
        // <div className="flex w-full justify-between items-center my-5 px-4">
        <div className="flex justify-start items-center gap-2 px-4 my-5">
          <Link
            href={`${baseUrl}${suggestionId}` || "#"}
            target="_blank"
            className="text-main-foreground text-sm truncate max-w-[30ch] md:max-w-[50ch] bg-main/50 p-2 rounded"
          >
            {suggestion.isActive
              ? `${baseUrl}receive/${suggestionId}`
              : "The link has been deactivated!"}
          </Link>
          <CopyButton textToCopy={`${baseUrl}receive/${suggestionId}`} />
          {/* </div> */}
          {/* <ReloadButton /> */}
        </div>
      )}

      <FeedbackList feedbacks={feedbacks} loading={loadingFeedbacks} />
    </div>
  );
}
