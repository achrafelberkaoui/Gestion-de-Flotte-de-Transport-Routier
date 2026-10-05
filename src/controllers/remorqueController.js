const remorqueService = require("../services/remorqueService");

// CREATE
const createRemorque = async (req, res) => {
  try {
    const remorque = await remorqueService.createRemorque(req.body);

    res.status(201).json({
      message: "Remorque created successfully",
      remorque,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// READ ALL
const getAllRemorques = async (req, res) => {
  try {
    const remorques = await remorqueService.getAllRemorques(req.query);

    res.status(200).json({
      remorques,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve remorques",
    });
  }
};

// READ ONE
const getRemorqueById = async (req, res) => {
  try {
    const remorque = await remorqueService.getRemorqueById(req.params.id);

    res.status(200).json({
      remorque,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// UPDATE
const updateRemorque = async (req, res) => {
  try {
    const remorque = await remorqueService.updateRemorque(
      req.params.id,
      req.body,
    );

    res.status(200).json({
      message: "Remorque updated successfully",
      remorque,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// DELETE
const deleteRemorque = async (req, res) => {
  try {
    const remorque = await remorqueService.deleteRemorque(req.params.id);

    res.status(200).json({
      message: "Remorque deleted successfully",
      remorque,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  createRemorque,
  getAllRemorques,
  getRemorqueById,
  updateRemorque,
  deleteRemorque,
};
