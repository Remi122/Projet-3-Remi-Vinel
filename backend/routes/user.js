/* Ce fichier contient la logique des routes utilisateurs. */

/* --- IMPORT --- */
/* package 'express' */
const express = require("express");
/* chargement de la fonction router d'express */
const router = express.Router();
/* controllers utilisateur */
const userCtrl = require("../controllers/user");
/* middleware d'authentification */
const auth = require("../middleware/auth");

/* --- Logique des ROUTES --- */
/* Création d'un utilisateur */
router.post("/signup", userCtrl.signup);
/* Connexion de l'utilisateur */
router.post("/login", userCtrl.login);
/* Récupérer tout les utilisateurs */
router.get("/users", auth, userCtrl.getAllUsers);
/* Supprimer un utilisateur */
router.delete("/user/:id", auth, userCtrl.deleteUser);

/* EXPORT des routes */
module.exports = router;
