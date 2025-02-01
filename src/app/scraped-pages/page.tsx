"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import ScrapedDataModal from "@/components/ScrapedDataModal";

type ScrapedPage = {
  url: string;
  status: "detected" | "pending" | "scraped";
  chunks: string[];
};

export default function ScrapedPages() {
  const [scrapedPages, setScrapedPages] = useState<ScrapedPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<ScrapedPage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const companyUrl = searchParams.get("url");

  useEffect(() => {
    if (companyUrl) {
      const baseUrl = new URL(companyUrl).origin;
      const newScrapedPages: ScrapedPage[] = [
        { url: baseUrl, status: "detected", chunks: [] },
        { url: `${baseUrl}/about`, status: "detected", chunks: [] },
        { url: `${baseUrl}/products`, status: "detected", chunks: [] },
        { url: `${baseUrl}/contact`, status: "detected", chunks: [] },
      ];
      setScrapedPages(newScrapedPages);

      // Simulate status changes
      newScrapedPages.forEach((page, index) => {
        setTimeout(() => {
          setScrapedPages((prevPages) => {
            const updatedPages = [...prevPages];
            updatedPages[index] = { ...updatedPages[index], status: "pending" };
            return updatedPages;
          });
        }, (index + 1) * 2000);

        setTimeout(() => {
          setScrapedPages((prevPages) => {
            const updatedPages = [...prevPages];
            updatedPages[index] = {
              ...updatedPages[index],
              status: "scraped",
              chunks: [
                `This is scraped content from ${page.url}`,
                `It contains important information about the page.`,
                `More details can be found here.`,
              ],
            };
            return updatedPages;
          });
        }, (index + 1) * 4000);
      });
    }
  }, [companyUrl]);

  const openModal = (page: ScrapedPage) => {
    setSelectedPage(page);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleContinue = () => {
    router.push("/chatbot-integration");
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
          Scraped Webpages
        </h2>
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
                {page.status === "pending" ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    pending...
                  </span>
                ) : (
                  page.status
                )}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleContinue}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Continue to Integration
          </button>
        </div>
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
