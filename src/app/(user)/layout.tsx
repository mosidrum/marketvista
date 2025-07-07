import type { Metadata } from "next";
import { Faustina } from "next/font/google";
import { Footer, Layout, Navbar } from "@/app";
import { Toaster } from "react-hot-toast";
import "../globals.css";

const faustina = Faustina({ subsets: ["latin"] });

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
        className={faustina.className}
      >
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
      </body>
    </html>
  );
}
