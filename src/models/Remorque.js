const mongoose = require("mongoose");

const remorqueSchema = new mongoose.Schema({
    matricule: {
        type: String,
        required: true,
        unique: true
    },

    type: {
        type: String,
        required: true
    },

    statut: {
        type: String,
        enum: ["disponible", "maintenance", "archive"],
        default: "disponible"
    }
});

module.exports = mongoose.model("Remorque", remorqueSchema);