import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

// Enregistrement des composants Chart.js nécessaires
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const PatrimoinePage = () => {
  const [referenceDate, setReferenceDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState("Lundi");
  const [chartData, setChartData] = useState(null);

  const handleValidate = () => {
    console.log("Jour sélectionné:", selectedDay);
    // Exemple de données pour le graphique
    setChartData({
      labels: ["Jan", "Fév", "Mar", "Avr", "Mai"],
      datasets: [
        {
          label: "Valeur du Patrimoine",
          data: [65, 59, 80, 81, 56],
          fill: false,
          borderColor: "#007bff",
          tension: 0.1,
        },
      ],
    });
  };

  return (
    <div>
      <h1>Page Patrimoine</h1>
      <Form>
        <Form.Group controlId="referenceDate">
          <Form.Label>Date de Référence</Form.Label>
          <DatePicker
            selected={referenceDate}
            onChange={(date) => setReferenceDate(date)}
            dateFormat="dd/MM/yyyy"
          />
        </Form.Group>

        <Form.Group controlId="startDate">
          <Form.Label>Date de Début</Form.Label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
          />
        </Form.Group>

        <Form.Group controlId="endDate">
          <Form.Label>Date de Fin</Form.Label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
          />
        </Form.Group>

        <Form.Group controlId="selectDay">
          <Form.Label>Jour de la Semaine</Form.Label>
          <Form.Control
            as="select"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            <option value="Lundi">Lundi</option>
            <option value="Mardi">Mardi</option>
            <option value="Mercredi">Mercredi</option>
            <option value="Jeudi">Jeudi</option>
            <option value="Vendredi">Vendredi</option>
            <option value="Samedi">Samedi</option>
            <option value="Dimanche">Dimanche</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" onClick={handleValidate}>
          Valider
        </Button>
      </Form>

      {chartData && (
        <div>
          <h2>Graphique de Patrimoine</h2>
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
};

export default PatrimoinePage;
