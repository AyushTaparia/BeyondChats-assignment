"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ScrapedDataModal from "@/components/ScrapedDataModal";

// Dummy data for scraped webpages
const scrapedPages = [
  {
    url: "https://example.com",
    status: "scraped",
    chunks: [
      "This is the main page of Example.com.",
      "It contains information about our products and services.",
      "Contact us for more information about our offerings.",
    ],
  },
  {
    url: "https://example.com/about",
    status: "scraped",
    chunks: [
      "Learn about our company history and mission.",
      "Meet our team of experienced professionals.",
      "Discover our core values and commitment to excellence.",
    ],
  },
  {
    url: "https://example.com/products",
    status: "pending",
    chunks: [],
  },
  {
    url: "https://example.com/contact",
    status: "detected",
    chunks: [],
  },
];

export default function SetupOrganisation() {
  const [companyName, setCompanyName] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [selectedPage, setSelectedPage] = useState<
    (typeof scrapedPages)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/chatbot-integration");
  };

  const handleUrlBlur = () => {
    // Simulating auto-fetch of meta description
    if (companyUrl) {
      setTimeout(() => {
        setCompanyDescription(
          "This is an auto-fetched meta description for " + companyUrl
        );
      }, 1000);
    }
  };

  const openModal = (page: (typeof scrapedPages)[0]) => {
    setSelectedPage(page);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-4xl w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Setup Organisation
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Company Name"
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <input
            type="url"
            placeholder="Company Website URL"
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
            value={companyUrl}
            onChange={(e) => setCompanyUrl(e.target.value)}
            onBlur={handleUrlBlur}
          />
          <textarea
            placeholder="Company Description"
            className="w-full p-2 rounded bg-gray-700 text-white h-24"
            required
            value={companyDescription}
            onChange={(e) => setCompanyDescription(e.target.value)}
          />
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Scraped Webpages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scrapedPages.map((page) => (
                <div
                  key={page.url}
                  className={`p-4 rounded cursor-pointer transition duration-300 ${
                    page.status === "scraped"
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-700 opacity-50"
                  }`}
                  onClick={() => page.status === "scraped" && openModal(page)}
                >
                  <p className="font-medium">{page.url}</p>
                  <p className="text-sm text-gray-400 capitalize">
                    {page.status}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between mt-8">
            <button
              type="button"
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Wait for Training
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Continue to Integration
            </button>
          </div>
        </form>
      </motion.div>
      {selectedPage && (
        <ScrapedDataModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          url={selectedPage.url}
          chunks={selectedPage.chunks}
        />
      )}
    </div>
  );
}
