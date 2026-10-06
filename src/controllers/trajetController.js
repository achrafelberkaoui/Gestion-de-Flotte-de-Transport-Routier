const trajetService = require("../services/trajetService");

// CREATE
const createTrajet = async (req, res) => {
  try {
    const trajet = await trajetService.createTrajet(req.body);

    res.status(201).json({
      message: "Trajet created successfully",
      trajet,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
// GET ALL
const getAllTrajets = async (req, res) => {
  try {
    const trajets = await trajetService.getAllTrajets();

    res.status(200).json({
      count: trajets.length,
      trajets,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve trajets",
    });
  }
};

// GET BY ID
const getTrajetById = async (req, res) => {
  try {
    const trajet = await trajetService.getTrajetById(req.params.id);

    res.status(200).json({
      trajet,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const updateTrajet = async (req, res) => {
  try {
    const trajet = await trajetService.updateTrajet(req.params.id, req.body);

    res.status(200).json({
      message: "Trajet updated successfully",
      trajet,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const terminerTrajet = async (req, res) => {
  try {
    const trajet = await trajetService.terminerTrajet(
      req.params.id,
      req.body.kilometrageArrivee,
      req.body.carburantConsomme,
    );

    res.status(200).json({
      message: "Trajet completed successfully",
      trajet ,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTrajet,
  getAllTrajets,
  getTrajetById,
  updateTrajet,
  terminerTrajet,
};
