const mongoose = require("mongoose");

const pneuSchema = new mongoose.Schema(
  {
    reference: {
      type: String,
      required: [true, "Pneu reference is required"],
      unique: true,
      trim: true,
    },

    marque: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
    },

    etat: {
      type: String,
      enum: ["neuf", "bon", "use", "a_remplacer"],
      default: "neuf",
    },

    kilometrageUsure: {
      type: Number,
      default: 0,
      min: [0, "Mileage cannot be negative"],
    },

    seuilUsure: {
      type: Number,
      required: true,
      min: [1, "Wear threshold must be positive"],
    },

    camion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Camion",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Pneu", pneuSchema);
