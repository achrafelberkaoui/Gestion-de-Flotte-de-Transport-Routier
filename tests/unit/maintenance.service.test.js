import { describe, it, expect, vi, afterEach } from "vitest";

const Maintenance = require("../../src/models/Maintenance");
const Pneu = require("../../src/models/Pneu");

const maintenanceService = require("../../src/services/maintenanceService");

afterEach(() => {
  vi.restoreAllMocks();
});

describe("mettreAJourUsurePneus", () => {
  it("augmente l'usure et marque le pneu a_remplacer si le seuil est atteint", async () => {
    const pneu = {
      kilometrageUsure: 450,
      seuilUsure: 500,
      etat: "bon",
      save: vi.fn().mockResolvedValue(true),
    };

    vi.spyOn(Pneu, "find").mockResolvedValue([pneu]);

    const resultat = await maintenanceService.mettreAJourUsurePneus(
      "camion123",
      50,
    );

    expect(pneu.kilometrageUsure).toBe(500);
    expect(pneu.etat).toBe("a_remplacer");
    expect(pneu.save).toHaveBeenCalledOnce();
    expect(resultat).toEqual([pneu]);
  });
});

describe("verifierBlocageCamion", () => {
  it("bloque le camion si un pneu doit être remplacé", async () => {
    vi.spyOn(Pneu, "findOne").mockResolvedValue({
      etat: "a_remplacer",
    });

    await expect(
      maintenanceService.verifierBlocageCamion("camion123"),
    ).rejects.toThrow("Camion bloqué : un pneu doit être remplacé");
  });

  it("bloque le camion si une maintenance est en alerte", async () => {
    vi.spyOn(Pneu, "findOne").mockResolvedValue(null);

    vi.spyOn(Maintenance, "findOne").mockResolvedValue({
      alerte: true,
      statut: "a_faire",
    });

    await expect(
      maintenanceService.verifierBlocageCamion("camion123"),
    ).rejects.toThrow("Camion bloqué : une maintenance est nécessaire");
  });

  it("autorise le camion si aucun problème n'est détecté", async () => {
    vi.spyOn(Pneu, "findOne").mockResolvedValue(null);
    vi.spyOn(Maintenance, "findOne").mockResolvedValue(null);

    const resultat =
      await maintenanceService.verifierBlocageCamion("camion123");

    expect(resultat).toBe(true);
  });
});
