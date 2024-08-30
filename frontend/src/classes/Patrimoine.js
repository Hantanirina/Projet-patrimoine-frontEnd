export default class Patrimoine {
  constructor(possessions) {
    this.possessions = possessions; // [Possession, Possession, ...]
  }

  getValeur(date) {
    let result = 0;
    for (const item of this.possessions) {
      result += this.getValeurPossession(item, date);
    }
    return result;
  }

  getValeurPossession(possession, date) {
    if (possession.dateFin && new Date(possession.dateFin) < date) {
      return 0;
    }
    if (possession.tauxAmortissement) {
      const startDate = new Date(possession.dateDebut);
      const age = Math.floor((date - startDate) / (1000 * 60 * 60 * 24 * 365));
      return Math.max(
        0,
        possession.valeur -
          possession.valeur * (possession.tauxAmortissement / 100) * age
      );
    }
    if (possession.valeurConstante !== undefined) {
      return possession.valeurConstante;
    }
    return possession.valeur;
  }

  addPossession(possession) {
    this.possessions.push(possession);
  }

  removePossession(libelle) {
    this.possessions = this.possessions.filter((p) => p.libelle !== libelle);
  }
}
