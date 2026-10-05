const mongoose = require("mongoose");

const trajetSchema = new mongoose.Schema(
  {
    origine: {
      type: String,
      required: true,
      trim: true,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
    },

    dateDepart: {
      type: Date,
      required: true,
    },

    dateArrivee: {
      type: Date,
    },

    camion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Camion",
      required: true,
    },

    remorque: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Remorque",
      required: true,
    },

    chauffeur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    statut: {
      type: String,
      enum: ["planifie", "en_cours", "termine", "annule"],
      default: "planifie",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Trajet", trajetSchema);
