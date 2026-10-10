const Trajet = require("../models/Trajet");
const Camion = require("../models/Camion");
const User = require("../models/User");
const Remorque = require("../models/Remorque");
const maintenanceService = require("./maintenanceService");

const createTrajet = async (dataTrajet) => {
  const { origine, destination, dateDepart, camion, remorque, chauffeur } =
    dataTrajet;

  const existingCamion = await Camion.findById(camion);

  if (!existingCamion) {
    throw new Error("Camion not found");
  }
  await maintenanceService.verifierBlocageCamion(existingCamion._id);

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
  const kilometrageDepart = existingCamion.kilometrage;
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
    kilometrageDepart,
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
    const statutsAutorises = {
      planifie: ["annule", "en_cours"],
      en_cours: ["annule"],
      termine: [],
      annule: [],
    };

    if (statut === "termine") {
      throw new Error(
        "Utilise l'endpoint terminerTrajet pour terminer le trajet",
      );
    }

    const statutPossible = statutsAutorises[trajet.statut] || [];

    if (!statutPossible.includes(statut)) {
      throw new Error(`Transation Impossible ${trajet.statut} vers ${statut}`);
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

const terminerTrajet = async (id, kilometrageArrive, carburantConsomme) => {
  const trajet = await Trajet.findById(id);

  if (!trajet) {
    throw new Error("Trajet Not Found");
  }

  if (trajet.kilometrageDepart >= kilometrageArrive) {
    throw new Error("Arrival mileage must be greater than departure mileage");
  }

  if (carburantConsomme < 0) {
    throw new Error("Fuel consumption cannot be negative");
  }

  const camion = await Camion.findById(trajet.camion);
  if (!camion) {
    throw new Error("Camion not found");
  }

  const distance = kilometrageArrive - trajet.kilometrageDepart;
  const consommation = (carburantConsomme / distance) * 100;
  await maintenanceService.mettreAJourUsurePneus(trajet.camion, distance);

  trajet.kilometrageArrivee = kilometrageArrive;
  trajet.carburantConsomme = carburantConsomme;
  trajet.dateArrivee = new Date();
  trajet.statut = "termine";
  camion.kilometrage = kilometrageArrive;

  await trajet.save();
  await camion.save();
  await maintenanceService.verifierMaintenance(camion._id);

  const resultatTrajet = await Trajet.findById(id)
    .populate("camion", "matricule marque modele statut kilometrage")
    .populate("remorque", "matricule type statut")
    .populate("chauffeur", "nom email role statut");

  return {
    resultatTrajet,
    distance,
    consommation,
  };
};

module.exports = {
  createTrajet,
  getAllTrajets,
  getTrajetById,
  updateTrajet,
  terminerTrajet,
};
