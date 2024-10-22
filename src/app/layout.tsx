import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lama Dev Social Media App",
  description: "Social media app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ToastProvider>
            <div className="w-full bg-white px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
              <Navbar />
            </div>
            <div className="bg-slate-100 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
              {children}
            </div>
          </ToastProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}