"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
// import { ShineBorder } from "./magicui/shine-border";

import { BrowserProvider, Contract } from "ethers";
import { contractABI } from "@/abi";

import { getCookie } from "cookies-next";
import { encryptToBytes } from "@/lib/utils";
import { Card } from "../ui/card";
import CopyButton from "../general/copyButton";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function GenerateFeedbackForm() {
  const [pending, setPending] = useState(false);
  const [topic, setTopic] = useState("");
  const [desc, setDesc] = useState("");
  const [privacy, setPrivacy] = useState("private");
  const [latestSuggestion, setLatestSuggestion] = useState<{
    topic: string;
    description: string;
    isPrivate: boolean;
    link: string;
  } | null>(null);

  // const [copied, setCopied] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // const handleCopyLink = async (text: string) => {
  //   await navigator.clipboard.writeText(text);
  //   setCopied(true);
  //   setTimeout(() => {
  //     setCopied(false);
  //   }, 2000);
  // };
  const contractAddress = String(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

  const secretKey = String(getCookie("userAccount"));

  const generateLink = async () => {
    if (!window.ethereum) {
      toast.error("MetaMask not detected!");
      return;
    }

    if (!topic || topic.trim().length < 4) {
      toast.info("Topic must be at least 4 characters long.");
      return;
    }
    if (!topic || topic.trim().length > 30) {
      toast.info("Topic must be less than 30 characters.");
      return;
    }

    if (!desc || desc.trim().length < 12) {
      toast.info("Description must be at least 12 characters long.");
      return;
    }
    if (!desc || desc.trim().length > 300) {
      toast.info("Description must be less than 300 characters.");
      return;
    }

    try {
      setPending(true);
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, contractABI, signer);

      const rawId = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 10)}`;

      const linkIdBytes = new TextEncoder().encode(
        encryptToBytes(secretKey, rawId)
      );
      const encryptedTopicBytes = new TextEncoder().encode(
        encryptToBytes(secretKey, topic.trim())
      );
      const encryptedDescBytes = new TextEncoder().encode(
        encryptToBytes(secretKey, desc.trim())
      );
      const isPrivate = privacy === "private";

      const tx = await contract.createLink(
        linkIdBytes,
        encryptedTopicBytes,
        encryptedDescBytes,
        isPrivate
      );

      const receipt = await tx.wait();

      // Get the linkId from emitted event
      let actualLinkId = null;
      for (const log of receipt.logs) {
        try {
          const parsedLog = contract.interface.parseLog(log);
          if (parsedLog?.name === "LinkCreated") {
            actualLinkId = parsedLog?.args.linkId;
            break;
          }
        } catch (e) {
          if (e instanceof Error) {
            toast.error(e.message || "Error Creating Link.");
          }
        }
      }

      if (!actualLinkId) {
        throw new Error("Link ID not found in transaction logs.");
      }

      const fullLink = `${baseUrl}receive/${actualLinkId}`;
      // console.log(">>> Full link:", fullLink);

      setLatestSuggestion({
        topic: topic.trim(),
        description: desc.trim(),
        isPrivate,
        link: fullLink,
      });

      toast.success("Suggestion Link created successfully!");
      setTopic("");
      setDesc("");
    } catch (err) {
      // console.error(err);
      toast.error("Error generating unique link.");
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      {!latestSuggestion && (
        <form className="flex flex-col justify-start items-start gap-4 sm:gap-6 w-full max-w-xl mx-auto px-4 mt-4">
          <div className="flex flex-col items-start gap-2 w-full">
            <Label htmlFor="topic" className="text-lg font-medium">
              Topic
            </Label>
            <Input
              placeholder="Enter topic..."
              name="topic"
              id="topic"
              className="flex-1 w-full px-4 py-2"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-start gap-2 w-full">
            <Label htmlFor="desc" className="text-lg font-medium">
              Description
            </Label>
            <Textarea
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              placeholder="Enter description..."
              name="desc"
              id="desc"
              className="flex-1 w-full px-4 py-2"
            />
          </div>
          <div className="flex flex-col items-start gap-2 w-full">
            <Label htmlFor="privacy" className="text-lg font-medium">
              Choose who can see the suggestions
            </Label>
            <RadioGroup
              id="privacy"
              name="privacy"
              defaultValue="private"
              value={privacy}
              onValueChange={setPrivacy}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="private" id="r1" />
                <Label htmlFor="r1">Only Me</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="public" id="r2" />
                <Label htmlFor="r2">Anyone with the suggestion link</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="w-full">
            <Button
              className={"relative w-full font-semibold cursor-pointer"}
              onClick={generateLink}
              type="button"
              disabled={pending}
            >
              <span className={pending ? "text-transparent" : ""}>
                Generate Link
              </span>
              {pending && (
                <span className="flex justify-center items-center absolute w-full h-full text-slate-400">
                  <LoaderCircle className="animate-spin" />
                </span>
              )}
            </Button>
          </div>
        </form>
      )}

      {latestSuggestion && (
        <Card className="w-full max-w-sm md:max-w-xl mx-auto space-y-2 mt-10 px-4">
          {/* <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} /> */}
          <h3 className="text-xl font-semibold text-center mb-4">
            Share the below link to start recieving suggestions
          </h3>
          <div className="w-full flex flex-col justify-center items-center gap-2 mb-4">
            <p className="font-semibold text-lg text-shadow-main-foreground text-wrap">
              {latestSuggestion.topic}
            </p>
            <p className="text-sm text-main-foreground text-wrap">
              {latestSuggestion.description}
            </p>
          </div>

          <div className="w-full flex justify-center items-center gap-1">
            <div className="p-[9px] bg-main/50 rounded text-ellipsis max-w-[150ch] truncate">
              {latestSuggestion.link}
            </div>
            {/* <div
              className="border border-zinc-800 text-zinc-600 p-2 rounded cursor-pointer"
              onClick={() => handleCopyLink(latestSuggestion.link)}
            >
              {copied ? <Check /> : <Copy />}
            </div> */}
            <CopyButton textToCopy={latestSuggestion.link} />
          </div>
        </Card>
      )}
    </>
  );
}
