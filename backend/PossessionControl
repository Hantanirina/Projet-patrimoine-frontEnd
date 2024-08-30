const Possession = require("../models/possession");

exports.getPossessions = async (req, res) => {
  try {
    const possessions = await Possession.find();
    res.json(possessions);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.createPossession = async (req, res) => {
  try {
    const { libelle, valeur, dateDebut, tauxAmortissement } = req.body;
    const newPossession = new Possession({
      libelle,
      valeur,
      dateDebut,
      tauxAmortissement,
    });
    await newPossession.save();
    res.status(201).json(newPossession);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.updatePossession = async (req, res) => {
  try {
    const { libelle } = req.params;
    const updatedPossession = await Possession.findOneAndUpdate(
      { libelle },
      { ...req.body },
      { new: true }
    );
    res.json(updatedPossession);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.closePossession = async (req, res) => {
  try {
    const { libelle } = req.params;
    const closedPossession = await Possession.findOneAndUpdate(
      { libelle },
      { dateFin: new Date() },
      { new: true }
    );
    res.json(closedPossession);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
