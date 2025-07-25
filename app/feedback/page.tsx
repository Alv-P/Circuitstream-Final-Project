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
    <div className="min-h-screen p-8 bg-background text-foreground font-inter animate-fadeIn">
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-xl shadow-glass p-4 sm:p-6 md:p-8 flex flex-col gap-6 mt-8 font-inter"
      >
        <h1 className="text-4xl font-extrabold mb-4 text-center text-foreground drop-shadow-lg tracking-wide font-josefin">
          VetFinder Feedback
        </h1>
        <p className="text-lg text-center mb-6 text-primary font-nunito">
          Help us improve VetFinder! Share your experience or suggestions below.
        </p>
        <input
          type="email"
          className="bg-white border border-accent text-foreground px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary text-base font-inter"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {emailError && (
          <div className="text-primary font-semibold text-center mb-2 bg-secondary rounded p-2 shadow-glass">
            {emailError}
          </div>
        )}
        <textarea
          className="bg-white border border-accent text-foreground px-4 py-2 rounded w-full resize-none focus:outline-none focus:ring-2 focus:ring-primary text-base font-inter"
          rows={6}
          placeholder="Your feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-primary text-white rounded px-6 py-3 font-semibold hover:bg-accent button-hover transition text-lg font-inter"
          disabled={loading}
        >
          {loading ? "Sending..." : "Submit"}
        </button>
        {confirmation && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-glass p-6 text-center border-2 border-accent">
              <div className="text-green-600 font-bold text-xl mb-2">Sent!</div>
              <div className="text-navy">Thank you for your feedback.</div>
            </div>
          </div>
        )}
      </form>
      <div className="mt-8">
        <blockquote className="text-center italic font-nunito text-foreground dark:text-background drop-shadow-lg">
          “VetFinder helped me find a great clinic for my dog in minutes!”<br />
          <span className="text-sm font-bold text-foreground dark:text-background drop-shadow">
            — Happy Pet Owner
          </span>
        </blockquote>
      </div>
    </div>
  );
}