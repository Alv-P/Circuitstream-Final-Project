"use client";

import { useState } from "react";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [confirmation, setConfirmation] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setLoading(true);

    // Send to Google Form
    const formData = new FormData();
    formData.append("entry.955442583", `${email} - ${feedback}`);  // Feedback field ID, combined value

    await fetch("https://docs.google.com/forms/d/e/1FAIpQLSex0WvKFTpY3xWhKvO0QYk_KrCB9vrzHNkYYpwscHeKIKTpmw/formResponse", {
      method: "POST",
      mode: "no-cors",
      body: formData,
    });

    setLoading(false);
    setFeedback("");
    setEmail("");
    setConfirmation(true);
    setTimeout(() => setConfirmation(false), 2000); // Show for 2 seconds
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
        <input
          type="email"
          className="w-full p-4 border rounded focus:outline-none focus:ring-2 focus:ring-accent text-base"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {emailError && (
          <div className="text-red-600 font-semibold mb-2">{emailError}</div>
        )}
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
        {confirmation && (
          <div className="text-green-600 font-semibold text-center mt-2">
            Sent!
          </div>
        )}
      </form>
    </div>
  );
}