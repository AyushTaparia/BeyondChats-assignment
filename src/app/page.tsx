import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-12 sm:px-12 md:px-24">
      <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold text-center mb-6 md:mb-8 max-w-2xl">
        Welcome to Chatbot Integration
      </h1>
      <Link
        href="/registration"
        className="bg-blue-600 md:hover:bg-blue-700 text-white font-bold py-2 px-6 sm:px-8 md:px-10 rounded-lg transition duration-300 text-sm sm:text-base"
      >
        Get Started
      </Link>
    </main>
  );
}
