import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCampaigns } from "../api";

const GetCampaigns = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await getCampaigns();
        setCampaigns(response || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  // Transform the data object into an array of objects
  const transformData = (data) => {
    return Object.keys(data).map(id => ({ id, ...data[id] }));
  };

  const data = transformData(campaigns);

  const handleUpdateClick = (id) => {
    navigate(`/update-campaign/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 relative">
      {/* Back Arrow */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
        Campaigns List
      </h1>

      {/* Loading and Error States */}
      {loading ? (
        <div className="text-center text-gray-600">Loading campaigns...</div>
      ) : error ? (
        <div className="text-center text-red-600">Error: {error}</div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Available Campaigns
          </h2>
          {campaigns.length === 0 ? (
            <div className="text-center text-gray-600">
              No campaigns available
            </div>
          ) : (
            <ul className="space-y-4">
              {data.map((campaign) => (
                <li
                  key={campaign.id}
                  className="p-4 border border-gray-300 rounded-md hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {campaign.title}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    <strong>Language:</strong> {campaign.language}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Voice:</strong> {campaign.voice}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Knowledge Base:</strong> {campaign.knowledgeBase}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Script:</strong> {campaign.script}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Purpose:</strong> {campaign.purpose}
                  </p>
                  
                  {/* Update Button */}
                  <button
                    onClick={() => handleUpdateClick(campaign.id)}
                    className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                  >
                    Update
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default GetCampaigns;
