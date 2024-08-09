import React from "react";
import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Providers from "./providers";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "asozial",
  description: "A social app for asozial devs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${kanit.className}`}>
      <body className="h-100vh w-100vw flex flex-col justify-between">
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
