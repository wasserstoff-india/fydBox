"use client";

import { Button } from "@/components/ui/button";
import { CheckCheckIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SendPage() {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  return (
    <div className="w-full max-w-[1300px] mx-auto mt-24 px-5">
      <div className="flex justify-center items-center my-20 max-w-md mx-auto">
        <div className="flex flex-col gap-4 items-center justify-center">
          <CheckCheckIcon className="w-8 h-auto" />
          <p className="text-xl font-medium text-center">
            Your suggestion has been sent successfully and{" "}
            <strong>anonmously</strong>!
          </p>
          <div className="flex justify-center items-center flex-col md:flex-row gap-4">
            <Button asChild>
              <Link href={"/"}>Generate Your Suggestion Link</Link>
            </Button>
            <Button variant={"neutral"} onClick={goBack} className="cursor-pointer">
              Send Another Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
