/* Ce fichier contient le schéma d'un' post, pour la base de données MongoDB Atlas */

/* --- IMPORT --- */
/* package 'Mongoose' */
const mongoose = require("mongoose");

/* --- SCHEMA --- */
/* schema de données d'un post */
const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  date: { type: String, required: true },
  message: { type: String, required: true, trim: true },
  imageUrl: { type: String },
  likes: { type: Number, required: true, default: 0 },
  dislikes: { type: Number, required: true, default: 0 },
  usersLiked: { type: [String], required: true, default: [] },
  usersDisliked: { type: [String], required: true, default: [] },
});

/* EXPORT du schema des données utilisateurs */
module.exports = mongoose.model("Post", postSchema);
