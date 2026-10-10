const maintenanceService = require("../services/maintenanceService");

const createMaintenance = async (req, res) => {
  try {
    const maintenance = await maintenanceService.creeMaintenance(req.body);

    return res.status(201).json({
      message: "Maintenance created successfully",
      data: maintenance,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const getMaintenancesByCamion = async (req, res) => {
  try {
    const maintenances = await maintenanceService.getMaintenancesByCamion(
      req.params.camionId,
    );

    return res.status(200).json({
      data: maintenances,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const verifierMaintenance = async (req, res) => {
  try {
    const maintenances = await maintenanceService.verifierMaintenance(
      req.params.camionId,
    );

    return res.status(200).json({
      message: "Maintenance checked successfully",
      data: maintenances,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  createMaintenance,
  getMaintenancesByCamion,
  verifierMaintenance,
};
