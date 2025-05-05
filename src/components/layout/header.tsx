"use client";
import { useWallet } from "@/providers/walletContext";

import Link from "next/link";
import { Button } from "../ui/button";
import {  truncateAddress } from "@/lib/utils";
import { useEffect } from "react";
import { deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Image from "next/image";


export default function Header() {
  const { address, isConnected, connectWallet, disconnectWallet, balance } = useWallet();
  const router = useRouter();
//   const [repo, setRepo] = useState<{ stargazers_count: number }>({ stargazers_count: 0 });

//   useEffect(() => {
//     async function getRepoData() {
//       const res = await fetch(
//         "https://api.github.com/sahilworkdev/fydBox",
//         {
//           cache: "force-cache",
//           headers: {
//             "X-GitHub-Api-Version": "2022-11-28",
//             Authorization: `Bearer ${process.env.GH_API_KEY}`,
//           },
//         }
//       );
// console.log(res)
//       if (!res.ok) {
//         throw new Error("Failed to fetch data");
//       }

//       const data = await res.json();
//       setRepo(data);
//       return data;
//     }

//     getRepoData();
//   }, []);

  // const starsCount = (repo.stargazers_count / 1000).toFixed(1) + "k";
  useEffect(() => {
    if (isConnected && address) {
      setCookie("userAccount", address, { path: "/", maxAge: 60 * 60 * 24 });
      // router.push("/dashboard");
    }
  }, [isConnected, address]);
  const disconnectWalletFrom = () => {
    deleteCookie("userAccount");
    router.push("/");
  };
  // console.log(balance)
  return (
    <nav className="fixed left-0 top-0 z-20 mx-auto flex h-[70px] w-full items-center border-b-4 border-border bg-background px-5">
      <div className="mx-auto flex w-[1300px] text-foreground max-w-full items-center justify-between">
        <div className="flex items-center xl:gap-10 gap-10">
          <Link
            className="text-[22px] px-2 rounded-base flex bg-white text-main-foreground border-2 border-black gap-1 items-center justify-center font-heading"
            href={"/"}
          >
            {/* <Mail className="size-5" /> */}
            <Image src="/email.gif" alt="email" width={40} height={40} />
            <span>FydBox</span>
          </Link>

          {/* <div className="items-center text-base font-base xl:gap-10 lg:flex gap-10 hidden">
          

            <Link href="/stars">Features</Link>

            <Link href="/templates">How</Link>

            <Link href="/showcase">FAQs</Link>
          </div> */}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center justify-end gap-4">
            {/* <a
              target="_blank"
              href="https://github.com/sahilworkdev/fydBox"
              className="flex gap-2 items-center justify-center rounded-base border-2 border-border shadow-nav dark:shadow-navDark dark:border-darkBorder px-1.5 h-9 transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none dark:hover:shadow-none"
            >
              <p className="font-semibold sm:inline hidden">{starsCount}</p>

             <Github />
            </a> */}

            {isConnected ? (
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-main/50 text-primary-800 dark:text-primary-300 rounded-full text-sm font-medium">
                  {truncateAddress(address || "")}
                </span>
                <span className="px-3 py-1 bg-main/50 text-primary-800 dark:text-primary-300 rounded-full text-sm font-medium">
                  {balance===null ? "00" : balance} ETH
                </span>
                <Button
                  variant="neutral"
                  size="sm"
                  onClick={() => {
                    disconnectWallet();
                    disconnectWalletFrom();
                  }}
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button onClick={connectWallet} variant="default" size="sm">
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
