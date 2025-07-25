"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[color:var(--background)] text-[color:var(--foreground)] px-4 py-12">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        {/* Circular white profile slot, no image */}
        <div className="w-32 h-32 mb-6 rounded-full bg-white border-4 border-accent flex items-center justify-center" />
        <h1 className="text-3xl font-bold mb-2 text-accent text-center">About Me</h1>
        <p className="text-lg text-gray-700 mb-4 text-center">
          Hi, I&apos;m Paula! I&apos;m the creator of Vet Finder, a project built to help pet owners easily locate trusted veterinary clinics in their area. My passion for animals and technology inspired me to develop this app, combining user-friendly design with reliable clinic information.
        </p>
        <p className="text-base text-gray-700 mb-4 text-center">
          Vet Finder uses real-time location search, interactive maps, and a growing database of clinics to make finding pet care simple and stress-free. Whether you&apos;re new to the city or just looking for the best care for your furry friend, Vet Finder is here to help.
        </p>
        <p className="text-base text-gray-700 text-center">
          Thank you for visiting! If you have feedback or suggestions, please use the feedback form. I hope Vet Finder makes your pet care journey easier.
        </p>
      </div>
    </div>
  );
}