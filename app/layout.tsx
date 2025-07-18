import type { Metadata } from "next";
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
          min-h-screen flex flex-col items-center
        `}
      >
        <main className="w-full max-w-6xl flex-1 flex flex-col justify-center items-center px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
