import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SiteHeader } from "@/components/site-header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Happy Work Anniversary - Celebrate Work Milestones",
  description: "Create memorable work anniversary celebrations with personalized messages from the team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
