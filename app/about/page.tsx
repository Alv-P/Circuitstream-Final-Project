"use client";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)] font-sans p-4">
            <header className="w-full bg-accent text-background shadow mb-4">
                <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
                    <div className="font-bold text-lg sm:text-xl">
                        Vet Clinic Locator
                    </div>
                    <div className="flex gap-2 sm:gap-4">
                        <Link href="/" className="px-4 py-2 rounded bg-background text-accent border-2 border-accent shadow hover:bg-blue-400 hover:text-white transition text-base font-semibold">Home</Link>
                        <Link href="/feedback" className="px-4 py-2 rounded bg-background text-accent border-2 border-accent shadow hover:bg-blue-400 hover:text-white transition text-base font-semibold">Feedback</Link>
                        <Link href="/about" className="px-4 py-2 rounded bg-background text-accent border-2 border-accent shadow hover:bg-blue-400 hover:text-white transition text-base font-semibold">About Us</Link>
                    </div>
                </nav>
            </header>
            <section className="w-full max-w-3xl mx-auto mb-16 p-6 bg-white rounded shadow">
                <h2 className="text-2xl font-bold mb-4 text-accent">About Us</h2>
                <p className="text-base text-gray-700">
                    Vet Clinic Locator is a project to help pet owners easily find veterinary clinics near them.
                    Our mission is to make pet care accessible and convenient for everyone.
                    This app uses open data and mapping technology to provide accurate, up-to-date information.
                </p>
            </section>
        </div>
    );
}