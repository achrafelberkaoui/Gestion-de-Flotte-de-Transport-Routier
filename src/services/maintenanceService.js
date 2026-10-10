const Maintenance = require("../models/Maintenance");
const Pneu = require("../models/Pneu");

const mettreAJourUsurePneus = async (camionId, distance) => {
  const pneus = await Pneu.find({ camion: camionId });

  for (const pneu of pneus) {
    pneu.kilometrageUsure += distance;

    if (pneu.kilometrageUsure >= pneu.seuilUsure) {
      pneu.etat = "a_remplacer";
    }

    await pneu.save();
  }

  return pneus;
};

const creeMaintenance = async (data) => {
  const { camion, type, seuilKilometrage, kilometrageDerniereMaintenance } =
    data;

  const maintenance = Maintenance.create({
    camion,
    type,
    seuilKilometrage,
    kilometrageDerniereMaintenance,
  });

  return maintenance;
};

const getMaintenancesByCamion = async (camionId) => {
  return await Maintenance.find({
    camion: camionId,
  }).populate("camion", "matricule marque modele kilometrage");
};

const verifierMaintenance = async (camionId) => {
  const maintenances = await Maintenance.find({
    camion: camionId,
    statut: "a_faire",
  });

  const camion = await require("../models/Camion").findById(camionId);

  if (!camion) {
    throw new Error("Camion not found");
  }

  for (const maintenance of maintenances) {
    const kilometrageDepuisMaintenance =
      camion.kilometrage - maintenance.kilometrageDerniereMaintenance;
      console.log(kilometrageDepuisMaintenance);
      console.log(maintenance.seuilKilometrage);
      
      
                    //150000                        //100
    if (kilometrageDepuisMaintenance >= maintenance.seuilKilometrage) {
      maintenance.alerte = true;

      await maintenance.save();
    }
  }

  return maintenances;
};

const verifierBlocageCamion = async (camionId) => {
  const pneuProblematique = await Pneu.findOne({
    camion: camionId,
    etat: "a_remplacer",
  });

  if (pneuProblematique) {
    throw new Error("Camion bloqué : un pneu doit être remplacé");
  }

  const maintenanceProblematique = await Maintenance.findOne({
    camion: camionId,
    alerte: true,
    statut: "a_faire",
  });

  if (maintenanceProblematique) {
    throw new Error("Camion bloqué : une maintenance est nécessaire");
  }

  return true;
};

module.exports = {
  mettreAJourUsurePneus,
  creeMaintenance,
  getMaintenancesByCamion,
  verifierMaintenance,
  verifierBlocageCamion,
};
