/* Ce fichier contient la logique métier pour les utilisateurs */

/* --- IMPORT --- */
/* package 'bcrypt' */
const bcrypt = require("bcrypt");
/* package 'jsonwebtoken' */
const jwt = require("jsonwebtoken");
/* model utilisateur */
const User = require("../models/user");

/* EXPORT : Logique de métier pour l'enregistrement d'un utilisateur */
exports.signup = (req, res, next) => {
  // Hachage du mot de passe, "salage" 10 fois
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });
      // Enregistrement du mot de passe salé
      user
        .save()
        .then(() => {
          res.status(201).json({ message: "Votre compte a été créé !" });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

/* EXPORT : Logique de métier pour la connexion d'un utilisateur */
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Email ou mot de passe incorrecte !" });
      }
      // comparer le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Email ou mot de passe incorrecte !" });
          }
          res.status(200).json({
            userName: user.name,
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
            role: user.role,
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

/* transmettre tout les users */
exports.getAllUsers = (req, res, next) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(404).json({ error }));
};

/* supprimer un user */
exports.deleteUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvée !" });
      }
      User.deleteOne({ _id: req.params.id })
        .then((user) =>
          res.status(200).json({ message: "Utilisateur supprimée !" })
        )
        .catch((error) => res.status(403).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.adminDeleteUser = ( req , res ) => {
  User.findOne({ _id: req.params.id })
  .then((user) => {
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvée !" });
    }
    User.deleteOne({ _id: req.params.id })
      .then((user) =>
        res.status(200).json({ message: "Utilisateur supprimée par administrateur !" })
      )
      .catch((error) => res.status(403).json({ error }));
  })
  .catch((error) => res.status(400).json({ error }));
}
