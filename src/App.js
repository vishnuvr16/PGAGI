import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CallHandling from "./components/CallHandling";
import MakeCall from "./components/MakeCall";
import GetCampaigns from "./pages/GetCampaign";
import UpdateCampaign from "./components/UpdateCampaign";
import CreateCampaign from "./components/CampaignForm";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          console.log(loggedIn);
          {loggedIn ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/campaigns" element={<CreateCampaign />} />
              <Route path="/get-campaigns" element={<GetCampaigns />} />
              <Route path="/update-campaign/:id" element={<UpdateCampaign />} />
              <Route path="/make-call" element={<MakeCall />} />
              <Route path="/call-handling" element={<CallHandling />} />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            <Route path="/" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
