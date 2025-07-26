"use client";
import { useState } from "react";
import Image from "next/image";

/**
 * AboutPage component
 * Displays information about the creator and the mission of Vet Finder.
 * Uses tabs for section navigation.
 */
export default function AboutPage() {
  // State for tab selection
  const [tab, setTab] = useState<"about" | "mission">("about");

  // Tab button component for clarity and reusability
  function TabButton({
    label,
    active,
    onClick,
    ariaLabel,
  }: {
    label: string;
    active: boolean;
    onClick: () => void;
    ariaLabel: string;
  }) {
    return (
      <button
        className={`px-4 py-2 rounded-full font-bold transition focus:outline-none focus:ring-2 focus:ring-primary ${
          active ? "bg-accent text-background" : "bg-secondary text-navy"
        }`}
        onClick={onClick}
        aria-current={active ? "page" : undefined}
        aria-label={ariaLabel}
      >
        {label}
      </button>
    );
  }

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4 py-12 font-inter animate-fadeIn"
      aria-label="Main Content"
    >
      <section
        className="max-w-xl w-full bg-white rounded-xl shadow-glass p-8 flex flex-col items-center"
        aria-label="About Section"
        style={{
          backgroundColor: "rgba(255,255,255,0.92)",
          color: "#001011", // Force your darkest palette color
        }}
        data-theme={typeof window !== "undefined" ? document.documentElement.getAttribute("data-theme") : undefined}
      >
        {/* Tab Navigation */}
        <nav className="flex gap-4 mb-6" aria-label="About Tabs">
          <TabButton
            label="About Me"
            active={tab === "about"}
            onClick={() => setTab("about")}
            ariaLabel="Show About Me section"
          />
          <TabButton
            label="Mission"
            active={tab === "mission"}
            onClick={() => setTab("mission")}
            ariaLabel="Show Mission section"
          />
        </nav>
        {/* About Section */}
        {tab === "about" && (
          <>
            <div className="flex justify-center items-center w-32 h-32 rounded-full overflow-hidden border-4 border-primary shadow-lg mx-auto mb-4">
              <Image
                src="/Circuitstream-Final-Project-Alvin/images/profile.jpg"
                alt="Profile picture of Paula, Vet Finder creator"
                width={128}
                height={128}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <h1 className="text-3xl font-bold mb-2 text-center" style={{ color: "#001011" }}>
              About Me
            </h1>
            <p className="text-lg mb-4 text-center font-inter" style={{ color: "#001011" }}>
              Hi, I&apos;m Alvin! I&apos;m the creator of Vet Finder, a project
              built to help pet owners easily locate trusted veterinary clinics in
              their area. My passion for animals and technology inspired me to
              develop this app, combining user-friendly design with reliable
              clinic information.
            </p>
            <p className="text-base mb-4 text-center font-inter" style={{ color: "#001011" }}>
              Vet Finder uses real-time location search, interactive maps, and a
              growing database of clinics to make finding pet care simple and
              stress-free. Whether you&apos;re new to the city or just looking
              for the best care for your furry friend, Vet Finder is here to help.
            </p>
            <p className="text-base text-center font-inter" style={{ color: "#001011" }}>
              Thank you for visiting! If you have feedback or suggestions, please
              use the feedback form. I hope Vet Finder makes your pet care
              journey easier.
            </p>
          </>
        )}
        {/* Mission Section */}
        {tab === "mission" && (
          <>
            <h1 className="text-3xl font-bold mb-2 text-center" style={{ color: "#001011" }}>
              Mission
            </h1>
            <p className="text-lg mb-4 text-center font-inter" style={{ color: "#001011" }}>
              My mission is to make pet care accessible and stress-free for
              everyone, everywhere. I believe that every pet deserves the best
              possible care, and I&apos;m committed to providing pet owners with
              the tools and information they need to make that happen.
            </p>
            <p className="text-base mb-4 text-center font-inter" style={{ color: "#001011" }}>
              At Vet Finder, we strive to connect pet owners with trusted
              veterinary clinics that prioritize the health and well-being of
              their furry patients. Our goal is to be the go-to resource for pet
              care, offering a comprehensive database of clinics, real-time
              location search, and interactive maps to simplify the process of
              finding and accessing veterinary services.
            </p>
            <p className="text-base text-center font-inter" style={{ color: "#001011" }}>
              Thank you for choosing Vet Finder. We look forward to being a part
              of your pet care journey.
            </p>
          </>
        )}
      </section>
    </main>
  );
}