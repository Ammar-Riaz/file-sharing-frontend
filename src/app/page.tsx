import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
          Welcome to FileShare App
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Your production-grade file sharing solution
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Link href="/auth/signup">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:cursor-pointer shadow-xl hover:scale-105 transition-all duration-300 ease-out overflow-hidden">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </Link>
          <button className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-semibold shadow-lg hover:cursor-pointer shadow-xl hover:scale-105 transition-all duration-300 ease-out border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
