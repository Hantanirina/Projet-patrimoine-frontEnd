// src/App.js

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PossessionPage from "./components/PossessionsTable";
import PatrimoinePage from "./components/PatrimoinePage";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/possession" />} />
          <Route path="/possession" element={<PossessionPage />} />
          <Route path="/patrimoine" element={<PatrimoinePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
