import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solace Candidate Assignment",
  description: "Show us what you got",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background`}>
        <header className="bg-primary text-white py-4 shadow-lg">
          <div className="max-w-full mx-auto px-8 flex justify-between items-center">
            <div className="flex items-center">
              <Image
                src="/solace.svg"
                alt="Solace Logo"
                width={115}
                height={32}
                className="mr-3"
              />
            </div>
            <div className="hidden md:flex items-center space-x-4 text-white">
              Navigate your health journey with a Solace Advocate
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-primary-dark text-white py-6">
          <div className="max-w-full mx-auto px-8 text-center">
            <p className="text-sm">
              © {new Date().getFullYear()} Solace Advocates Platform. All
              rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
