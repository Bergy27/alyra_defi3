# Alyra défi 3

## Description
Ce répertoire fournit le code nécessaire à l'éxecution du service d'épinglage de fichiers décentralisés.

## Requirements
* Ganache (ou Geth ou Parity)
* Node.js (11.8.0)
* npm (6.5.0)

## Déployer le contrat sur la blockchain
* Aller sur http://remix.ethereum.org
* Copier le [contrat](Epinglage.sol)
* Déployer le nouveau contrat sur la Blockahin et récupérer l'adresse de celui-ci
* Mettre à jour l'adresse du contrat sur [server.js](server.js) et [app.js](app.js)

## Installation
Installer les paquets nécessaires
```
npm install
```

## Deployment
Lancer le serveur express
```
node server.js
```

Votre application tourne sur http://localhost:3000