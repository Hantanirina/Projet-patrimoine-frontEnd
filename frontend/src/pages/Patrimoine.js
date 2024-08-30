import React, { useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";

const Patrimoine = () => {
  const navigate = useNavigate();
  const [referenceDate, setReferenceDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [patrimoineValue, setPatrimoineValue] = useState(0);
  const [chartData, setChartData] = useState(null);

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Valeur",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  const handleValidate = async () => {
    try {
      const response = await axios.get(`/api/patrimoine/range`, {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          day: selectedDay,
        },
      });

      if (response.data && response.data.value !== undefined) {
        setPatrimoineValue(response.data.value);
      } else {
        setPatrimoineValue(0);
      }

      setChartData(response.data.chartData);
    } catch (error) {
      console.error("Error fetching patrimoine data:", error);
      setPatrimoineValue(0);
    }
  };

  const handleClose = () => {
    setEndDate(new Date()); // Met à jour la date de fin avec la date d'aujourd'hui
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Patrimoine</h1>
      <Button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-500 text-white hover:bg-gray-600"
      >
        Retour
      </Button>
      <div className="mb-6">
        <Form.Group className="mb-4">
          <Form.Label>Date de Référence</Form.Label>
          <DatePicker
            selected={referenceDate}
            onChange={(date) => setReferenceDate(date)}
            className="border rounded p-2 w-full"
          />
        </Form.Group>
        <Button
          onClick={handleValidate}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Valider
        </Button>
        <h2 className="mt-4 text-lg">
          Valeur du Patrimoine (aujourd'hui):{" "}
          <span className="font-semibold">
            {patrimoineValue ? patrimoineValue.toFixed(2) : "N/A"}
          </span>
        </h2>
      </div>
      <div className="mb-6">
        <Form.Group className="mb-4">
          <Form.Label>Date Début</Form.Label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="border rounded p-2 w-full"
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Date Fin</Form.Label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="border rounded p-2 w-full"
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Jour</Form.Label>
          <Form.Control
            as="select"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="border rounded p-2"
          >
            <option value="Monday">Lundi</option>
            <option value="Tuesday">Mardi</option>
            <option value="Wednesday">Mercredi</option>
            <option value="Thursday">Jeudi</option>
            <option value="Friday">Vendredi</option>
            <option value="Saturday">Samedi</option>
            <option value="Sunday">Dimanche</option>
          </Form.Control>
        </Form.Group>
        <Button
          onClick={handleClose}
          className="bg-red-500 text-white hover:bg-red-600"
        >
          Clôturer
        </Button>
      </div>
      <div className="mt-6">
        {chartData && <Line data={chartData} options={chartOptions} />}
      </div>
    </div>
  );
};

export default Patrimoine;
