const Remorque = require("../models/Remorque");

// CREATE
const createRemorque = async (remorqueData) => {
  const { matricule, type } = remorqueData;

  if (!matricule) {
    throw new Error("Matricule is required");
  }

  if (!type) {
    throw new Error("Type is required");
  }

  const existingRemorque = await Remorque.findOne({ matricule });

  if (existingRemorque) {
    throw new Error("Matricule already exists");
  }

  const remorque = await Remorque.create({
    matricule,
    type,
  });

  return remorque;
};

// READ ALL
const getAllRemorques = async (filters = {}) => {
  const { type, statut, matricule } = filters;

  const query = {};

  if (type) {
    query.type = {
      $regex: type,
      $options: "i",
    };
  }

  if (statut) {
    query.statut = statut;
  }

  if (matricule) {
    query.matricule = {
      $regex: matricule,
      $options: "i",
    };
  }

  const remorques = await Remorque.find(query);

  return remorques;
};

// READ ONE
const getRemorqueById = async (id) => {
  const remorque = await Remorque.findById(id);

  if (!remorque) {
    throw new Error("Remorque not found");
  }

  return remorque;
};

// UPDATE
const updateRemorque = async (id, remorqueData) => {
  const remorque = await Remorque.findByIdAndUpdate(id, remorqueData, {
    new: true,
    runValidators: true,
  });

  if (!remorque) {
    throw new Error("Remorque not found");
  }

  return remorque;
};

// DELETE
const deleteRemorque = async (id) => {
  const remorque = await Remorque.findByIdAndDelete(id);

  if (!remorque) {
    throw new Error("Remorque not found");
  }

  return remorque;
};

module.exports = {
  createRemorque,
  getAllRemorques,
  getRemorqueById,
  updateRemorque,
  deleteRemorque,
};
