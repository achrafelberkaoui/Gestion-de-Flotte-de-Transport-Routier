const camionService = require("../services/camionService");

const getAllCamions = async (req, res) => {
  try {
    const result = await camionService.getAllCamions();
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(404).json({
      message: "Failed to retrieve camions",
    });
  }
};
const createCamion = async (req, res) => {
  try {
    const camion = await camionService.createCamion(req.body);

    res.status(201).json({
      message: "Camion created successfully",
      camion,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getCamion = async (req, res) => {
  try {
    const camion = await camionService.getCamion(req.params.id);
    res.status(200).json({
      camion,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateCamion = async (req, res) => {
  try {
    const camion = await camionService.updateCamion(req.params.id, req.body);

    res.status(200).json({
      message: "Camion updated successfully",
      camion,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const deleteCamion = async(req, res)=>{
  try {
    const camion = await camionService.deleteCamion(req.params.id);

    res.status(200).json({
      message: "Camion delete successfully",
      camion
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

module.exports = {
  createCamion,
  getAllCamions,
  getCamion,
  updateCamion,
  deleteCamion
};
