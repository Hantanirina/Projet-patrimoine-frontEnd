const mongoose = require("mongoose");

const possessionSchema = new mongoose.Schema({
  libelle: { type: String, required: true },
  valeur: { type: Number, required: true },
  dateDebut: { type: Date, required: true },
  dateFin: { type: Date },
  tauxAmortissement: { type: Number, required: true },
});

module.exports = mongoose.model("Possession", possessionSchema);
