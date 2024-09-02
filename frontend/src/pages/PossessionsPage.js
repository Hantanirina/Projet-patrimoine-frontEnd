import React, { useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";

const PossessionsPage = () => {
  // État pour les possessions
  const [possessions, setPossessions] = useState([]);

  // État pour le Modal
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPossessionIndex, setSelectedPossessionIndex] = useState(null);

  // État pour les données du formulaire
  const [formData, setFormData] = useState({
    libelle: "",
    valeur: "",
    tauxAmortissement: "",
  });

  // Ouvrir/fermer le Modal
  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setIsEditMode(false);
    setFormData({ libelle: "", valeur: "", tauxAmortissement: "" });
  };

  // Gérer le changement des valeurs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Gérer la soumission pour ajouter une nouvelle possession
  const handleAddSubmit = () => {
    setPossessions([...possessions, formData]);
    handleClose();
  };

  // Gérer la soumission pour modifier une possession existante
  const handleEditSubmit = () => {
    const updatedPossessions = possessions.map((possession, index) =>
      index === selectedPossessionIndex ? formData : possession
    );
    setPossessions(updatedPossessions);
    handleClose();
  };

  // Ouvrir le Modal en mode édition
  const handleEdit = (index) => {
    setSelectedPossessionIndex(index);
    setFormData(possessions[index]);
    setIsEditMode(true);
    handleShow();
  };

  return (
    <div>
      <Button onClick={handleShow}>Ajouter une nouvelle possession</Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Libelle</th>
            <th>Valeur Initiale</th>
            <th>Taux d'Amortissement</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {possessions.map((possession, index) => (
            <tr key={index}>
              <td>{possession.libelle}</td>
              <td>{possession.valeur}</td>
              <td>{possession.tauxAmortissement}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(index)}>
                  Modifier
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditMode
              ? "Modifier la possession"
              : "Ajouter une nouvelle possession"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formLibelle">
              <Form.Label>Libelle</Form.Label>
              <Form.Control
                type="text"
                name="libelle"
                value={formData.libelle}
                onChange={handleChange}
                placeholder="Entrez le libellé"
              />
            </Form.Group>
            <Form.Group controlId="formValeur">
              <Form.Label>Valeur</Form.Label>
              <Form.Control
                type="number"
                name="valeur"
                value={formData.valeur}
                onChange={handleChange}
                placeholder="Entrez la valeur"
              />
            </Form.Group>
            <Form.Group controlId="formTaux">
              <Form.Label>Taux d'amortissement</Form.Label>
              <Form.Control
                type="number"
                name="tauxAmortissement"
                value={formData.tauxAmortissement}
                onChange={handleChange}
                placeholder="Entrez le taux"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button
            variant="primary"
            onClick={isEditMode ? handleEditSubmit : handleAddSubmit}
          >
            {isEditMode ? "Enregistrer les modifications" : "Enregistrer"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PossessionsPage;
