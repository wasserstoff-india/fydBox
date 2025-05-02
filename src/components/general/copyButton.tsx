import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
}

const CopyButton = ({ textToCopy, className = "" }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  return (
    <div
      className={cn(`cursor-pointer`, className)}
      // size="icon"
      // variant="neutral"
      onClick={handleCopy}
    >
      {copied ? <Check /> : <Copy />}
    </div>
  );
};

export default CopyButton;
