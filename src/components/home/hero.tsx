"use client";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Star9 from "../stars/s9";
import { getCookie } from "cookies-next/client";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useWallet } from "@/providers/walletContext";

export default function Hero() {
  const [user, setUser] = useState("");
  const { address, isConnected } = useWallet();

  useEffect(() => {
    const userAccount = getCookie("userAccount");
    if (userAccount) {
      setUser(userAccount as string);
    } else {
      setUser("");
    }
  }, [address, isConnected]);

  return (
    <main className="relative flex min-h-[100dvh] flex-col overflow-hidden items-center justify-center bg-background px-5 md:py-[200px] py-[100px] bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] ">
      <div className="mx-auto w-container max-w-9/12">
        <div className="flex flex-col items-center text-center">
          <h1 className="leading-normal text-3xl md:text-6xl font-bold">
            Collect Honest Suggestions — Securely, <br />{" "}
            <span className="relative px-2 sm:mr-2 mr-0 md:[&_svg]:size-[45px] sm:[&_svg]:size-7 bg-main/50 rounded-base border-2 border-border/40 dark:border-border/70">
              Anonymously
              <Star9
                className="absolute sm:block hidden md:-bottom-4 md:-right-5 -bottom-2.5 -right-2.5"
                color="var(--main)"
                pathClassName="stroke-5 dark:stroke-3.5 stroke-black dark:stroke-black/70"
              />
              <Star9
                className="absolute sm:block hidden md:-top-4 md:-left-5 -top-2.5 -left-2.5"
                color="var(--main)"
                pathClassName="stroke-5 dark:stroke-3.5 stroke-black dark:stroke-black/70"
              />
            </span>{" "}
            , On-Chain.
          </h1>

          <p className="leading-snug w-full md:mt-[50px] md:mb-[60px] sm:mt-12 my-9 sm:mb-10 2xl:text-3xl xl:text-2xl lg:text-2xl xl:w-full lg:w-2/3 md:w-full md:text-2xl sm:text-xl text-xl">
            Collect anonymous or public feedback with blockchain-backed
            transparency. Share links and start receiving suggestions from
            anyone, securely and trustlessly.
          </p>

          {!user ? (
            <button
              onClick={() => {
                toast.info("Please connect your wallet to proceed.");
              }}
              className="flex items-center gap-2.5 w-max text-main-foreground rounded-base border-2 border-border bg-main md:px-10 px-4 md:py-3 py-2 md:text-[22px] text-base shadow-shadow transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
            >
              Start Collecting Feedbacks
              <ArrowUpRight className="md:size-[30px] size-5" />
            </button>
          ) : (
            <Link
              className="flex items-center gap-2.5 w-max text-main-foreground rounded-base border-2 border-border bg-main md:px-10 px-4 md:py-3 py-2 md:text-[22px] text-base shadow-shadow transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
              href={"/dashboard"}
            >
              Start Collecting Feedbacks
              <ArrowUpRight className="md:size-[30px] size-5" />
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
