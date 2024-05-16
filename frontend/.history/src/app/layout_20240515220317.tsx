import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getGlobalData } from "@/data/loader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalData = await getGlobalData();
  console.log(globalData);

  return (
    <html lang='en'>
      <body className={inter.className}>
        <div>{children}</div>
      </body>
    </html>
  );
}
