import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-[color:var(--background)] text-[color:var(--foreground)] font-sans">
      <h1 className="text-3xl font-bold mb-8">Vet Clinic Locator</h1>
      <div className="flex flex-row w-full max-w-5xl gap-8">
        {/* Left side: Map and controls */}
        <div className="flex flex-col items-center flex-1">
          <div className="w-full h-80 border rounded bg-gray-100 flex items-center justify-center mb-6">
            {/* Map placeholder */}
            <span className="text-gray-500 text-lg">Map</span>
          </div>
          <input
            type="text"
            placeholder="Search location..."
            className="w-full max-w-md px-4 py-2 mb-4 border rounded bg-white text-gray-800"
          />
          <div className="flex gap-4 mb-4">
            <button className="px-4 py-2 rounded border-2 border-[color:var(--accent)] bg-[color:var(--accent)] text-[color:var(--background)] shadow hover:bg-blue-400 hover:text-white transition">
              1 km
            </button>
            <button className="px-4 py-2 rounded border-2 border-[color:var(--accent)] bg-[color:var(--accent)] text-[color:var(--background)] shadow hover:bg-blue-400 hover:text-white transition">
              5 km
            </button>
            <button className="px-4 py-2 rounded border-2 border-[color:var(--accent)] bg-[color:var(--accent)] text-[color:var(--background)] shadow hover:bg-blue-400 hover:text-white transition">
              10 km
            </button>
          </div>
          <button className="px-6 py-2 rounded border-2 border-[color:var(--accent)] bg-[color:var(--accent)] text-[color:var(--background)] shadow hover:bg-blue-400 hover:text-white transition mb-2">
            Find Clinics
          </button>
        </div>
        {/* Right side: Clinic cards */}
        <div className="flex flex-col flex-1 gap-6">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className="p-4 border-2 border-[color:var(--accent)] rounded shadow-lg bg-white/80 flex flex-col gap-2"
            >
              <div className="font-bold">Clinic #{num}</div>
              <div>
                <span className="font-semibold">Name:</span> [Clinic Name]
              </div>
              <div>
                <span className="font-semibold">Phone:</span> [Phone Number]
              </div>
              <div>
                <span className="font-semibold">Availability:</span> [Status]
              </div>
              <a
                href="https://clinic-website.example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 px-3 py-1 rounded border-2 border-[color:var(--accent)] bg-[color:var(--accent)] text-[color:var(--background)] shadow hover:bg-blue-400 hover:text-white transition text-center w-fit"
              >
                More Details
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
