import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSupportedLanguages, getSupportedVoices, getCampaignById, updateCampaign } from "../api";
import "../index.css";

const UpdateCampaign = () => {
  const { id } = useParams(); // Get campaign ID from URL
  const navigate = useNavigate(); // Hook for navigation
  const [languages, setLanguages] = useState([]);
  const [voices, setVoices] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    language: "",
    voice: "",
    knowledgeBase: "",
    script: "",
    purpose: "",
    calendar: "10Am to 10Pm IST",
    firstLine: "",
    tone: "",
    postCallAnalysis: false,
    postCallAnalysisSchema: {},
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    const fetchCampaignData = async () => {
      try {
        const campaignResponse = await getCampaignById(id);
        setFormData(campaignResponse || {});
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguagesAndVoices();
    fetchCampaignData();
  }, [id]);

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
      await updateCampaign(formData);
      navigate('/get-campaigns'); // Redirect after update
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return <div className="text-center py-4 text-red-600">Error: {error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form fields here */}
        <div className="flex flex-col">
          <label htmlFor="title" className="font-medium mb-1">
            Campaign Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title || ""}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="language" className="font-medium mb-1">
            Language:
          </label>
          <select
            name="language"
            id="language"
            value={formData.language || ""}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Language</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="voice" className="font-medium mb-1">
            Voice:
          </label>
          <select
            name="voice"
            id="voice"
            value={formData.voice || ""}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Voice</option>
            {voices.map((voice) => (
              <option key={voice.id} value={voice.id}>
                {voice.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="knowledgeBase" className="font-medium mb-1">
            Knowledge Base URL:
          </label>
          <input
            type="text"
            name="knowledgeBase"
            id="knowledgeBase"
            value={formData.knowledgeBase || ""}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="script" className="font-medium mb-1">
            Script:
          </label>
          <input
            type="text"
            name="script"
            id="script"
            value={formData.script || ""}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Update Campaign
        </button>
      </form>
    </div>
  );
};

export default UpdateCampaign;
