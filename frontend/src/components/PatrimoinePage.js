import React, { useState } from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap"; // Ajout des composants Row, Col et Container
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "./PatrimoinePage.css"; // Ajout d'un fichier CSS personnalisé pour la réactivité

// Enregistrement des composants Chart.js nécessaires
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const generateRandomData = (numPoints) => {
  return Array.from({ length: numPoints }, (_, i) => ({
    x: `Mois ${i + 1}`,
    y: Math.floor(Math.random() * 100),
  }));
};

const PatrimoinePage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState("Lundi");
  const [chartData, setChartData] = useState(null);

  const handleValidate = () => {
    console.log("Jour sélectionné:", selectedDay);
    // Exemple de données pour le graphique en fonction des dates
    setChartData({
      labels: ["Jan", "Fév", "Mar", "Avr", "Mai"],
      datasets: [
        {
          label: "Valeur du Patrimoine",
          data: generateRandomData(5),
          fill: false,
          borderColor: "#007bff",
          tension: 0.1,
        },
      ],
    });
  };

  return (
    <Container fluid className="patrimoine-page">
      <h1 className="text-center my-4">Page Patrimoine</h1>
      <Form>
        <Row className="mb-3">
          <Col xs={12} md={4}>
            <Form.Group controlId="startDate">
              <Form.Label>Date de Début</Form.Label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                className="form-control"
              />
            </Form.Group>
          </Col>

          <Col xs={12} md={4}>
            <Form.Group controlId="endDate">
              <Form.Label>Date de Fin</Form.Label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd/MM/yyyy"
                className="form-control"
              />
            </Form.Group>
          </Col>

          <Col xs={12} md={4}>
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
          </Col>
        </Row>

        <Button variant="primary" onClick={handleValidate} className="mb-4">
          Valider
        </Button>
      </Form>

      {chartData && (
        <div className="chart-container">
          <h2 className="text-center">Graphique de Patrimoine</h2>
          <Line data={chartData} options={{ responsive: true }} />
        </div>
      )}
    </Container>
  );
};

export default PatrimoinePage;
