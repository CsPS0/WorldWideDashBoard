import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { MainLayout } from "./components/MainLayout";
const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "World Wide Dashboard",
  description:
    "Real-time global insights — Steam, YouTube, crypto, currency exchange, music charts, and more.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
