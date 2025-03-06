import type { Metadata } from "next";
import { Inter, Noto_Color_Emoji } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import Footer from "./_components/footer";

const interFont = Inter({ subsets: ["latin"] });
const emojiFont = Noto_Color_Emoji({ subsets: ["emoji"], weight: "400" });

export const metadata: Metadata = {
  title: "Pre-WebAuthn",
  description:
    "Register with WebAuthn, and obtain your ready-made credential id and public key for your own purposes",
  icons: "/favicon.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interFont} ${emojiFont}`}>
      <body className="min-h-screen flex flex-col">
        <main className="m-4 ">{children}</main>
        <Footer />

        <Toaster />
      </body>
    </html>
  );
}
