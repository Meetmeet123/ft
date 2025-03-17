"use client";

import { useState } from "react";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 text-center font-bold text-lg fixed top-0 left-0 right-0 h-[65px] z-10">
        My Next.js App
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 mt-[65px]">
        {/* Sidebar Space Placeholder (assuming sidebar is 250px wide) */}
        <div className="w-[250px] flex-shrink-0 hidden md:block" />

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center p-6">
          <button
            onClick={() => setIsOpen(true)}
            className="btn btn-primary px-6 py-2 bg-blue-600 text-white rounded-md"
          >
            Show Slide Over
          </button>
        </main>
      </div>

      {/* Slide Over */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
          <div className="bg-white w-80 h-full shadow-lg p-5 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-600 text-2xl"
            >
              ×
            </button>
            <h2 className="text-lg font-semibold mb-4">Broadcast Message</h2>
            <div className="space-y-4">
              <input
                className="w-full border p-2 rounded"
                type="text"
                placeholder="From"
              />
              <input
                className="w-full border p-2 rounded"
                type="text"
                placeholder="To"
              />
              <input
                className="w-full border p-2 rounded"
                type="text"
                placeholder="Subject"
              />
              <textarea
                className="w-full border p-2 rounded"
                placeholder="Message"
              ></textarea>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded">
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        © {new Date().getFullYear()} My Next.js App
      </footer>
    </div>
  );
}