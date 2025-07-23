"use client";

export default function FeedbackPage() {
    return (
        <section className="w-full max-w-3xl mx-auto mt-16 mb-16 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Feedback</h2>
            <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    alert("Thank you for your feedback!");
                }}
            >
                <label className="font-semibold text-gray-800">
                    Your Feedback:
                    <textarea
                        className="w-full mt-2 p-2 border rounded"
                        rows={4}
                        required
                    />
                </label>
                <button
                    type="submit"
                    className="px-4 py-2 rounded bg-accent text-background border-2 border-accent shadow hover:bg-blue-400 hover:text-white transition font-semibold"
                >
                    Submit
                </button>
            </form>
        </section>
    );
}