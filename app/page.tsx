"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// Explicit Clinic type for strict typing
type Clinic = {
	id: number;
	name: string;
	phone: string;
	availability: string;
	website: string;
	location: [number, number];
	distance: number; // <-- Make this required
};

// Example static clinic data
const clinics: Clinic[] = [
	{
		id: 1,
		name: "Downtown Toronto Vet",
		phone: "416-555-1234",
		availability: "Open",
		website: "https://downtowntorontovet.example.com",
		location: [43.6532, -79.3832], // Toronto, ON
		distance: 0, // <-- Add distance value
	},
	{
		id: 2,
		name: "Vancouver Animal Hospital",
		phone: "604-555-5678",
		availability: "Closed",
		website: "https://vancouveranimalhospital.example.com",
		location: [49.2827, -123.1207], // Vancouver, BC
		distance: 0, // <-- Add distance value
	},
	{
		id: 3,
		name: "Montreal Pet Clinic",
		phone: "514-555-8765",
		availability: "Open",
		website: "https://montrealpetclinic.example.com",
		location: [45.5017, -73.5673], // Montreal, QC
		distance: 0, // <-- Add distance value
	},
	{
		id: 4,
		name: "Calgary Vet Centre",
		phone: "403-555-4321",
		availability: "Open",
		website: "https://calgaryvetcentre.example.com",
		location: [51.0447, -114.0719], // Calgary, AB
		distance: 0, // <-- Add distance value
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
const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

export default function Home() {
	const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(
		null
	);
	const [radius, setRadius] = useState<number>(1);
	const [searchInput, setSearchInput] = useState("");
	const [searchLoading, setSearchLoading] = useState(false);
	const [searchError, setSearchError] = useState("");
	const [filteredClinics, setFilteredClinics] = useState<Clinic[]>([]);
	const [isOffline, setIsOffline] = useState(false);

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
		setSearchLoading(true);
		setSearchError("");
		setFilteredClinics([]);
		if (!navigator.onLine) {
			setSearchError("You are offline. Please check your internet connection.");
			setSearchLoading(false);
			return;
		}
		try {
			const res = await fetch(
				`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
					searchInput
				)}`
			);
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
		} catch (err) {
			setSearchError(
				navigator.onLine
					? "Error searching location. Please try again."
					: "You are offline. Please check your internet connection."
			);
		}
		setSearchLoading(false);
	}

	// Filter clinics by location and radius
	function handleFindClinics() {
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
	}

	return (
		<div className="flex flex-col items-center min-h-screen p-2 sm:p-4 md:p-8 bg-[color:var(--background)] text-[color:var(--foreground)] font-sans">
			<h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-center">
				Vet Clinic Locator
			</h1>
			{isOffline && (
				<div className="w-full bg-red-100 text-red-700 text-center py-2 mb-2 rounded">
					You are offline. Some features may not work.
				</div>
			)}
			<div className="flex flex-col lg:flex-row w-full max-w-6xl gap-6">
				{/* Left side: Map and controls */}
				<div className="flex flex-col items-center flex-1 min-w-0">
					<div className="w-full h-64 xs:h-80 sm:h-96 md:h-[32rem] lg:h-[36rem] border rounded bg-gray-100 flex items-center justify-center mb-4 sm:mb-6">
						<MapComponent
							onLocationSelect={(lat, lng) => setSelectedLocation([lat, lng])}
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
							disabled={searchLoading || !searchInput}
							aria-label="Search"
						>
							{searchLoading ? (
								<span className="flex items-center gap-2">
									<svg
										className="animate-spin h-5 w-5 text-blue-500"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
											fill="none"
										/>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8v8z"
										/>
									</svg>
									Searching...
								</span>
							) : (
								"Search"
							)}
						</button>
						<button
							type="button"
							className="px-4 py-3 rounded border-2 bg-green-500 text-white border-green-500 shadow hover:bg-green-600 transition flex items-center justify-center text-base"
							onClick={() => {
								if (!navigator.geolocation) {
									setSearchError("Geolocation is not supported by your browser.");
									return;
								}
								setSearchLoading(true);
								navigator.geolocation.getCurrentPosition(
									(pos) => {
										setSelectedLocation([pos.coords.latitude, pos.coords.longitude]);
										setSearchLoading(false);
										setSearchError("");
									},
									() => {
										setSearchError("Unable to retrieve your location.");
										setSearchLoading(false);
									}
								);
							}}
							aria-label="Use My Location"
						>
							Use My Location
						</button>
					</form>
					{searchError && (
						<div className="text-red-600 font-semibold mb-2">{searchError}</div>
					)}
					<div className="flex gap-2 sm:gap-4 mb-2 sm:mb-4">
						{[1, 5, 10].map((km) => (
							<button
								key={km}
								className={`px-4 py-2 sm:px-6 sm:py-2 rounded border-2 bg-accent text-background border-accent shadow hover:bg-blue-400 hover:text-white transition text-base ${
									radius === km ? "ring-2 ring-blue-400" : ""
								}`}
								onClick={() => setRadius(km)}
								aria-label={`Filter clinics within ${km} km`}
							>
								{km} km
							</button>
						))}
					</div>
					<button
						className="px-4 py-3 sm:px-6 sm:py-2 rounded border-2 bg-accent text-background border-accent shadow hover:bg-blue-400 hover:text-white transition mb-2 w-full flex items-center justify-center text-base"
						disabled={!selectedLocation || searchLoading}
						onClick={handleFindClinics}
						aria-label="Find Clinics"
					>
						{searchLoading ? (
							<span className="flex items-center gap-2">
								<svg
									className="animate-spin h-5 w-5 text-blue-500"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
										fill="none"
									/>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8v8z"
									/>
								</svg>
								Loading...
							</span>
						) : (
							"Find Clinics"
						)}
					</button>
				</div>
				{/* Right side: Clinic cards */}
				<div className="flex flex-row lg:flex-col flex-1 min-w-0 gap-4 sm:gap-6 overflow-x-auto pb-2">
					{filteredClinics.length === 0 && !searchLoading && (
						<div className="text-gray-500 text-center font-semibold text-base sm:text-lg min-w-[250px]">
							No clinics found. Please search and select a location, then click &quot;Find Clinics&quot;.
						</div>
					)}
					{filteredClinics.map((clinic) => {
						const availabilityColor =
							clinic.availability.toLowerCase() === "open"
								? "text-green-600 font-bold"
								: clinic.availability.toLowerCase() === "closed"
								? "text-red-600 font-bold"
								: "text-gray-700 font-bold";
						return (
							<div
								key={clinic.id}
								className="p-4 sm:p-6 border-2 border-accent rounded shadow-lg bg-white/80 flex flex-col gap-2 w-full text-gray-900"
							>
								<div className="font-bold text-lg sm:text-xl">{clinic.name}</div>
								<div>
									<span className="font-semibold text-base">Phone:</span>{" "}
									<span className="font-bold">{clinic.phone}</span>
								</div>
								<div>
									<span className="font-semibold text-base">Availability:</span>{" "}
									<span className={availabilityColor}>
										{clinic.availability}
									</span>
								</div>
								<div>
									<span className="font-semibold text-base">Distance:</span>{" "}
									<span className="font-bold">
										{clinic.distance.toFixed(2)} km
									</span>
								</div>
								<a
									href={clinic.website}
									target="_blank"
									rel="noopener noreferrer"
									className="mt-2 px-4 py-2 rounded border-2 bg-accent text-background border-accent shadow hover:bg-blue-400 hover:text-white transition text-center w-fit text-base"
									aria-label={`More details about ${clinic.name}`}
								>
									More Details
								</a>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
