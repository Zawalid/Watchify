import type { Metadata } from "next";
import { Chewy } from "next/font/google";
import Navbar from "@/components/Navbar";
import "../styles/globals.css";
import { Providers } from "./providers";

const chewy = Chewy({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-Grey/900">
      <body
        className={`${chewy.className} dark antialiased h-full  flex-col min-h-dvh  flex bg-[url('/images/Background.svg')] bg-cover bg-no-repeat bg-Grey/900`}
      >
        <Navbar />
        <Providers>
          <main className="container py-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
