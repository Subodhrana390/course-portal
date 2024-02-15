"use client";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { UserMemberContext } from "./_context/UserMemberContext";
import { useState } from "react";

const inter = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isMember, setIsMember] = useState(false);
  return (
    <ClerkProvider>
      <UserMemberContext.Provider value={{ isMember, setIsMember }}>
        <html lang="en">
          <body className={inter.className}>
            {children}
            <Toaster />
          </body>
        </html>
      </UserMemberContext.Provider>
    </ClerkProvider>
  );
}
