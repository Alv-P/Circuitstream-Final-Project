"use client";
import { useEffect, useState } from "react";

type FeedbackResponse = { email: string; feedback: string; date: string };

const ADMIN_PASSWORD = "yourSecretPassword";

export default function AdminFeedbackPage() {
  const [responses, setResponses] = useState<FeedbackResponse[]>([]);
  const [authorized, setAuthorized] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (authorized) {
      fetch("/api/feedback")
        .then((res) => res.json())
        .then(setResponses);
    }
  }, [authorized]);

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[color:var(--background)]">
        <div className="bg-white rounded-xl shadow p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Admin Login</h1>
          <input
            type="password"
            className="w-full p-4 border rounded mb-4 text-base"
            placeholder="Enter admin password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="bg-accent text-white rounded px-6 py-3 font-semibold hover:bg-blue-600 transition text-lg w-full"
            onClick={() => {
              if (input === ADMIN_PASSWORD) setAuthorized(true);
              else alert("Incorrect password.");
            }}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-[color:var(--background)]">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Feedback Responses</h1>
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8">
        {responses.length === 0 ? (
          <div className="text-center text-gray-500">No feedback yet.</div>
        ) : (
          <ul className="space-y-6">
            {responses.map((r, i) => (
              <li key={i} className="border-b pb-4">
                <div className="font-semibold text-gray-700">Email: {r.email}</div>
                <div className="text-gray-700">Feedback: {r.feedback}</div>
                <div className="text-gray-400 text-sm">Date: {new Date(r.date).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}