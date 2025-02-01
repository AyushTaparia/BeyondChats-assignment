"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import ReactConfetti from "react-confetti";

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
  const [showTestChatbot, setShowTestChatbot] = useState(false);
  const [showIntegrationOptions, setShowIntegrationOptions] = useState(false);
  const [integrationSuccess, setIntegrationSuccess] = useState(false);

  const handleTestChatbot = () => {
    setShowTestChatbot(true);
  };

  const handleIntegrate = () => {
    setShowIntegrationOptions(true);
  };

  const handleTestIntegration = () => {
    // Simulating integration test
    setTimeout(() => {
      setIntegrationSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
      {integrationSuccess && <ReactConfetti />}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-4xl w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Chatbot Integration & Testing
        </h2>
        <div className="space-y-4">
          <button
            onClick={handleTestChatbot}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Test Chatbot
          </button>
          <button
            onClick={handleIntegrate}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Integrate on Your Website
          </button>
        </div>

        {showTestChatbot && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-4 bg-gray-700 rounded"
          >
            <h3 className="text-xl font-semibold mb-4">
              Chatbot Test Environment
            </h3>
            <div className="bg-white text-black p-4 rounded h-64 overflow-y-auto">
              {/* Simulated website content */}
              <p>
                This is a simulation of your website with the chatbot
                integrated.
              </p>
            </div>
            <button className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition duration-300">
              Chatbot not working as intended? Share feedback
            </button>
          </motion.div>
        )}

        {showIntegrationOptions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-4"
          >
            <div className="bg-gray-700 p-4 rounded">
              <h3 className="text-xl font-semibold mb-4">
                Integration Instructions
              </h3>
              <p className="mb-2">
                Copy and paste the following code within the {"<head>"} tag of
                your website:
              </p>
              <SyntaxHighlighter language="javascript" style={docco}>
                {dummyCode}
              </SyntaxHighlighter>
            </div>
            <button
              onClick={() => {
                /* Implement email functionality */
              }}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Email Instructions to Developer
            </button>
            <button
              onClick={handleTestIntegration}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Test Integration
            </button>
          </motion.div>
        )}

        {integrationSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 p-6 bg-green-700 rounded text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Integration Successful!</h3>
            <p className="mb-6">
              Congratulations! Your chatbot has been successfully integrated.
            </p>
            <div className="space-y-4">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                Explore Admin Panel
              </button>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                Start Talking to Your Chatbot
              </button>
              <div className="flex justify-center space-x-4">
                <button className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition duration-300">
                  Share on Twitter
                </button>
                <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition duration-300">
                  Share on Facebook
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                  Share on LinkedIn
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
