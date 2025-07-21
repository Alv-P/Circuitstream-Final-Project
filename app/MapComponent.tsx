"use client";

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon for Next.js
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function MapCenter({ selectedLocation }: { selectedLocation: [number, number] | null }) {
  const map = useMapEvents({});
  useEffect(() => {
    if (selectedLocation) {
      map.setView(selectedLocation, 13);
    }
  }, [selectedLocation, map]);
  return null;
}

function MapClickHandler({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function MapComponent({
  onLocationSelect,
  selectedLocation,
  clinicMarkers = [],
}: {
  onLocationSelect: (lat: number, lng: number) => void;
  selectedLocation: [number, number] | null;
  clinicMarkers?: Array<{
    id: number;
    name: string;
    location: [number, number];
    phone: string;
    availability: string;
    website: string;
    distance: number;
  }>;
}) {
  const defaultPosition: [number, number] = [51.0447, -114.0719]; // Calgary as default

  return (
    <MapContainer
      center={selectedLocation || defaultPosition}
      zoom={13}
      style={{ width: "100%", height: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapCenter selectedLocation={selectedLocation} />
      <MapClickHandler onLocationSelect={onLocationSelect} />
      {selectedLocation && (
        <Marker position={selectedLocation} icon={markerIcon} />
      )}
      {clinicMarkers.map((clinic) => {
        // Use a style object instead of cssText string to fix the error
        const availabilityStyle =
          clinic.availability.toLowerCase() === "open"
            ? { color: "green", fontWeight: "bold" }
            : clinic.availability.toLowerCase() === "closed"
            ? { color: "red", fontWeight: "bold" }
            : { color: "#555", fontWeight: "bold" };
        return (
          <Marker key={clinic.id} position={clinic.location} icon={markerIcon}>
            <Popup>
              <div>
                <strong>{clinic.name}</strong>
                <br />
                Phone: {clinic.phone}
                <br />
                Availability:{" "}
                <span style={availabilityStyle}>
                  {clinic.availability}
                </span>
                <br />
                Distance: {clinic.distance.toFixed(2)} km
                <br />
                <a
                  href={clinic.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  More Details
                </a>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}