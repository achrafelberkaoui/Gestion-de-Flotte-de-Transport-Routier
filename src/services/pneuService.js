const Pneu = require("../models/Pneu");
const Camion = require("../models/Camion");

// CREATE
const createPneu = async (pneuData) => {
  const { reference, marque, etat, kilometrageUsure, seuilUsure, camion } =
    pneuData;

  if (!reference) {
    throw new Error("Pneu reference is required");
  }

  if (!marque) {
    throw new Error("Brand is required");
  }

  if (!seuilUsure) {
    throw new Error("Wear threshold is required");
  }

  const existingPneu = await Pneu.findOne({ reference });

  if (existingPneu) {
    throw new Error("Pneu reference already exists");
  }

  // Vérifier le camion seulement
  // si un camion est fourni
  if (camion) {
    const existingCamion = await Camion.findById(camion);

    if (!existingCamion) {
      throw new Error("Camion not found");
    }
  }

  const pneu = await Pneu.create({
    reference,
    marque,
    etat,
    kilometrageUsure,
    seuilUsure,
    camion: camion || null,
  });

  return pneu;
};

// READ ALL
const getAllPneus = async (filters = {}) => {
  const { reference, marque, etat } = filters;
  const query = {};

  if (reference) {
    query.reference = {
      $regex: reference,
      $options: "i",
    };
  }

  if (marque) {
    query.marque = {
      $regex: marque,
      $options: "i",
    };
  }

  if (etat) {
    query.etat = etat;
  }

  const pneus = await Pneu.find(query).populate(
    "camion",
    "matricule marque modele",
  );

  return pneus;
};

// READ ONE
const getPneuById = async (id) => {
  const pneu = await Pneu.findById(id).populate(
    "camion",
    "matricule marque modele",
  );

  if (!pneu) {
    throw new Error("Pneu not found");
  }

  return pneu;
};

// UPDATE
const updatePneu = async (id, pneuData) => {
  if (pneuData.camion) {
    const existingCamion = await Camion.findById(pneuData.camion);

    if (!existingCamion) {
      throw new Error("Camion not found");
    }
  }

  const pneu = await Pneu.findByIdAndUpdate(id, pneuData, {
    new: true,
    runValidators: true,
  }).populate("camion", "matricule marque modele");

  if (!pneu) {
    throw new Error("Pneu not found");
  }

  return pneu;
};

// DELETE
const deletePneu = async (id) => {
  const pneu = await Pneu.findByIdAndDelete(id);

  if (!pneu) {
    throw new Error("Pneu not found");
  }

  return pneu;
};

module.exports = {
  createPneu,
  getAllPneus,
  getPneuById,
  updatePneu,
  deletePneu,
};
