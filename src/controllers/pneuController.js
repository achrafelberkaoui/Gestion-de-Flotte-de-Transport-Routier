const pneuService = require("../services/pneuService");

// CREATE
const createPneu = async (req, res) => {
  try {
    const pneu = await pneuService.createPneu(req.body);

    res.status(201).json({
      message: "Pneu created successfully",
      pneu,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// READ ALL
const getAllPneus = async (req, res) => {
  try {
    const pneus = await pneuService.getAllPneus();

    res.status(200).json({
      pneus,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve pneus",
    });
  }
};

// READ ONE
const getPneuById = async (req, res) => {
  try {
    const pneu = await pneuService.getPneuById(req.params.id);

    res.status(200).json({
      pneu,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// UPDATE
const updatePneu = async (req, res) => {
  try {
    const pneu = await pneuService.updatePneu(req.params.id, req.body);

    res.status(200).json({
      message: "Pneu updated successfully",
      pneu,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// DELETE
const deletePneu = async (req, res) => {
  try {
    const pneu = await pneuService.deletePneu(req.params.id);

    res.status(200).json({
      message: "Pneu deleted successfully",
      pneu,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPneu,
  getAllPneus,
  getPneuById,
  updatePneu,
  deletePneu,
};
