# Fleet Management API

API REST de gestion de flotte de transport routier développée avec Node.js, Express.js et MongoDB.

## Présentation

Cette API permet de gérer les ressources d'une flotte, les trajets, les chauffeurs et les opérations de maintenance.

## Fonctionnalités

- Authentification avec JWT et gestion des rôles.
- Gestion des camions, remorques et pneus.
- Gestion des utilisateurs et des chauffeurs.
- Création et suivi des trajets.
- Affectation des ressources disponibles.
- Suivi du kilométrage et de la consommation de carburant.
- Suivi de l'usure des pneus et alertes de maintenance.
- Génération de rapports de trajet au format PDF.
- Validation des données avec Joi.

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- Joi
- JSON Web Token (JWT)
- PDFKit
- Vitest

## Prérequis

- Node.js et npm
- MongoDB
- Git

## Installation

Cloner le dépôt :

```bash
git clone https://github.com/achrafelberkaoui/Gestion-de-Flotte-de-Transport-Routier.git
cd fleet-management-api
```

Installer les dépendances :

```bash
npm install
```

Créer un fichier `.env` à la racine :

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/fleet_management
JWT_SECRET=remplacer_par_un_secret_long_et_aleatoire
```

Ne jamais publier les valeurs réelles des secrets.

## Démarrage

Lancer le serveur :

```bash
npm start
```

En développement, si un script adapté est configuré :

```bash
npm run dev
```

## Tests

Exécuter les tests automatisés :

```bash
npm test
```

Lancer les tests en mode surveillance :

```bash
npm run test:watch
```

## Routes principales

Les routes sont organisées par ressource. Les préfixes ci-dessous sont à confirmer avec le montage réel des routes dans `server.js`.

- `/api/auth` : authentification
- `/api/users` : utilisateurs
- `/api/camions` : camions
- `/api/remorques` : remorques
- `/api/pneus` : pneus
- `/api/trajets` : trajets et rapports PDF
- `/api/maintenances` : maintenance

Les routes protégées nécessitent un token JWT lorsque l'authentification est exigée. Les opérations sont également soumises aux permissions du rôle connecté.

## Architecture

- **Routes** : définissent les endpoints HTTP.
- **Controllers** : traitent les requêtes et construisent les réponses.
- **Services** : regroupent les règles métier.
- **Models** : définissent les schémas MongoDB avec Mongoose.
- **DTOs** : valident les données entrantes avec Joi.
- **Middleware** : gèrent l'authentification, les rôles et la validation.

## Sécurité

- Les secrets sont configurés dans `.env`.
- Les routes protégées utilisent JWT.
- Les autorisations dépendent du rôle.
- Les données entrantes sont validées avant le traitement métier.

## Auteur

Projet pédagogique de gestion de flotte de transport routier — YouCode Maroc, 2026/2027.