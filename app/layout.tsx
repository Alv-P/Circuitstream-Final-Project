"use client";

import Link from "next/link";
import Image from "next/image";
import { Inter, Josefin_Sans, Nunito, Roboto } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <html lang="en">
      <head>
        <title>VetFinder</title>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`
          ${inter.variable} ${josefinSans.variable} ${nunito.variable} ${roboto.variable} antialiased
          bg-background text-foreground min-h-screen font-sans
        `}
      >
        <header className="fixed top-0 left-0 z-50 w-full bg-accent text-background shadow-glass rounded-b-xl font-inter">
          <nav className="max-w-6xl mx-auto flex items-center justify-between px-2 py-2 sm:px-4 sm:py-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/paw-logo.png"
                  alt="VetFinder Paw Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                  priority
                />
                <span className="font-bold text-base sm:text-lg md:text-xl text-background">
                  VetFinder
                </span>
              </Link>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                className="px-3 py-2 rounded-full bg-background text-accent border border-accent shadow button-hover transition font-semibold min-h-[48px]"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                aria-label="Toggle theme"
              >
                {theme === "light" ? "🌙 Dark" : "☀️ Light"}
              </button>
              <div className="relative">
                <button
                  className="px-4 py-2 rounded-full bg-accent text-white border-2 border-accent shadow hover:bg-primary hover:text-white transition text-base font-semibold flex items-center justify-center min-h-[48px] sm:hidden"
                  onClick={() => setMenuOpen((open) => !open)}
                  aria-haspopup="true"
                  aria-expanded={menuOpen}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                <div className="hidden sm:flex gap-2">
                  <Link
                    href="/"
                    className={`px-4 py-2 rounded text-white bg-accent hover:bg-primary transition font-semibold min-h-[48px] ${
                      pathname === "/" ? "bg-primary font-bold" : ""
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    href="/feedback"
                    className={`px-4 py-2 rounded text-white bg-accent hover:bg-primary transition font-semibold min-h-[48px] ${
                      pathname === "/feedback" ? "bg-primary font-bold" : ""
                    }`}
                  >
                    Feedback
                  </Link>
                  <Link
                    href="/about"
                    className={`px-4 py-2 rounded text-white bg-accent hover:bg-primary transition font-semibold min-h-[48px] ${
                      pathname === "/about" ? "bg-primary font-bold" : ""
                    }`}
                  >
                    About Us
                  </Link>
                </div>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-accent rounded shadow-lg border border-accent z-50 flex flex-col sm:hidden">
                    <Link
                      href="/"
                      className={`block px-4 py-3 text-white hover:bg-primary hover:text-white transition text-base font-semibold min-h-[48px] ${
                        pathname === "/" ? "bg-primary font-bold text-white" : ""
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      Home
                    </Link>
                    <Link
                      href="/feedback"
                      className={`block px-4 py-3 text-white hover:bg-primary hover:text-white transition text-base font-semibold min-h-[48px] ${
                        pathname === "/feedback" ? "bg-primary font-bold text-white" : ""
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      Feedback
                    </Link>
                    <Link
                      href="/about"
                      className={`block px-4 py-3 text-white hover:bg-primary hover:text-white transition text-base font-semibold min-h-[48px] ${
                        pathname === "/about" ? "bg-primary font-bold text-white" : ""
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      About Us
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </header>
        <main className="w-full flex-1 flex flex-col justify-center items-center px-4 py-8 pt-32">
          {children}
        </main>
      </body>
    </html>
  );
}
