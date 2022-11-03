/* Ce fichier contient la logique des routes posts. */

/* --- IMPORT --- */
/* package 'express' */
const express = require("express");
/* chargement de la fonction router d'express */
const router = express.Router();
/* controllers posts */
const postCtrl = require("../controllers/post");
/* middleware d'authentification */
const auth = require("../middleware/auth");

/* --- Logique des ROUTES --- */
/* récupérer toutes les posts (authentification requise) */
router.get("/", auth, postCtrl.getAllPosts);
/* récupérer une post par son id (authentification requise) */
router.get("/:id", auth, postCtrl.getOnePost);
/* Création d'un nouveau post (authentification requise)  */
router.post("/", auth, postCtrl.createPost);
/* Modification d'un nouveau post (authentification requise) */
router.put("/:id", auth, postCtrl.modifyPost);
/* supprimer un post (authentification requise) */
router.delete("/:id", auth, postCtrl.deletePost);

/* 'like' et 'dislike' un post (authentification requise) */
router.put("/:id/like", auth, postCtrl.likeAPost);

/* EXPORT des routes */
module.exports = router;
