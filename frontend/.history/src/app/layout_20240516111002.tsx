import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { getGlobalData, getGlobalPageMetadata } from "@/data/loader";
import { Header } from "@/components/custom/Header";
import { Footer } from "@/components/custom/Footer";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getGlobalPageMetadata();
  console.log(metadata);

  return {
    title: metadata?.title,
    description: metadata?.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalData = await getGlobalData();
  // console.log(globalData);
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Header data={globalData.header} />
        <div>{children}</div>
        <Footer data={globalData.footer} />
      </body>
    </html>
  );
}
