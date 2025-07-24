"use client";

import { useState } from "react";

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feedback }),
    });
    setLoading(false);
    if (res.ok) {
      setFeedback("");
    }
  }

  return (
    <div className="min-h-screen p-8 bg-[color:var(--background)]">
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-[500px] bg-white rounded-xl shadow p-8 flex flex-col gap-6 mt-12"
      >
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          Feedback
        </h1>
        <textarea
          className="w-full p-4 border rounded focus:outline-none focus:ring-2 focus:ring-accent text-base"
          rows={6}
          placeholder="Your feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-accent text-white rounded px-6 py-3 font-semibold hover:bg-blue-600 transition text-lg"
          disabled={loading}
        >
          {loading ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
}