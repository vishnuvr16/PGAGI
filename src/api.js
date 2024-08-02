import axios from "axios";

const API_BASE_URL = "https://www.toingg.com/api/v3";
const YOUR_ACCESS_TOKEN =
  "tg_c81b9389-f018-4bf0-b2ef-38f6438e0d40-0QhgA605dwPwo7wn1Jz_eg";
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token) => {
  console.log(token);
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// * get supported languages
export const getSupportedLanguages = async () => {
  try {
    const response = await axios.get(
      "https://www.toingg.com/api/v3/get_supported_languages",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${YOUR_ACCESS_TOKEN}`,
        },
      }
    );
    return response.data.result.languages;
  } catch (error) {
    console.log(error);
  }
};

// ! get supported vocies
export const getSupportedVoices = async () => {
  try {
    const response = await axios.get(
      "https://www.toingg.com/api/v3/get_supported_voices",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${YOUR_ACCESS_TOKEN}`,
        },
      }
    );
    return response.data.result.voice;
  } catch (error) {
    console.log(error);
  }
};

// *get campaigns
export const getCampaigns = async () => {
  try {
    const response = await axios.get(
      "https://www.toingg.com/api/v3/get_campaigns",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${YOUR_ACCESS_TOKEN}`,
        },
      }
    );
    console.log("response",response.data.result);
    return response.data.result;
  } catch (error) {
    console.log(error);
  }
};

// Function to get a campaign by ID
export const getCampaignById = async (id) => {
  try {
    const campaigns = await getCampaigns(); // Fetch all campaigns
    // Transform the data object into an array of objects
    const transformData = (data) => {
      return Object.keys(data).map(id => ({ id, ...data[id] }));
    };

    const data = transformData(campaigns);
    const campaign = data.find(c => c.id === id); // Filter by ID
    if (!campaign) {
      throw new Error('Campaign not found');
    }
    return campaign;
  } catch (error) {
    console.error('Error fetching campaign by ID:', error);
    throw error;
  }
};


// !create campaign
export const createCampaign = async (data) => {
  try {
    console.log("data", data);
    const response = await axios.post(
      "https://www.toingg.com/api/v3/create_campaign",
      data,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${YOUR_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("campaign created", response);
  } catch (error) {
    console.log(error);
  }
};

// * update campaign
export const updateCampaign = async (data) => {
  try {
    const response = await axios.post(
      'https://www.toingg.com/api/v3/update_campaign',
      {
        campaignModelData: {
          title: data.title,
          voice: data.voice,
          language: data.language,
          script: data.script,
          purpose: data.purpose,
          knowledgeBase: data.knowledgeBase,
          calendar: data.calendar || '10Am to 10Pm IST',
          firstLine: data.firstLine || '',
          tone: data.tone || '',
          postCallAnalysis: data.postCallAnalysis || false,
          postCallAnalysisSchema: data.postCallAnalysisSchema || {},
        },
        campId: data.id
      },
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${YOUR_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating campaign:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// !make call
export const makeCall = async (data) => {
  try {
    const response = await axios.post(
      "https://www.toingg.com/api/v3/make_call",
      data,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${YOUR_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("response", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// *get call status
export const getCallStatus = async (callID) => {
  const callId = callID;
  try {
    const response = await axios.get(
      `https://www.toingg.com/api/v3/call_status?callId=${callId}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${YOUR_ACCESS_TOKEN}`,
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

// !get transcription
export const getTranscription = async (callID) => {
  const callId = callID;
  try {
    const response = await axios.get(
      `https://www.toingg.com/api/v3/get_transcription?callId=${callId}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${YOUR_ACCESS_TOKEN}`,
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

// *get post call analysis
export const getPostCallAnalysis = async (callID) => {
  try {
    const callId = callID;
    const response = await axios.get(
      `https://www.toingg.com/api/v3/get_post_call_analysis?callId=${callId}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${YOUR_ACCESS_TOKEN}`,
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
