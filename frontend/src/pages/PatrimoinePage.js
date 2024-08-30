import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPossessions, closePossession } from "../api";
import { Modal, Button, Form } from "react-bootstrap";
import PossessionsTable from "..components/PossessionsTable";

const PossessionPage = () => {
  const [possessions, setPossessions] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPossession, setSelectedPossession] = useState(null);
  const navigate = useNavigate();

  const getPossessions = async () => {
    const data = await fetchPossessions();
    setPossessions(data);
  };

  useEffect(() => {
    getPossessions();
    const handlePossessionsUpdated = () => {
      getPossessions();
    };

    window.addEventListener("possessionsUpdated", handlePossessionsUpdated);
    return () => {
      window.removeEventListener(
        "possessionsUpdated",
        handlePossessionsUpdated
      );
    };
  }, []);

  const handleClose = async (id) => {
    try {
      await closePossession(id);
      getPossessions();
    } catch (error) {
      console.error("Erreur lors de la clôture de la possession :", error);
    }
  };

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowEditModal = (possession) => {
    setSelectedPossession(possession);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);

  const handleSaveChanges = () => {
    handleCloseEditModal();
  };

  const updatePossession = (index, updatedValue) => {
    const updatedPossessions = possessions.map((possession, i) =>
      i === index ? { ...possession, valeur: updatedValue } : possession
    );
    setPossessions(updatedPossessions);
  };

  return (
    <div className="container">
      <h1>Liste des Possessions</h1>
      <div style={{ textAlign: "center" }}>
        <Button variant="primary" onClick={handleShowAddModal}>
          Ajouter une Possession
        </Button>
      </div>
      <PossessionsTable
        possessions={possessions}
        onUpdate={(index, updatedValue) =>
          updatePossession(index, updatedValue)
        }
      />
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une Possession</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formLibelle">
              <Form.Label>Libelle</Form.Label>
              <Form.Control type="text" placeholder="Entrez le libelle" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formValeur">
              <Form.Label>Valeur Initiale</Form.Label>
              <Form.Control
                type="number"
                placeholder="Entrez la valeur initiale"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDateDebut">
              <Form.Label>Date de Début</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTaux">
              <Form.Label>Taux d'Amortissement</Form.Label>
              <Form.Control type="number" placeholder="Entrez le taux" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleCloseAddModal}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier la Possession</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formLibelle">
              <Form.Label>Libelle</Form.Label>
              <Form.Control
                type="text"
                defaultValue={selectedPossession?.libelle}
                placeholder="Entrez le libelle"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formValeur">
              <Form.Label>Valeur Initiale</Form.Label>
              <Form.Control
                type="number"
                defaultValue={selectedPossession?.valeur}
                placeholder="Entrez la valeur initiale"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDateDebut">
              <Form.Label>Date de Début</Form.Label>
              <Form.Control
                type="date"
                defaultValue={selectedPossession?.dateDebut}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTaux">
              <Form.Label>Taux d'Amortissement</Form.Label>
              <Form.Control
                type="number"
                defaultValue={selectedPossession?.taux}
                placeholder="Entrez le taux"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Sauvegarder
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PossessionPage;
