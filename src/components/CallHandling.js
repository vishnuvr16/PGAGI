import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  makeCall,
  getCallStatus,
  getTranscription,
  getPostCallAnalysis,
} from "../api";

const CallHandling = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [callDetails, setCallDetails] = useState({
    name: "",
    phoneNumber: "",
    campID: "",
  });
  const [callId, setCallId] = useState("");
  const [status, setStatus] = useState("");
  const [transcription, setTranscription] = useState("");
  const [analysis, setAnalysis] = useState("");

  const handleCallDetailsChange = (e) => {
    setCallDetails({
      ...callDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleMakeCall = async (e) => {
    e.preventDefault();
    const response = await makeCall(callDetails);
    console.log("response.data.callId", response.data.callId);
    setCallId(response.data.callId);
  };

  const handleGetStatus = async () => {
    const response = await getCallStatus(callId);
    setStatus(response.data.status);
  };

  const handleGetTranscription = async () => {
    const response = await getTranscription(callId);
    setTranscription(response.data.transcription);
  };

  const handleGetAnalysis = async () => {
    const response = await getPostCallAnalysis(callId);
    setAnalysis(response.data.analysis);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
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
        Call Handling
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Call Details Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Make a Call
          </h2>
          <form onSubmit={handleMakeCall}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={callDetails.name}
                onChange={handleCallDetailsChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Phone Number:</label>
              <input
                type="text"
                name="phoneNumber"
                value={callDetails.phoneNumber}
                onChange={handleCallDetailsChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Camp ID:</label>
              <input
                type="text"
                name="campID"
                value={callDetails.campID}
                onChange={handleCallDetailsChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Make Call
            </button>
          </form>
        </div>

        {/* Call Status, Transcription, and Analysis */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Call Information
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Call ID:</label>
            <input
              type="text"
              value={callId}
              onChange={(e) => setCallId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex space-x-4 mb-4">
            <button
              onClick={handleGetStatus}
              className="flex-1 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Get Status
            </button>
            <button
              onClick={handleGetTranscription}
              className="flex-1 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Get Transcription
            </button>
            <button
              onClick={handleGetAnalysis}
              className="flex-1 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Get Analysis
            </button>
          </div>
          {status && (
            <div className="bg-gray-50 p-4 rounded-md shadow-sm mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Status:</h3>
              <p className="text-gray-600">{status}</p>
            </div>
          )}
          {transcription && (
            <div className="bg-gray-50 p-4 rounded-md shadow-sm mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Transcription:
              </h3>
              <p className="text-gray-600">{transcription}</p>
            </div>
          )}
          {analysis && (
            <div className="bg-gray-50 p-4 rounded-md shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700">
                Post Call Analysis:
              </h3>
              <p className="text-gray-600">{analysis}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallHandling;
