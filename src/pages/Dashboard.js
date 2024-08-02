import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="bg-blue-600 text-white w-full p-4 shadow-md">
        <h1 className="text-3xl font-semibold text-center">Dashboard</h1>
      </header>

      <main className="flex-1 p-6 flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/campaigns"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center text-center"
          >
           
            <h2 className="text-2xl font-semibold text-gray-800">Create Campaign</h2>
          </Link>

          <Link
            to="/get-campaigns"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center text-center"
          >

            <h2 className="text-2xl font-semibold text-gray-800">Get all Campaigns</h2>
          </Link>
          <Link
            to="/make-call"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center text-center"
          >

            <h2 className="text-2xl font-semibold text-gray-800">Make Call</h2>
          </Link>

          <Link
            to="/call-handling"
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center text-center"
          >
            <div className="text-green-600">
              <svg
                className="w-16 h-16 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.003 13.003H2a10 10 0 1010.003 10.003A10.003 10.003 0 002.003 13.003zM9.003 17.003l1.5 1.5a1 1 0 001.414 0l6-6a1 1 0 00-1.414-1.414l-5.25 5.25a.25.25 0 01-.354 0L9.003 16.003a1 1 0 00-1.414 1.414l1.414 1.414-.001-.001z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Call Handling
            </h2>
          </Link>
        </div>
      </main>

      <footer className="bg-gray-800 text-white w-full p-4 text-center">
        <p>© 2024 Toingg. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
