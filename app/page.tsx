export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-8 bg-[color:var(--background)] text-[color:var(--foreground)] font-sans">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Vet Clinic Locator</h1>
      <div className="flex flex-col lg:flex-row w-full max-w-5xl gap-6 sm:gap-8">
        {/* Left side: Map and controls */}
        <div className="flex flex-col items-center flex-1">
          <div className="w-full h-64 sm:h-80 border rounded bg-gray-100 flex items-center justify-center mb-4 sm:mb-6">
            {/* Map placeholder */}
            <span className="text-gray-500 text-base sm:text-lg">Map</span>
          </div>
          <input
            type="text"
            placeholder="Search location..."
            className="w-full max-w-md px-4 py-2 mb-3 sm:mb-4 border rounded bg-white text-gray-800"
          />
          <div className="flex gap-2 sm:gap-4 mb-3 sm:mb-4">
            <button className="px-3 sm:px-4 py-2 rounded border-2 bg-accent text-background border-accent shadow hover:bg-blue-400 hover:text-white transition">
              1 km
            </button>
            <button className="px-3 sm:px-4 py-2 rounded border-2 bg-accent text-background border-accent shadow hover:bg-blue-400 hover:text-white transition">
              5 km
            </button>
            <button className="px-3 sm:px-4 py-2 rounded border-2 bg-accent text-background border-accent shadow hover:bg-blue-400 hover:text-white transition">
              10 km
            </button>
          </div>
          <button className="px-4 sm:px-6 py-2 rounded border-2 bg-accent text-background border-accent shadow hover:bg-blue-400 hover:text-white transition mb-2 w-full max-w-md">
            Find Clinics
          </button>
        </div>
        {/* Right side: Clinic cards */}
        <div className="flex flex-col flex-1 gap-4 sm:gap-6 mt-6 lg:mt-0">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className="p-3 sm:p-4 border-2 border-accent rounded shadow-lg bg-white/80 flex flex-col gap-2"
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
                className="mt-2 px-3 py-1 rounded border-2 bg-accent text-background border-accent shadow hover:bg-blue-400 hover:text-white transition text-center w-fit"
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
