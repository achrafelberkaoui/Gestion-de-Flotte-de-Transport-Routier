const Camion = require("../models/Camion");

const getAllCamions = async()=>{
  const camions = await Camion.find();

  return camions;
}

const createCamion = async (camionData) => {
  const { matricule, marque, modele, kilometrage } = camionData;

  if (!matricule) {
    throw new Error("Matricule is required");
  }

  if (!marque) {
    throw new Error("Marque is required");
  }

  if (!modele) {
    throw new Error("Modele is required");
  }

  const existingCamion = await Camion.findOne({ matricule });

  if (existingCamion) {
    throw new Error("Matricule already exists");
  }

  const camion = await Camion.create({
    matricule,
    marque,
    modele,
    kilometrage,
  });

  return camion;
};

const getCamion = async (id)=>{
  const camion = await Camion.findById(id);
  if(!camion){
    throw new Error("Camion not found");
  }
  return camion
}

const updateCamion = async (id, camionData)=>{
  const camion = Camion.findByIdAndUpdate(id, camionData, {new : true, runValidators : true});

  if(!camion){
    throw new Error("Camion not found");
  }
  return camion;
}

const deleteCamion = async (id)=>{
  const camion = await Camion.findByIdAndDelete(id);
  if(!camion){
    throw new Error("Camion not found");
  }
  return camion;
}

module.exports = {
  createCamion,
  getAllCamions,
  getCamion,
  updateCamion,
  deleteCamion
};
