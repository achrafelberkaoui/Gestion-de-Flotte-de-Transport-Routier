const Trajet = require("../models/Trajet");
const Camion = require("../models/Camion");
const User = require("../models/User");
const Remorque = require("../models/Remorque");

const createTrajet = async (dataTrajet) => {
  const { origine, destination, dateDepart, camion, remorque, chauffeur } =
    dataTrajet;

  const existingCamion = await Camion.findById(camion);

  if (!existingCamion) {
    throw new Error("Camion not found");
  }

  if (existingCamion.statut !== "disponible") {
    throw new Error("Camion is not available");
  }

  const trajetCamionActif = await Trajet.findOne({
    camion,
    statut: {
      $in: ["planifie", "en_cours"],
    },
  });

  if (trajetCamionActif) {
    throw new Error("Camion already has an active trajet");
  }

  const existingRemorque = await Remorque.findById(remorque);

  if (!existingRemorque) {
    throw new Error("Remorque not found");
  }

  if (existingRemorque.statut !== "disponible") {
    throw new Error("Remorque is not available");
  }

  const trajetRemorqueActif = await Trajet.findOne({
    remorque,
    statut: {
      $in: ["planifie", "en_cours"],
    },
  });

  if (trajetRemorqueActif) {
    throw new Error("Remorque already has an active trajet");
  }

  const existingChauffeur = await User.findById(chauffeur);

  if (!existingChauffeur) {
    throw new Error("Chauffeur not found");
  }

  if (existingChauffeur.role !== "driver") {
    throw new Error("Chauffeur is not a driver");
  }

  if (existingChauffeur.statut !== "actif") {
    throw new Error("Chauffeur is not active");
  }

  const trajet = await Trajet.create({
    origine,
    destination,
    dateDepart,
    camion,
    remorque,
    chauffeur,
  });

  return await Trajet.findById(trajet._id)
    .populate("camion", "matricule marque modele statut")
    .populate("remorque", "matricule type statut")
    .populate("chauffeur", "nom email role statut");
};

// GET ALL TRAJETS
const getAllTrajets = async () => {
  const trajets = await Trajet.find()
    .populate("camion", "matricule marque modele statut")
    .populate("remorque", "matricule type statut")
    .populate("chauffeur", "nom email role statut");

  return trajets;
};

// GET TRAJET BY ID
const getTrajetById = async (id) => {
  const trajet = await Trajet.findById(id)
    .populate("camion", "matricule marque modele statut")
    .populate("remorque", "matricule type statut")
    .populate("chauffeur", "nom email role statut");

  if (!trajet) {
    throw new Error("Trajet not found");
  }

  return trajet;
};

const updateTrajet = async (id, dataTrajet) => {
  const trajet = await Trajet.findById(id);

  if (!trajet) {
    throw new Error("Trajet not found");
  }

  const { statut, dateArrivee } = dataTrajet;

  if (statut) {
    const statutsAutorises = ["planifie", "en_cours", "termine", "annule"];

    if (!statutsAutorises.includes(statut)) {
      throw new Error("Invalid trajet status");
    }

    trajet.statut = statut;
  }

  if (dateArrivee) {
    trajet.dateArrivee = dateArrivee;
  }

  await trajet.save();

  return await Trajet.findById(id)
    .populate("camion", "matricule marque modele statut")
    .populate("remorque", "matricule type statut")
    .populate("chauffeur", "nom email role statut");
};

module.exports = {
  createTrajet,
  getAllTrajets,
  getTrajetById,
  updateTrajet
};
