import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Alert } from "react-bootstrap";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";

const PossessionTable = () => {
  const [possessions, setPossessions] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newPossession, setNewPossession] = useState({
    id: uuidv4(),
    libelle: "",
    valeur: "",
    dateDebut: "",
    tauxAmortissement: "",
  });

  const [editPossession, setEditPossession] = useState({
    id: "",
    libelle: "",
    valeur: "",
    dateDebut: "",
    tauxAmortissement: "",
    dateFin: "",
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calculatedValue, setCalculatedValue] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchPossessions();
  }, []);

  const fetchPossessions = async () => {
    try {
      const response = await axios.get(
        "https://projet-patrimoine-backend.onrender.com/possession"
      );
      if (response.data.status === "success") {
        setPossessions(response.data.data);
      } else {
        setError("Erreur lors du chargement des possessions.");
      }
    } catch (error) {
      setError("Erreur lors du chargement des possessions.");
    }
  };

  const handleAddPossession = async () => {
    if (
      !newPossession.libelle ||
      !newPossession.valeur ||
      !newPossession.dateDebut ||
      !newPossession.tauxAmortissement
    ) {
      setError("Veuillez remplir tous les champs.");
      setSuccess("");
      return;
    }

    if (isNaN(parseFloat(newPossession.tauxAmortissement))) {
      setError("Le taux d'amortissement doit être un nombre.");
      setSuccess("");
      return;
    }

    try {
      await axios.post(
        "https://projet-patrimoine-backend.onrender.com/possession",
        {
          ...newPossession,
          tauxAmortissement: parseFloat(newPossession.tauxAmortissement),
        }
      );
      setSuccess("Possession ajoutée avec succès!");
      setError("");
      fetchPossessions();
      setShowAddModal(false);
      setNewPossession({
        id: uuidv4(),
        libelle: "",
        valeur: "",
        dateDebut: "",
        tauxAmortissement: "",
      });
    } catch (error) {
      setError("Erreur lors de l'ajout de la possession.");
      setSuccess("");
    }
  };

  const handleUpdatePossession = async () => {
    if (!editPossession.libelle || !editPossession.tauxAmortissement) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    if (isNaN(parseFloat(editPossession.tauxAmortissement))) {
      setError("Le taux d'amortissement doit être un nombre.");
      setSuccess("");
      return;
    }

    try {
      await axios.put(
        `https://projet-patrimoine-backend.onrender.com/possession/${editPossession.id}`,
        {
          ...editPossession,
          tauxAmortissement: parseFloat(editPossession.tauxAmortissement),
        }
      );
      setSuccess("Possession mise à jour avec succès!");
      setError("");
      fetchPossessions();
      setShowEditModal(false);
      setEditPossession({
        id: "",
        libelle: "",
        valeur: "",
        dateDebut: "",
        tauxAmortissement: "",
        dateFin: "",
      });
    } catch (error) {
      setError("Erreur lors de la mise à jour de la possession.");
      setSuccess("");
    }
  };

  const handleClosePossession = async (id) => {
    try {
      await axios.put(
        `https://projet-patrimoine-backend.onrender.com/possession/${id}/close`
      );
      setSuccess("Possession clôturée avec succès!");
      setError("");
      fetchPossessions();
    } catch (error) {
      setError("Erreur lors de la clôture de la possession.");
      setSuccess("");
    }
  };

  const handleCalculateValue = async () => {
    try {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      const response = await axios.get(
        `https://projet-patrimoine-backend.onrender.com/possession/value/${formattedDate}`
      );
      setCalculatedValue(response.data.data.totalValue);
      setError("");
    } catch (error) {
      setError("Erreur lors du calcul de la valeur.");
      setCalculatedValue(null);
    }
  };

  return (
    <div className="container mt-5 d-flex flex-column min-vh-100">
      <h1 className="mb-4">Liste des Possessions</h1>
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="mb-4">
        <Form>
          <Form.Group controlId="dateSelect">
            <Form.Label>Sélectionner une Date</Form.Label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              className="form-control"
            />
          </Form.Group>
        </Form>
      </div>
      <div className="mt-auto">
        <Button
          variant="primary"
          onClick={handleCalculateValue}
          className="mb-3"
        >
          Calculer la valeur d'un patrimoine
        </Button>
        {calculatedValue !== null && (
          <div>
            <h3>Valeur Calculée à {selectedDate.toLocaleDateString()} :</h3>
            <p>{calculatedValue} Ar</p>
          </div>
        )}
      </div>
      <Button
        variant="primary"
        onClick={() => setShowAddModal(true)}
        className="mb-3"
      >
        Ajouter Possession
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Libelle</th>
            <th>Valeur</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Taux d'Amortissement</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(possessions) && possessions.length > 0 ? (
            possessions.map((p) => (
              <tr key={p.id}>
                <td>{p.libelle}</td>
                <td>{p.valeur}</td>
                <td>{new Date(p.dateDebut).toLocaleDateString()}</td>
                <td>
                  {p.dateFin
                    ? new Date(p.dateFin).toLocaleDateString()
                    : "Active"}
                </td>
                <td>{p.tauxAmortissement ?? "Non défini"}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => {
                      setEditPossession(p);
                      setShowEditModal(true);
                    }}
                    className="me-2"
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleClosePossession(p.id)}
                  >
                    Clôturer
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Aucune possession disponible</td>
            </tr>
          )}
        </tbody>
      </Table>
      {/* Modal for adding new possession */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une Possession</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formLibelle">
              <Form.Label>Libelle</Form.Label>
              <Form.Control
                type="text"
                value={newPossession.libelle}
                onChange={(e) =>
                  setNewPossession({
                    ...newPossession,
                    libelle: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formValeur">
              <Form.Label>Valeur</Form.Label>
              <Form.Control
                type="text"
                value={newPossession.valeur}
                onChange={(e) =>
                  setNewPossession({
                    ...newPossession,
                    valeur: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formDateDebut">
              <Form.Label>Date Début</Form.Label>
              <Form.Control
                type="date"
                value={newPossession.dateDebut}
                onChange={(e) =>
                  setNewPossession({
                    ...newPossession,
                    dateDebut: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formTauxAmortissement">
              <Form.Label>Taux d'Amortissement</Form.Label>
              <Form.Control
                type="text"
                value={newPossession.tauxAmortissement}
                onChange={(e) =>
                  setNewPossession({
                    ...newPossession,
                    tauxAmortissement: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleAddPossession}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal for editing a possession */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier la Possession</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formLibelle">
              <Form.Label>Libelle</Form.Label>
              <Form.Control
                type="text"
                value={editPossession.libelle}
                onChange={(e) =>
                  setEditPossession({
                    ...editPossession,
                    libelle: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="formValeur">
              <Form.Label>Valeur</Form.Label>
              <Form.Control
                type="text"
                value={editPossession.valeur}
                onChange={(e) =>
                  setEditPossession({
                    ...editPossession,
                    valeur: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formDateDebut">
              <Form.Label>Date Début</Form.Label>
              <Form.Control
                type="date"
                value={editPossession.dateDebut}
                onChange={(e) =>
                  setEditPossession({
                    ...editPossession,
                    dateDebut: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formTauxAmortissement">
              <Form.Label>Taux d'Amortissement</Form.Label>
              <Form.Control
                type="text"
                value={editPossession.tauxAmortissement}
                onChange={(e) =>
                  setEditPossession({
                    ...editPossession,
                    tauxAmortissement: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleUpdatePossession}>
            Mettre à jour
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PossessionTable;
