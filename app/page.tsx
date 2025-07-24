"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Cardio } from "ldrs/react";
import "ldrs/react/Cardio.css";

// ErrorBoundary component for catching rendering errors
function ErrorBoundary({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

// Explicit Clinic type for strict typing
type Clinic = {
    id: number;
    name: string;
    phone: string;
    availability: string;
    website: string;
    location: [number, number];
    distance: number;
};

// Example static clinic data
const clinics: Clinic[] = [
    {
        id: 1,
        name: "Downtown Toronto Vet",
        phone: "416-555-1234",
        availability: "Open",
        website: "https://downtowntorontovet.example.com",
        location: [43.6532, -79.3832],
        distance: 0,
    },
    {
        id: 2,
        name: "Vancouver Animal Hospital",
        phone: "604-555-5678",
        availability: "Closed",
        website: "https://vancouveranimalhospital.example.com",
        location: [49.2827, -123.1207],
        distance: 0,
    },
    {
        id: 3,
        name: "Montreal Pet Clinic",
        phone: "514-555-8765",
        availability: "Open",
        website: "https://montrealpetclinic.example.com",
        location: [45.5017, -73.5673],
        distance: 0,
    },
    {
        id: 4,
        name: "Calgary Vet Centre",
        phone: "403-555-4321",
        availability: "Open",
        website: "https://calgaryvetcentre.example.com",
        location: [51.0447, -114.0719],
        distance: 0,
    },
];

// Helper: Calculate distance between two lat/lng points (Haversine formula)
function getDistanceKm(
    [lat1, lon1]: [number, number],
    [lat2, lon2]: [number, number]
) {
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Dynamically import MapComponent to avoid SSR issues
const DynamicMapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

export default function Home() {
    const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
    const [radius, setRadius] = useState<number>(1);
    const [searchInput, setSearchInput] = useState("");
    const [searchError, setSearchError] = useState("");
    const [filteredClinics, setFilteredClinics] = useState<Clinic[]>([]);
    const [isOffline, setIsOffline] = useState(false);
    const [loadingAction, setLoadingAction] = useState<null | "search" | "findClinics" | "geolocation">(null);

    useEffect(() => {
        setIsOffline(!navigator.onLine);
        function handleOnline() {
            setIsOffline(false);
        }
        function handleOffline() {
            setIsOffline(true);
        }
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);
        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    // Geocode location using Nominatim API
    async function handleLocationSearch(e: React.FormEvent) {
        e.preventDefault();
        setLoadingAction("search");
        setSearchError("");
        setFilteredClinics([]);
        if (!navigator.onLine) {
            setSearchError("You are offline. Please check your internet connection.");
            setLoadingAction(null);
            return;
        }
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    searchInput
                )}`
            );
            if (res.status === 429) {
                setSearchError("Too many requests. Please wait and try again.");
                setLoadingAction(null);
                return;
            }
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await res.json();
            if (data && data.length > 0) {
                const lat = parseFloat(data[0].lat);
                const lon = parseFloat(data[0].lon);
                setSelectedLocation([lat, lon]);
            } else {
                setSearchError("Location not found.");
            }
        } catch {
            setSearchError(
                navigator.onLine
                    ? "Error searching location. Please try again."
                    : "You are offline. Please check your internet connection."
            );
        }
        setLoadingAction(null);
    }

    // Helper: Reverse geocode coordinates to address
    async function reverseGeocode(lat: number, lon: number) {
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
            );
            if (!res.ok) return "";
            const data = await res.json();
            return data.display_name || "";
        } catch {
            return "";
        }
    }

    // Filter clinics by location and radius
    function handleFindClinics() {
        setLoadingAction("findClinics");
        if (
            !selectedLocation ||
            !Array.isArray(selectedLocation) ||
            selectedLocation.length !== 2
        ) {
            return;
        }
        const loc: [number, number] = [selectedLocation[0], selectedLocation[1]];
        const nearby = clinics
            .map((clinic) => ({
                ...clinic,
                distance: getDistanceKm(loc, clinic.location),
            }))
            .filter((clinic) => clinic.distance <= radius)
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 3);
        setFilteredClinics(nearby);
        setLoadingAction(null);
    }

    return (
        <ErrorBoundary>
            {/* Main App Content */}
            <div className="w-full min-h-screen p-2 sm:p-4 md:p-8 bg-[color:var(--background)] text-[color:var(--foreground)] font-sans flex flex-col items-center">
                <div className="w-full max-w-3xl flex flex-col items-center mx-auto">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-4 md:mb-6 text-center">
                        Clinic Locator
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl text-center mb-4 text-accent2">
                        Find veterinary clinics near you
                    </p>
                    {isOffline && (
                        <div
                            className="w-full bg-red-100 text-red-700 text-center py-2 mb-2 rounded"
                            aria-live="polite"
                        >
                            You are offline. Some features may not work.
                        </div>
                    )}
                    <div className="w-full">
                        <div className="w-full h-64 xs:h-80 sm:h-96 md:h-[32rem] lg:h-[36rem] border rounded bg-gray-100 flex items-center justify-center mb-4 sm:mb-6 z-0 relative">
                            <DynamicMapComponent
                                onLocationSelect={async (lat, lng) => {
                                    setSelectedLocation([lat, lng]);
                                    const address = await reverseGeocode(lat, lng);
                                    if (address) setSearchInput(address);
                                }}
                                selectedLocation={selectedLocation}
                                clinicMarkers={filteredClinics}
                            />
                        </div>
                        <form
                            onSubmit={handleLocationSearch}
                            className="w-full flex flex-col sm:flex-row gap-2 mb-2 sm:mb-4"
                        >
                            <input
                                type="text"
                                placeholder="Search location..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="w-full px-4 py-3 rounded border bg-white text-gray-800 text-base"
                                aria-label="Search location"
                            />
                            <button
                                type="submit"
                                className="px-4 py-3 rounded border-2 bg-accent text-background border-accent shadow hover:bg-blue-400 hover:text-white transition flex items-center justify-center text-base"
                                disabled={loadingAction !== null || !searchInput}
                                aria-label="Search"
                            >
                                {loadingAction === "search" ? (
                                    <span className="flex items-center gap-2">
                                        <Cardio size="24" stroke="3" speed="1.2" color="black" />
                                        Searching...
                                    </span>
                                ) : (
                                    "Search"
                                )}
                            </button>
                        </form>
                        <button
                            type="button"
                            className="w-full px-4 py-3 rounded border-2 bg-green-500 text-white border-green-500 shadow hover:bg-green-600 transition flex items-center justify-center text-base mb-2"
                            onClick={() => {
                                setLoadingAction("geolocation");
                                if (!navigator.geolocation) {
                                    setSearchError("Geolocation is not supported by your browser.");
                                    setLoadingAction(null);
                                    return;
                                }
                                navigator.geolocation.getCurrentPosition(
                                    (pos) => {
                                        setSelectedLocation([pos.coords.latitude, pos.coords.longitude]);
                                        setSearchError("");
                                        setLoadingAction(null);
                                    },
                                    () => {
                                        setSearchError("Unable to retrieve your location.");
                                        setLoadingAction(null);
                                    }
                                );
                            }}
                            aria-label="Use My Location"
                            disabled={loadingAction !== null}
                        >
                            {loadingAction === "geolocation" ? (
                                <span className="flex items-center gap-2">
                                    <Cardio size="24" stroke="3" speed="1.2" color="black" />
                                    Locating...
                                </span>
                            ) : (
                                "Use My Location"
                            )}
                        </button>
                        {/* Reserve space for error message to prevent layout shift */}
                        <div style={{ minHeight: "2rem" }}>
                            {searchError && (
                                <div className="text-red-600 font-semibold mb-2" aria-live="polite">
                                    {searchError}
                                </div>
                            )}
                        </div>
                        <div className="flex justify-center gap-2 sm:gap-4 mb-2 sm:mb-4">
                            {[1, 5, 10].map((km) => (
                                <button
                                    key={km}
                                    className={`px-4 py-2 sm:px-6 sm:py-2 rounded border-2 bg-accent border-accent shadow hover:bg-blue-400 hover:text-white transition text-base ${
                                        radius === km
                                            ? "ring-2 ring-blue-400 text-white"
                                            : "text-background"
                                    }`}
                                    onClick={() => setRadius(km)}
                                    aria-label={`Filter clinics within ${km} km`}
                                    disabled={loadingAction !== null}
                                >
                                    {km} km
                                </button>
                            ))}
                        </div>
                        <button
                            className="px-4 py-3 sm:px-6 sm:py-2 rounded border-2 bg-accent text-background border-accent shadow hover:bg-blue-400 hover:text-white transition mb-2 w-full flex items-center justify-center text-base"
                            disabled={!selectedLocation || loadingAction !== null}
                            onClick={() => {
                                setLoadingAction("findClinics");
                                handleFindClinics();
                                setLoadingAction(null);
                            }}
                            aria-label="Find Clinics"
                        >
                            {loadingAction === "findClinics" ? (
                                <span className="flex items-center gap-2">
                                    <Cardio size="24" stroke="3" speed="1.2" color="black" />
                                    Loading...
                                </span>
                            ) : (
                                "Find Clinics"
                            )}
                        </button>
                    </div>
                    {filteredClinics.length > 0 && (
                        <div className="w-full mt-4 flex flex-col gap-4">
                            {filteredClinics.map((clinic) => (
                                <div
                                    key={clinic.id}
                                    className="border rounded-lg p-4 bg-white shadow flex flex-col sm:flex-row items-start sm:items-center justify-between animate-fadeInCard"
                                >
                                    <div>
                                        <h2 className="font-bold text-lg mb-1 text-gray-700 card-details">{clinic.name}</h2>
                                        <div className="text-gray-700 mb-1">Phone: {clinic.phone}</div>
                                        <div className="text-gray-700 mb-1">Availability: {clinic.availability}</div>
                                        <a
                                            href={clinic.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 underline"
                                        >
                                            More Details
                                        </a>
                                    </div>
                                    <div className="mt-2 sm:mt-0 sm:ml-4 text-sm text-accent3 card-meta">
                                        {clinic.distance.toFixed(2)} km away
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </ErrorBoundary>
    );
}
