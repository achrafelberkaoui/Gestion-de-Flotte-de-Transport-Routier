const mongoose = require("mongoose");

const camionSchema = new mongoose.Schema({
    matricule: {
        type: String,
        required: true,
        unique: true
    },

    marque: {
        type: String,
        required: true
    },

    modele: {
        type: String,
        required: true
    },

    kilometrage: {
        type: Number,
        default: 0
    },

    statut: {
        type: String,
        enum: ["disponible", "maintenance", "archive"],
        default: "disponible"
    }
});

module.exports = mongoose.model("Camion", camionSchema);