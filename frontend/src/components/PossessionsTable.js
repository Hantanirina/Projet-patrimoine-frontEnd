import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Alert } from "react-bootstrap";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PossessionTable = () => {
  const [possessions, setPossessions] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newPossession, setNewPossession] = useState({
    libelle: "",
    valeur: "",
    dateDebut: "",
    taux: "",
  });
  const [editPossession, setEditPossession] = useState({
    libelle: "",
    valeur: "",
    dateDebut: "",
    taux: "",
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
      const response = await axios.get("http://localhost:3000/possession");
      setPossessions(response.data);
    } catch (error) {
      setError("Erreur lors du chargement des possessions.");
      setSuccess("");
    }
  };

  const handleAddPossession = async () => {
    if (
      !newPossession.libelle ||
      !newPossession.valeur ||
      !newPossession.dateDebut
    ) {
      setError("Veuillez remplir tous les champs.");
      setSuccess("");
      return;
    }

    try {
      await axios.post("http://localhost:3000/possession", newPossession);
      setSuccess("Possession ajoutée avec succès!");
      setError("");
      fetchPossessions();
      setShowAddModal(false);
      setNewPossession({
        libelle: "",
        valeur: "",
        dateDebut: "",
        taux: "",
      });
    } catch (error) {
      setError("Erreur lors de l'ajout de la possession.");
      setSuccess("");
    }
  };

  const handleUpdatePossession = async () => {
    if (!editPossession.libelle) return;

    try {
      const encodedLibelle = encodeURIComponent(editPossession.libelle);
      const updatedPossession = {
        libelle: editPossession.libelle,
        valeur: editPossession.valeur,
        dateDebut: editPossession.dateDebut,
        taux: editPossession.taux,
        dateFin: editPossession.dateFin,
      };

      await axios.put(
        `http://localhost:3000/possession/${encodedLibelle}`,
        updatedPossession
      );
      setSuccess("Possession mise à jour avec succès!");
      setError("");
      fetchPossessions();
      setShowEditModal(false);
      setEditPossession({
        libelle: "",
        valeur: "",
        dateDebut: "",
        taux: "",
        dateFin: "",
      });
    } catch (error) {
      setError("Erreur lors de la mise à jour de la possession.");
      setSuccess("");
    }
  };

  const handleClosePossession = async (libelle) => {
    try {
      const encodedLibelle = encodeURIComponent(libelle);
      await axios.put(
        `http://localhost:3000/possession/${encodedLibelle}/close`
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
        `http://localhost:3000/possession/value/${formattedDate}`
      );
      // Assuming the server returns { totalValue: number }
      setCalculatedValue(response.data.totalValue);
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
          Calcule de la valeur d'une patrimoine
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
          {possessions.map((p) => (
            <tr key={p.libelle}>
              <td>{p.libelle}</td>
              <td>{p.valeur}</td>
              <td>{new Date(p.dateDebut).toLocaleDateString()}</td>
              <td>
                {p.dateFin
                  ? new Date(p.dateFin).toLocaleDateString()
                  : "Active"}
              </td>
              <td>{p.taux ?? "N/A"}</td>
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
                  onClick={() => handleClosePossession(p.libelle)}
                >
                  Clôturer
                </Button>
              </td>
            </tr>
          ))}
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
                  setNewPossession({ ...newPossession, valeur: e.target.value })
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
            <Form.Group controlId="formTaux">
              <Form.Label>Taux d'Amortissement</Form.Label>
              <Form.Control
                type="text"
                value={newPossession.taux}
                onChange={(e) =>
                  setNewPossession({ ...newPossession, taux: e.target.value })
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

      {/* Modal for editing possession */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier la Possession</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEditLibelle">
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
            <Form.Group controlId="formEditValeur">
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
            <Form.Group controlId="formEditDateDebut">
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
            <Form.Group controlId="formEditTaux">
              <Form.Label>Taux d'Amortissement</Form.Label>
              <Form.Control
                type="text"
                value={editPossession.taux}
                onChange={(e) =>
                  setEditPossession({
                    ...editPossession,
                    taux: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formEditDateFin">
              <Form.Label>Date Fin</Form.Label>
              <Form.Control
                type="date"
                value={editPossession.dateFin || ""}
                onChange={(e) =>
                  setEditPossession({
                    ...editPossession,
                    dateFin: e.target.value,
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
            Mettre à Jour
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PossessionTable;
