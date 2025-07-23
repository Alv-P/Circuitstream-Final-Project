"use client";

import Link from "next/link";
import { Roboto, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useState } from "react";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [menuOpen, setMenuOpen] = useState(false);

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
            <div className="font-bold text-base sm:text-lg md:text-xl">
              Vet Clinic Locator
            </div>
            <div className="relative">
              <button
                className="px-4 py-2 rounded-full bg-background text-blue-300 border-2 border-accent shadow hover:bg-blue-400 hover:text-white transition text-base font-semibold flex items-center justify-center"
                onClick={() => setMenuOpen((open) => !open)}
                aria-haspopup="true"
                aria-expanded={menuOpen}
              >
                Menu
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg border z-50">
                  <Link
                    href="/"
                    className="block px-4 py-2 text-blue-700 hover:bg-blue-100 transition text-base font-semibold"
                    onClick={() => setMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/feedback"
                    className="block px-4 py-2 text-blue-700 hover:bg-blue-100 transition text-base font-semibold"
                    onClick={() => setMenuOpen(false)}
                  >
                    Feedback
                  </Link>
                  <Link
                    href="/about"
                    className="block px-4 py-2 text-blue-700 hover:bg-blue-100 transition text-base font-semibold"
                    onClick={() => setMenuOpen(false)}
                  >
                    About Us
                  </Link>
                </div>
              )}
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
