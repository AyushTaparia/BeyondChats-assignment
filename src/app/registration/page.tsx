"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type React from "react";

export default function Registration() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800/80 backdrop-blur-md p-10 rounded-xl shadow-sm max-w-md w-full border border-gray-700 shadow-white md:m-0 m-5"
      >
        <h2 className="md:text-3xl text-xl font-bold mb-6 text-center text-white">
          {step === 1 ? "User Registration" : "Verify Your Email"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 ? (
            <>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 md:text-base text-sm focus:ring-white"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 md:text-base text-sm focus:ring-white"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 md:text-base text-sm focus:ring-white"
                required
              />
              <button
                type="submit"
                className="w-full bg-gray-800 rounded-full md:text-base text-sm text-white font-semibold py-2 px-4 transition-all duration-300 shadow-md md:hover:shadow-lg border border-gray-500 md:hover:bg-gray-900"
              >
                Next
              </button>

              <div className="text-center text-gray-400">or</div>
              <button
                type="button"
                className="w-full bg-gray-800 text-white font-semibold py-3 px-4 rounded-full transition-all duration-300 shadow-md md:hover:shadow-lg border border-gray-500 md:hover:bg-gray-900 flex items-center justify-center gap-2"
              >
                <svg
                  className="md:w-5 md:h-5 w-4 h-4"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#4285F4"
                    d="M24 9.5c3.87 0 7.16 1.3 9.76 3.66l7.26-7.26C36.82 2.5 30.82 0 24 0 14.63 0 6.51 5.22 2.46 12.78l8.68 6.74C13.06 13.9 18.02 9.5 24 9.5z"
                  />
                  <path
                    fill="#34A853"
                    d="M46.44 24.52c0-1.64-.15-3.22-.44-4.74H24v9.72h12.78c-.57 3.01-2.24 5.55-4.66 7.28l7.28 5.66c4.24-3.92 6.96-9.71 6.96-16.1z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.68 28.18c-.54-1.64-.86-3.38-.86-5.18s.31-3.54.86-5.18l-8.68-6.74C.69 14.72 0 19.22 0 24s.69 9.28 1.99 13.1l8.69-6.92z"
                  />
                  <path
                    fill="#EA4335"
                    d="M24 48c6.56 0 12.06-2.16 16.08-5.86l-7.28-5.66c-2.02 1.34-4.52 2.16-8.08 2.16-5.98 0-10.94-4.4-12.87-10.28l-8.69 6.92C6.51 42.78 14.63 48 24 48z"
                  />
                </svg>
                <span className="md:text-base text-sm">Continue with Google</span>
              </button>
            </>
          ) : (
            <>
              <p className="text-center text-gray-300 md:text-base text-sm">
                A verification code has been sent to{" "}
                <span className="text-blue-400 font-semibold">{email}</span>.
                Please enter it below.
              </p>
              <input
                type="text"
                placeholder="Enter Verification Code"
                className="w-full p-2 rounded-full bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500 text-center tracking-widest md:text-lg text-sm"
                required
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r md:text-base text-sm from-green-500 to-green-700 md:hover:from-green-600 md:hover:to-green-800 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 shadow-md md:hover:shadow-lg"
              >
                Verify & Continue
              </button>
              <p className="text-center text-gray-400 text-sm mt-2">
                Didn&apos;t receive the code?{" "}
                <button
                  type="button"
                  className="text-blue-400 hover:underline"
                  onClick={() => alert("Resend Code clicked")}
                >
                  Resend Code
                </button>
              </p>
            </>
          )}
        </form>
      </motion.div>
    </div>
  );
}
