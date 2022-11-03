/* --- IMPORT des PACKAGES --- */
/* package 'express' */
const express = require("express");
const fileupload = require("express-fileupload");
/* package 'mongoose */
const mongoose = require("mongoose");
/* package de 'dotenv' et charge les variables d'environnement stockées dans le fichier '.env' */
require("dotenv").config({ path: ".env" });

/* donne accès au chemin de fichiers */
const path = require("path");

/* chargement des fonctions d'express */
const app = express();

/* --- IMPORT ROUTES --- */
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const morgan = require('morgan')
/* --- MIDDLEWARE --- */
app.use(express.json());
app.use(fileupload());
app.use(morgan('dev'))
/* --- DATABASE --- */
/* Connection à la base de donnée MongoDB Atlas */
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

/* --- CORS --- */
/* Paramétrage de CORS = Cross Origin Resource Sharing  */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

/* --- ROUTES PARAMETRE --- */
/* gestion des requête vers le dossier '/images' */
app.use("/images", express.static(path.join(__dirname, "images")));
/* Paramétrage des chemins pour les routes */
app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);

/* EXPORT de l'application */
module.exports = app;
