"use client";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)] font-sans p-4">
            <section className="w-full max-w-3xl mx-auto mb-16 p-6 bg-white rounded shadow">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">About Us</h2>
                <p className="text-base text-gray-700">
                    Vet Clinic Locator is a project to help pet owners easily find veterinary clinics near them.
                    Our mission is to make pet care accessible and convenient for everyone.
                    This app uses open data and mapping technology to provide accurate, up-to-date information.
                </p>
            </section>
        </div>
    );
}