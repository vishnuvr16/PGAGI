import React, { useEffect, useState } from "react";
import {
  getSupportedLanguages,
  getSupportedVoices,
  createCampaign,
} from "../api";
import "../index.css";
import { useNavigate } from "react-router-dom";

const CreateCampaign = () => {
  const [languages, setLanguages] = useState([]);
  const [voices, setVoices] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    voice: "",
    language: "",
    knowledgeBase: "",
    script: "",
    purpose: "",
    calendar: "10Am to 10Pm IST",
    firstLine: "",
    tone: "",
    postCallAnalysis: false,
    postCallAnalysisSchema: {},
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLanguagesAndVoices = async () => {
      try {
        const langResponse = await getSupportedLanguages();
        const voiceResponse = await getSupportedVoices();
        setLanguages(langResponse || []);
        setVoices(voiceResponse || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchLanguagesAndVoices();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("formData", formData);
      await createCampaign(formData);
      alert("Campign created successfully")
      setFormData("")
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white my-5 shadow-lg rounded-lg">
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
      <h2 className="font-bold text-3xl text-blue flex justify-center my-10">Create Campaign</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Campaign Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 p-2 border-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Language
          </label>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 border-2 p-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Language</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Voice
          </label>
          <select
            name="voice"
            value={formData.voice}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 p-2 border-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Voice</option>
            {voices.map((voice) => (
              <option key={voice.id} value={voice.id}>
                {voice.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Knowledge Base URL
          </label>
          <input
            type="text"
            name="knowledgeBase"
            value={formData.knowledgeBase}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 p-2 border-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Script
          </label>
          <input
            type="text"
            name="script"
            value={formData.script}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 p-2 border-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Campaign
        </button>
      </form>
    </div>
  );
};

export default CreateCampaign;
