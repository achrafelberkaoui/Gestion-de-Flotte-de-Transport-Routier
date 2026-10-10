const PDFDocument = require("pdfkit");

const genererPdfTrajet = (trajet) => {
  const doc = new PDFDocument({
    size: "A4",
    margin: 50,
  });

  // Titre du document
  doc
    .fontSize(20)
    .font("Helvetica-Bold")
    .text("RAPPORT DE MISSION", { align: "center" });

  doc.moveDown();
  doc
    .fontSize(10)
    .font("Helvetica")
    .text(`Reference du trajet : ${trajet._id}`);

  doc.text(`Date de generation : ${new Date().toLocaleDateString("fr-FR")}`);

  // Informations générales
  doc.moveDown();
  doc.fontSize(14).font("Helvetica-Bold").text("1. Informations du trajet");
  doc.moveDown(0.5);

  doc.fontSize(11).font("Helvetica");
  doc.text(`Origine : ${trajet.origine}`);
  doc.text(`Destination : ${trajet.destination}`);
  doc.text(
    `Date de depart : ${new Date(trajet.dateDepart).toLocaleString("fr-FR")}`,
  );
  doc.text(
    `Date d'arrivee : ${
      trajet.dateArrivee
        ? new Date(trajet.dateArrivee).toLocaleString("fr-FR")
        : "Non renseignee"
    }`,
  );
  doc.text(`Statut : ${trajet.statut}`);

  // Informations du camion
  doc.moveDown();
  doc.fontSize(14).font("Helvetica-Bold").text("2. Camion");
  doc.moveDown(0.5);

  doc.fontSize(11).font("Helvetica");
  doc.text(`Matricule : ${trajet.camion?.matricule || "Non renseigne"}`);
  doc.text(`Marque : ${trajet.camion?.marque || "Non renseignee"}`);
  doc.text(`Modele : ${trajet.camion?.modele || "Non renseigne"}`);

  // Informations de la remorque
  doc.moveDown();
  doc.fontSize(14).font("Helvetica-Bold").text("3. Remorque");
  doc.moveDown(0.5);

  doc.fontSize(11).font("Helvetica");
  doc.text(`Matricule : ${trajet.remorque?.matricule || "Non renseignee"}`);
  doc.text(`Type : ${trajet.remorque?.type || "Non renseigne"}`);

  // Informations du chauffeur
  doc.moveDown();
  doc.fontSize(14).font("Helvetica-Bold").text("4. Chauffeur");
  doc.moveDown(0.5);

  doc.fontSize(11).font("Helvetica");
  doc.text(`Nom : ${trajet.chauffeur?.nom || "Non renseigne"}`);
  doc.text(`Email : ${trajet.chauffeur?.email || "Non renseigne"}`);

  // Kilometrage et carburant
  doc.moveDown();
  doc.fontSize(14).font("Helvetica-Bold").text("5. Kilometrage et carburant");
  doc.moveDown(0.5);

  doc.fontSize(11).font("Helvetica");
  doc.text(`Kilometrage au depart : ${trajet.kilometrageDepart} km`);
  doc.text(
    `Kilometrage a l'arrivee : ${
      trajet.kilometrageArrivee ?? "Non renseigne"
    } km`,
  );

  if (
    Number.isFinite(trajet.kilometrageArrivee) &&
    trajet.kilometrageArrivee > trajet.kilometrageDepart
  ) {
    const distance = trajet.kilometrageArrivee - trajet.kilometrageDepart;
    doc.text(`Distance parcourue : ${distance} km`);

    if (trajet.carburantConsomme != null) {
      doc.text(`Carburant consomme : ${trajet.carburantConsomme} L`);

      const consommation = (trajet.carburantConsomme / distance) * 100;

      doc.text(`Consommation moyenne : ${consommation.toFixed(2)} L/100 km`);
    }
  } else {
    doc.text("Distance parcourue : Non disponible");
    doc.text("Consommation moyenne : Non disponible");
  }

  // Pied de page
  doc.moveDown(2);
  doc
    .fontSize(9)
    .text("Document genere automatiquement par Fleet Management API.", {
      align: "center",
    });

  return doc;
};

module.exports = { genererPdfTrajet };
