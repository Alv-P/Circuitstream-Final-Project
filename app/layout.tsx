import type { Metadata } from "next";
import Link from "next/link";
import { Roboto, Geist_Mono } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vet Clinic Locator",
  description: "Find veterinary clinics near you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${roboto.variable} ${geistMono.variable} antialiased
          bg-[color:var(--background)] text-[color:var(--foreground)]
          min-h-screen font-sans
        `}
      >
        {/* Header always full width and sticky above content */}
        <header className="fixed top-0 left-0 z-50 w-full bg-accent text-background shadow rounded-b-xl">
          <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
            <div className="font-bold text-lg sm:text-xl">
              Vet Clinic Locator
            </div>
            <div className="flex gap-2 sm:gap-4">
              <Link
                href="/"
                className="px-4 py-2 rounded-full bg-background text-blue-300 border-2 border-accent shadow hover:bg-blue-400 hover:text-white transition text-base font-semibold"
              >
                Home
              </Link>
              <Link
                href="/feedback"
                className="px-4 py-2 rounded-full bg-background text-blue-300 border-2 border-accent shadow hover:bg-blue-400 hover:text-white transition text-base font-semibold"
              >
                Feedback
              </Link>
              <Link
                href="/about"
                className="px-4 py-2 rounded-full bg-background text-blue-300 border-2 border-accent shadow hover:bg-blue-400 hover:text-white transition text-base font-semibold"
              >
                About Us
              </Link>
            </div>
          </nav>
        </header>
        {/* Main content with enough top padding for header */}
        <main className="w-full flex-1 flex flex-col justify-center items-center px-4 py-8 pt-32">
          {children}
        </main>
      </body>
    </html>
  );
}
