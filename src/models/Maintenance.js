const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema(
  {
    camion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Camion",
      required: true,
    },

    type: {
      type: String,
      enum: ["pneus", "vidange", "revision"],
      required: true,
    },

    seuilKilometrage: {
      type: Number,
      required: true,
      min: 1,
    },

    kilometrageDerniereMaintenance: {
      type: Number,
      default: 0,
      min: 0,
    },

    alerte: {
      type: Boolean,
      default: false,
    },

    statut: {
      type: String,
      enum: ["a_faire", "effectuee"],
      default: "a_faire",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Maintenance", maintenanceSchema);
