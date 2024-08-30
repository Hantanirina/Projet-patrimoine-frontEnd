import React from "react";
import { Button, Table } from "react-bootstrap";

const PossessionsTable = ({ possessions, onUpdate }) => {
  const handleEditClick = (index) => {
    const newValue = prompt("Nouvelle valeur pour la possession :");
    if (newValue) {
      onUpdate(index, parseFloat(newValue));
    }
  };

  const handleCloseClick = (index) => {
    onUpdate(index, null);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Libelle</th>
          <th>Date Début</th>
          <th>Date Fin</th>
          <th>Taux Amortissement</th>
          <th>Valeur Initiale</th>
          <th>Valeur Actuelle</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {possessions.map((possession, index) => (
          <tr key={index}>
            <td>{possession.libelle}</td>
            <td>{new Date(possession.dateDebut).toLocaleDateString()}</td>
            <td>
              {possession.dateFin
                ? new Date(possession.dateFin).toLocaleDateString()
                : "En cours"}
            </td>
            <td>{possession.tauxAmortissement}%</td>
            <td>{possession.valeur}</td>
            <td>{possession.valeurActuelle.toFixed(2)} Ar</td>
            <td>
              <Button onClick={() => handleEditClick(index)} variant="warning">
                Modifier
              </Button>
              <Button
                onClick={() => handleCloseClick(index)}
                variant="danger"
                className="ml-2"
              >
                Clôturer
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PossessionsTable;
