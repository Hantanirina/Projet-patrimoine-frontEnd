import React from "react";
import { Table } from "react-bootstrap";

const PossessionsTable = ({ possessions }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Libelle</th>
          <th>Valeur Initiale</th>
          <th>Date Debut</th>
          <th>Date Fin</th>
          <th>Amortissement</th>
          <th>Valeur Actuelle</th>
        </tr>
      </thead>
      <tbody>
        {possessions.map((possession, index) => (
          <tr key={index}>
            <td>{possession.libelle}</td>
            <td>{possession.valeur}</td>
            <td>
              {new Date(possession.dateDebut).toISOString().split("T")[0]}
            </td>
            <td>
              {possession.dateFin
                ? new Date(possession.dateFin).toISOString().split("T")[0]
                : "N/A"}
            </td>
            <td>{possession.tauxAmortissement || "N/A"}</td>
            <td>{calculateValeurActuelle(possession).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const calculateValeurActuelle = (possession, selectedDate) => {
  if (!possession.dateFin) {
    const ageInYears =
      new Date().getFullYear() - new Date(possession.dateDebut).getFullYear();
    return (
      possession.valeur *
      Math.pow(1 - possession.tauxAmortissement / 100, ageInYears)
    );
  }
  return possession.valeur;
};

export default PossessionsTable;
