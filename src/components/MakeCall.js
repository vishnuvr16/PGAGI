import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import axios from 'axios';

const MakeCall = () => {
  const [file, setFile] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [campID, setCampID] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const YOUR_ACCESS_TOKEN = "tg_c81b9389-f018-4bf0-b2ef-38f6438e0d40-0QhgA605dwPwo7wn1Jz_eg";

  useEffect(() => {
    console.log("Contacts:", contacts);
  }, [contacts]);

    // Fetch campaigns on mount
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('https://www.toingg.com/api/v3/get_campaigns', {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${YOUR_ACCESS_TOKEN}`,
          },
        });
        const campaigns = await response.json();
        const data1 = campaigns.result;
        const transformData = (data) => {
          return Object.keys(data).map(id => ({ id, ...data[id] }));
        };
      
        const data = transformData(data1);
        console.log("Fetched Campaigns:", data);
        if (data && data.length > 0) {
          setCampID(data[0].id); // Assuming 'id' is the field for campID
        }
        console.log("id",campID)
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        setError('Error fetching campaigns.');
      }
    };

    


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null); // Clear any existing error when a new file is selected
  };

  const handleFileUpload = () => {
    if (!file) {
      setError('Please select a file.');
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        console.log("Parsed Results:", results.data); // Log the parsed data
        setContacts(results.data);
      },
      error: (err) => {
        setError('Error parsing file.');
      },
    });
  };

  const initiateCalls = async () => { 
    fetchCampaigns();
    console.log(campID)
    if (!campID) {
      setError('Campaign ID is missing.');
      return;
    }

    if (contacts.length === 0) {
      setError('No contacts to call.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await Promise.all(
        contacts.map(async (contact) => {
          const { name, phoneNumber } = contact;
          console.log(`Making call to: ${name} - ${phoneNumber}`); // Log each contact being called

          // Send a POST request to initiate the call
          const response = await axios.post(
            'https://www.toingg.com/api/v3/make_call',
            { name, phoneNumber, campID },
            {
              headers: {
                accept: 'application/json',
                Authorization: `Bearer ${YOUR_ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
              },
            }
          );
          console.log("response",response)
        })
      );
      alert('Calls initiated successfully!');
    } catch (err) {
      setError('Error initiating calls.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg my-10">
      <h1 className="text-2xl font-bold mb-4">Upload Contacts and Make Calls</h1>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Upload CSV File
        </label>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="mb-4"
        />
        <button
          onClick={handleFileUpload}
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 mb-4"
        >
          Upload CSV
        </button>
      </div>

      {error && <div className="text-red-600 mb-4">{error}</div>}
      {contacts.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Parsed Contacts</h2>
          <ul>
            {contacts.map((contact, index) => (
              <li key={index} className="mb-2">
                {contact.name} - {contact.phoneNumber}
              </li>
            ))}
          </ul>
          <button
            onClick={initiateCalls}
            className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          >
            Make Calls
          </button>
        </div>
      )}
      {loading && <div className="text-center py-4">Initiating calls...</div>}
    </div>
  );
};

export default MakeCall;
