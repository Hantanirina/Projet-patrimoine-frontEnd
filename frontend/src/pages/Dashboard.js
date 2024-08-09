import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "react-bootstrap";
import PossessionsTable from "../components/PossessionsTable";

const Dashboard = () => {
  const [possessions, setPossessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [patrimoineValue, setPatrimoineValue] = useState(0);

  useEffect(() => {
    axios
      .get("/data/data.json")
      .then((response) => {
        const patrimoineData = response.data.find(
          (item) => item.model === "Patrimoine"
        );
        if (patrimoineData) {
          setPossessions(patrimoineData.data.possessions);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const getValeur = (possession, date) => {
    if (possession.dateFin && new Date(possession.dateFin) < date) {
      return 0;
    }
    if (possession.tauxAmortissement) {
      const startDate = new Date(possession.dateDebut);
      const age = Math.floor((date - startDate) / (1000 * 60 * 60 * 24 * 365));
      return Math.max(
        0,
        possession.valeur -
          possession.valeur * (possession.tauxAmortissement / 100) * age
      );
    }
    if (possession.valeurConstante !== undefined) {
      return possession.valeurConstante;
    }
    return possession.valeur;
  };

  const calculatePatrimoineValue = () => {
    const value = possessions.reduce(
      (acc, possession) => acc + getValeur(possession, selectedDate),
      0
    );
    setPatrimoineValue(value);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <PossessionsTable possessions={possessions} />
      <div>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
        />
        <Button onClick={calculatePatrimoineValue}>Valider</Button>
      </div>
      <h2>Valeur du Patrimoine: {patrimoineValue.toFixed(2)}</h2>
    </div>
  );
};

export default Dashboard;
