import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "react-bootstrap";
import PossessionsTable from "./PossessionsPage";

const Dashboard = () => {
  const navigate = useNavigate();
  const [possessions, setPossessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  // const [patrimoineValue, setPatrimoineValue] = useState(0);

  useEffect(() => {
    axios
      .get("./data/data.json")
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

  const updatePossession = (index, updatedValue) => {
    const updatedPossessions = possessions.map((possession, i) =>
      i === index ? { ...possession, valeur: updatedValue } : possession
    );
    setPossessions(updatedPossessions);
  };

  const calculatePatrimoineValue = () => {
    // Créez un objet Patrimoine et calculez la valeur
    // const patrimoine = new Patrimoine(null, possessions);
    // const value = patrimoine.getValeur(selectedDate);
    // setPatrimoineValue(value);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <PossessionsTable possessions={possessions} onUpdate={updatePossession} />
      <div>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="border rounded p-2 w-full"
        />
        <Button
          onClick={calculatePatrimoineValue}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Valider
        </Button>
      </div>
      <h2>Valeur du Patrimoine: {patrimoineValue.toFixed(2)}</h2>
    </div>
  );
};

export default Dashboard;
