const trajetService = require("../services/trajetService");
const pdfService = require("../services/pdfService");
const Trajet = require("../models/Trajet");

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
      trajet,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const telechargerPdfTrajet = async (req, res) => {
  try {
    const trajet = await Trajet.findById(req.params.id)
      .populate("camion", "matricule marque modele")
      .populate("remorque", "matricule type")
      .populate("chauffeur", "nom email");

    if (!trajet) {
      return res.status(404).json({
        message: "Trajet introuvable",
      });
    }

    if (req.user.role !== "admin") {
      const userId = req.user.id || req.user._id || req.user.userId;

if (!userId || trajet.chauffeur._id.toString() !== userId.toString()) {
  return res.status(403).json({
    message: "Vous ne pouvez pas acceder a ce trajet",
  });
}
}

const pdf = pdfService.genererPdfTrajet(trajet);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="trajet-${trajet._id}.pdf"`,
    );

    pdf.pipe(res);
    pdf.end();
  } catch (error) {
    console.error("Erreur lors de la generation du PDF :", error);

    if (!res.headersSent) {
      return res.status(500).json({
        message: "Erreur lors de la generation du PDF",
      });
    }

    res.end();
  }
};

module.exports = {
  createTrajet,
  getAllTrajets,
  getTrajetById,
  updateTrajet,
  terminerTrajet,
  telechargerPdfTrajet,
};
