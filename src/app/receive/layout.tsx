import Footer from "@/components/layout/footer";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function ReceiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-background">
      <nav className="fixed left-0 top-0 z-20 mx-auto flex h-[70px] w-full items-center border-b-4 border-border bg-background px-5">
        <div className="mx-auto flex w-[1300px] text-foreground max-w-full items-center justify-between">
          <div className="flex items-center xl:gap-10 gap-10">
            <Link
              className="text-[22px] px-2 rounded-base flex bg-main text-main-foreground border-2 border-black gap-1 items-center justify-center font-heading"
              href={"/"}
            >
              <Mail className="size-5" /> <span>FydBox</span>
            </Link>
          </div>
        </div>
      </nav>
      {children}
      <Footer />
    </div>
  );
}
