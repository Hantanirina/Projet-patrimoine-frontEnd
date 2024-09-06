// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import PossessionsTable from "../src/components/PossessionsTable";

// const App = () => {
//   return (
//     <div>
//       <PossessionsTable />
//     </div>
//   );
// };

// export default App;
// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PossessionPage from "./components/PossessionsTable"; // Assumez que vous avez déjà ce composant
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
