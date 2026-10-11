import { describe, it, expect } from "vitest";
const createTrajetSchema = require("../../src/dto/trajet/createTrajet.dto");
const updateTrajetSchema = require("../../src/dto/trajet/updateTrajet.dto");

describe("CreateTrajet DTO", () => {
  it("accepte des données valides", () => {
    const data = {
      origine: "Casablanca",
      destination: "Rabat",
      dateDepart: "2026-10-15T08:00:00.000Z",
      camion: "507f1f77bcf86cd799439011",
      remorque: "507f191e810c19729de860ea",
      chauffeur: "507f1f77bcf86cd799439012",
    };

    const { error } = createTrajetSchema.validate(data);

    expect(error).toBeUndefined();
  });

  it("refuse un trajet sans destination", () => {
    const data = {
      origine: "Casablanca",
      dateDepart: "2026-10-15T08:00:00.000Z",
      camion: "507f1f77bcf86cd799439011",
      remorque: "507f191e810c19729de860ea",
      chauffeur: "507f1f77bcf86cd799439012",
    };

    const { error } = createTrajetSchema.validate(data);

    expect(error).toBeDefined();
  });

  it("refuse un kilometrageDepart fourni par le client", () => {
    const data = {
      origine: "Casablanca",
      destination: "Rabat",
      dateDepart: "2026-10-15T08:00:00.000Z",
      camion: "507f1f77bcf86cd799439011",
      remorque: "507f191e810c19729de860ea",
      chauffeur: "507f1f77bcf86cd799439012",
      kilometrageDepart: 1000,
    };

    const { error } = createTrajetSchema.validate(data);

    expect(error).toBeDefined();
  });
});

describe("UpdateTrajet DTO", () => {
  it("accepte une transition vers en_cours", () => {
    const { error } = updateTrajetSchema.validate({
      statut: "en_cours",
    });

    expect(error).toBeUndefined();
  });

  it("refuse le statut termine dans une modification normale", () => {
    const { error } = updateTrajetSchema.validate({
      statut: "termine",
    });

    expect(error).toBeDefined();
  });

  it("refuse un objet vide", () => {
    const { error } = updateTrajetSchema.validate({});

    expect(error).toBeDefined();
  });
});
