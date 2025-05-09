"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
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

export default function GeneratePollForm() {
  const [pending, setPending] = useState(false);
  const [question, setQuestion] = useState("");
  const [optionInput, setOptionInput] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [privacy, setPrivacy] = useState("private");
  const [latestPoll, setlatestPoll] = useState<{
    question: string;
    isPrivate: boolean;
    link: string;
  } | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const contractAddress = String(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

  const secretKey = String(getCookie("userAccount"));
  // const secretKey = String(process.env.NEXT_PUBLIC_SECRET_KEY);

  const updateOption = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    if (options.length <= 2) {
      toast.info("Poll must have at least 2 options.");
      return;
    }
    const updated = options.filter((_, i) => i !== index);
    setOptions(updated);
  };

  const generateLink = async () => {
    if (!window.ethereum) {
      toast.error("MetaMask not detected!");
      return;
    }

    if (!question || question.trim().length < 4) {
      toast.info("Question must be at least 4 characters long.");
      return;
    }
    if (!question || question.trim().length > 30) {
      toast.info("Topic must be less than 100 characters.");
      return;
    }
    if (options.length < 2) {
      toast.info("Please add at least 2 options.");
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
        encryptToBytes(secretKey, question.trim())
      );

      const isPrivate = privacy === "private";

      const tx = await contract.createLink(
        linkIdBytes,
        encryptedTopicBytes,

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

      setlatestPoll({
        question: question.trim(),

        isPrivate,
        link: fullLink,
      });

      toast.success("Suggestion Link created successfully!");
      setQuestion("");
    } catch (err) {
      // console.error(err);
      toast.error("Error generating unique link.");
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      {!latestPoll && (
        <form className="flex flex-col justify-start items-start gap-4 sm:gap-6 w-full max-w-xl mx-auto px-4 mt-4">
          <div className="flex flex-col items-start gap-2 w-full">
            <Label htmlFor="question" className="text-lg font-medium">
              Topic
            </Label>
            <Input
              placeholder="Enter topic..."
              name="topic"
              id="topic"
              className="flex-1 w-full px-4 py-2"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-start gap-2 w-full">
            <Label className="text-lg font-medium">Options</Label>

            <div className="flex w-full items-center gap-2">
              <Input
                placeholder={`Enter an option`}
                value={optionInput}
                onChange={(e) => setOptionInput(e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                variant="reverse"
                onClick={() => {
                  const trimmed = optionInput.trim();
                  if (!trimmed) return toast.info("Option cannot be empty.");
                  if (options.length >= 6)
                    return toast.info("You can add up to 6 options.");
                  setOptions([...options, trimmed]);
                  setOptionInput("");
                }}
                size="icon"
                disabled={options.length >= 6}
              >
                <PlusCircle />
              </Button>
            </div>

            <div className="w-full flex flex-col gap-2 mt-2">
              {options.map((opt, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-muted py-2 gap-2 rounded"
                >
                  <Input
                    readOnly
                    className="text-sm text-muted-foreground"
                    value={opt}
                  />
                  <button
                    type="button"
                    className="cursor-pointer p-2 bg-white text-red-500 border-2 border-black rounded"
                    onClick={() =>
                      setOptions(options.filter((_, idx) => idx !== i))
                    }
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="flex flex-col items-start gap-2 w-full">
            <Label htmlFor="privacy" className="text-lg font-medium">
              Choose who can see the poll results
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
                <Label htmlFor="r2">Anyone with the poll link</Label>
              </div>
            </RadioGroup>
          </div> */}

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

      {latestPoll && (
        <Card className="w-full max-w-sm md:max-w-xl mx-auto space-y-2 mt-10 px-4">
          <h3 className="text-xl font-semibold text-center mb-4">
            Share the below link to start recieving votes
          </h3>
          <div className="w-full flex flex-col justify-center items-center gap-2 mb-4">
            <p className="font-semibold text-lg text-shadow-main-foreground text-wrap">
              {latestPoll.question}
            </p>
          </div>

          <div className="w-full flex justify-center items-center gap-1">
            <div className="p-[9px] bg-main/50 rounded text-ellipsis max-w-[150ch] truncate">
              {latestPoll.link}
            </div>

            <CopyButton textToCopy={latestPoll.link} />
          </div>
        </Card>
      )}
    </>
  );
}
