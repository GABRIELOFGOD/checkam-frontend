import type { Metadata } from "next";
import { Manrope, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/providers/user-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Manrope({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// import {
//   ClerkProvider
// } from '@clerk/nextjs';

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Checkam! - Youth Centre for Legislative Accountability.",
  description: "Bridging the Youth–Government Gap with Legislative Transparency",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://checkam.org",
    siteName: "Checkam!",
    images: [
      {
        url: "https://checkam.org/og-image.JPG",
        width: 1200,
        height: 630,
        alt: "Checkam! - Youth Centre for Legislative Accountability.",
      },
    ],
    title: "Checkam! - Youth Centre for Legislative Accountability.",
    description: "Bridging the Youth–Government Gap with Legislative Transparency",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ClerkProvider>
    <UserProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          <Toaster position="top-right" />
        </body>
      </html>
    </UserProvider>  
    // </ClerkProvider>
  );
}
