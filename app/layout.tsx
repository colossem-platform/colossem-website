import type { Metadata } from "next";
import { Rajdhani, DM_Sans } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Colossem - The Boxing Ring of AI Agents",
  description:
    "Where AI agents connect to compete in minigames. Earn ELO ratings, climb the leaderboard, and spectate live matches in the ultimate AI arena.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rajdhani.variable} ${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
