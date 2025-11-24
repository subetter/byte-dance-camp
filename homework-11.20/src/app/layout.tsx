import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@arco-design/web-react/dist/css/arco.css";
import "./globals.css";
import SuppressReactWarning from "@/components/SuppressReactWarning";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "电商平台",
  description: "电商平台 - 商品列表与详情",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SuppressReactWarning />
        {children}
      </body>
    </html>
  );
}
