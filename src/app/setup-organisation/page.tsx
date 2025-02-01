"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type React from "react";

export default function SetupOrganisation() {
  const [companyName, setCompanyName] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/scraped-pages?url=${encodeURIComponent(companyUrl)}`);
  };

  const handleUrlBlur = () => {
    if (companyUrl) {
      setLoading(true);
      setCompanyDescription(""); // Clear previous description
      setTimeout(() => {
        setLoading(false);
        setCompanyDescription(
          `This is an auto-fetched meta description for ${companyUrl}`
        );
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800/80 backdrop-blur-md p-10 rounded-xl shadow-sm max-w-4xl w-full border border-gray-700 shadow-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Setup Organisation
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Company Name"
            className="w-full py-2 px-4 rounded-full bg-gray-700 text-white outline-none focus:ring-2 focus:ring-gray-500"
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <input
            type="url"
            placeholder="Company Website URL"
            className="w-full py-2 px-4 rounded-full bg-gray-700 text-white outline-none focus:ring-2 focus:ring-gray-500"
            required
            value={companyUrl}
            onChange={(e) => setCompanyUrl(e.target.value)}
            onBlur={handleUrlBlur}
          />
          <div className="relative">
            <textarea
              placeholder="Company Description"
              className="w-full py-2 px-4 rounded-xl bg-gray-700 text-white h-24 outline-none focus:ring-2 focus:ring-gray-500"
              required
              value={companyDescription}
              onChange={(e) => setCompanyDescription(e.target.value)}
              disabled={loading}
            />
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75 rounded-xl">
                <svg
                  className="animate-spin h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            )}
          </div>
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="w-1/3 bg-gray-800 rounded-full text-white font-semibold py-2 px-4 transition-all duration-300 shadow-md hover:shadow-lg border border-gray-500 hover:bg-gray-900"
            >
              Start Scraping →
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
