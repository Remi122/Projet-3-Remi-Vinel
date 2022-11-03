/* Ce fichier contient la normalisation de port, la gestion d'erreur et la logique de connexion du serveur Node */

/* --- IMPORT des PACKAGES --- */
/* IMPORT du package 'http' de Node */
const http = require("http");
/* IMPORT du fichier app.js qui contient la logique de l'app express */
const app = require("./app");
/* IMPORT du package de dotenv et charge les variables d'environnement stockées dans le fichier '.env' */
require("dotenv").config({ path: ".env" });

/* la fonction normalizePort renvoie un port valide */
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

/* Configuration du choix de PORT */
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/* la fonction errorHandler recherche les différentes erreurs et 
les gère de manière appropriée */
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/* Creation du serveur */
const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

/* Configuration du PORT d'ecoute du serveur */
server.listen(port);
