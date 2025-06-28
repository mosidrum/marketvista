import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer, Layout, Navbar } from "../components";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MarketVista",
  description:
    "An online marketplace where you can discover and buy anything you need, all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pt-20`}
      >
        <SessionProvider>
          <Layout>
            <Navbar />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#100c08",
                  color: "#ffffff",
                },
              }}
              gutter={12}
            />
            {children}
            <Footer />
          </Layout>
        </SessionProvider>
      </body>
    </html>
  );
}
