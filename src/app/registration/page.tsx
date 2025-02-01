"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type React from "react"; // Added import for React

export default function Registration() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      router.push("/setup-organisation");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          User Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 ? (
            <>
              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Next
              </button>
              <div className="text-center">
                <span className="text-gray-400">or</span>
              </div>
              <button
                type="button"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Continue with Google
              </button>
            </>
          ) : (
            <>
              <p className="text-center mb-4">
                Enter the verification code sent to {email}
              </p>
              <input
                type="text"
                placeholder="Verification Code"
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              />
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Verify and Continue
              </button>
            </>
          )}
        </form>
      </motion.div>
    </div>
  );
}
