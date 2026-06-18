import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { MenuProvider } from "@/components/MenuContext";
import Navbar from "@/components/Navbar";

const display = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "The Hive | Parties, Coffee & Ice Cream in Rockingham, NC",
  description:
    "The Hive Recreation Center — a private indoor party playground, plus Nectar coffee & ice cream bar. Book your next celebration in Rockingham, NC.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body">
        <MenuProvider>
          <Navbar />
          {children}
        </MenuProvider>
      </body>
    </html>
  );
}
