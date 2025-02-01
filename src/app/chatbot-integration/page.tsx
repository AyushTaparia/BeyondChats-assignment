"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import ReactConfetti from "react-confetti";
import { useRouter } from "next/navigation";

SyntaxHighlighter.registerLanguage("javascript", js);

const dummyCode = `
<script>
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-XXXX');
</script>
`;

export default function ChatbotIntegration() {
  const [currentSection, setCurrentSection] = useState<
    "main" | "test" | "integrate" | "success"
  >("main");
  const [integrationSuccess, setIntegrationSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (integrationSuccess) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [integrationSuccess]);

  const handleTestChatbot = () => {
    setCurrentSection("test");
  };

  const handleIntegrate = () => {
    setCurrentSection("integrate");
  };

  const handleTestIntegration = () => {
    // Simulating integration test
    setTimeout(() => {
      setIntegrationSuccess(true);
      setCurrentSection("success");
    }, 2000);
  };

  const handleBack = () => {
    setCurrentSection("main");
  };

  const handleSetup = () => {
    router.push("/setup-organisation");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {integrationSuccess && (
        <ReactConfetti width={window.innerWidth} height={window.innerHeight} />
      )}{" "}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800/80 backdrop-blur-md p-10 rounded-xl shadow-sm max-w-3xl w-full border border-gray-700 shadow-white md:m-0 m-5"
      >
        <AnimatePresence mode="wait">
          {currentSection === "main" && (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="md:text-2xl text-base font-bold mb-6 text-center">
                Chatbot Integration & Testing
              </h2>
              <div className="md:space-x-4 space-y-4 flex md:flex-row flex-col items-center justify-center">
                <button
                  onClick={handleTestChatbot}
                  className="w-full bg-gray-800 rounded-full text-white font-semibold py-2 px-4 transition-all duration-300 shadow-md md:hover:shadow-lg border border-gray-500 md:hover:bg-gray-900"
                >
                  Test Chatbot
                </button>
                <button
                  onClick={handleIntegrate}
                  className="w-full bg-white rounded-full text-gray-800 font-semibold py-2 px-4 transition-all duration-300 shadow-md md:hover:shadow-lg border border-gray-500 md:hover:bg-zinc-300"
                >
                  Integrate on Your Website
                </button>
              </div>
            </motion.div>
          )}

          {currentSection === "test" && (
            <motion.div
              key="test"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handleBack}
                  className="text-white font-bold transition duration-300 md:px-4 md:py-2 md:bg-gray-600 rounded-full md:hover:bg-gray-700 space-x-2"
                >
                  <span>&larr;</span>{" "}
                  <span className="md:block hidden"> Back</span>
                </button>
                <h3 className="md:text-xl font-semibold">
                  Chatbot Test Environment
                </h3>
                <p></p>
              </div>
              <div className="bg-white text-black p-4 rounded h-64 overflow-y-auto">
                <p>
                  This is a simulation of your website with the chatbot
                  integrated.
                </p>
              </div>
              <button className="w-full bg-yellow-600 md:hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition duration-300 md:text-base text-sm">
                Chatbot not working as intended?{" "}
                <span className="underline">Share feedback</span>
              </button>
            </motion.div>
          )}

          {currentSection === "integrate" && (
            <motion.div
              key="integrate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handleBack}
                  className="text-white font-bold transition duration-300 md:px-4 md:py-2 md:bg-gray-600 rounded-full md:hover:bg-gray-700 space-x-2"
                >
                  <span>&larr;</span>{" "}
                  <span className="md:block hidden"> Back</span>
                </button>
                <h3 className="md:text-xl font-semibold">
                  Integration Instructions
                </h3>
                <p> </p>
              </div>
              <p className="mb-2 md:text-base text-sm">
                Copy and paste the following code within the {"<head>"} tag of
                your website:
              </p>
              <SyntaxHighlighter language="javascript" style={docco}>
                {dummyCode}
              </SyntaxHighlighter>
              <div className="flex md:flex-row flex-col items-center justify-center gap-4">
                <button
                  onClick={() => {
                    /* Implement email functionality */
                  }}
                  className="w-full bg-white rounded-full text-gray-800 font-semibold py-2 px-4 transition-all duration-300 shadow-md md:hover:shadow-lg border border-gray-500 md:hover:bg-zinc-300"
                >
                  Email Instructions to Developer
                </button>
                <button
                  onClick={handleTestIntegration}
                  className="w-full bg-gray-800 rounded-full text-white font-semibold py-2 px-4 transition-all duration-300 shadow-md md:hover:shadow-lg border border-gray-500 md:hover:bg-gray-900"
                >
                  Test Integration -&gt;
                </button>
              </div>
            </motion.div>
          )}

          {currentSection === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 text-center px-4 sm:px-6 md:px-12"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-4">
                Integration Successful!
              </h3>
              <p className="text-sm sm:text-base mb-6">
                Congratulations! Your chatbot has been successfully integrated.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                  Explore Admin Panel
                </button>
                <button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                  Start Talking to Your Chatbot
                </button>
              </div>

              {/* Social Media Buttons */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
                <button className="w-full sm:w-auto bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition duration-300">
                  Share on Twitter
                </button>
                <button className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition duration-300">
                  Share on Facebook
                </button>
                <button className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                  Share on LinkedIn
                </button>
              </div>

              {/* Back to Setup Button */}
              <button
                onClick={handleSetup}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Back to Setup Organisation
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
