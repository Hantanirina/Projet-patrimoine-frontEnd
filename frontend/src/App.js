import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Patrimoine from "./pages/Patrimoine";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/patrimoine" element={<Patrimoine />} />
      </Routes>
    </Router>
  );
}

export default App;
