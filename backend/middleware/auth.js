/* Ce fichier contient la logique de vérification du token d'authentification des utilisateurs, avant l'envoi d'une requêtes */

/* --- IMPORT --- */
/* package 'jsonwebtoken' */
const jwt = require("jsonwebtoken");

/* EXPORT du middleware d'authentification */
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
