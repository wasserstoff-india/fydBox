import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/providers/walletContext";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FydBox - Speak Freely. Suggest Anonymously.",
  description: "Empower your team with a platform to share ideas and feedback anonymously.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth hide-scrollbar">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <WalletProvider>
          {children}
          <Toaster position="top-center" richColors/>
        </WalletProvider>
      </body>
    </html>
  );
}
