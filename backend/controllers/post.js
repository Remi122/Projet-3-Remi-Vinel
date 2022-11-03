/* Ce fichier contient la logique métier pour les posts */

/* --- IMPORT --- */
/* model de post */
const Post = require("../models/post");
/* package 'file system' */
const fs = require("fs");

/* --- CONTROLLERS --- */

/* transmettre tout les posts */
exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(404).json({ error }));
};

/* transmettre un post */
exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

/* Création de post */
exports.createPost = (req, res, next) => {
  /* Dictionnaire 'mine_type', qui défini les type de fichiers accepté */
  const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
  };

  let post;

  if (req._body === true) {
    // On verifi si c'est un envoi sans image, soit une req avec un Body raw JSON
    if (req.body.userId === req.auth.userId) {
      // On verifi l'authorization de l'utilisateur
      const postObject = req.body;
      delete postObject._id;
      post = new Post({ ...postObject });
      post
        .save()
        .then((post) =>
          res.status(201).json({ message: "Post enregistrée!", post: post })
        )
        .catch((error) => res.status(403).json({ error }));
    } else {
      res.status(401).json({ error: "Création non autorisée !" });
    }
  } else if (req.body.userId === req.auth.userId) {
    const file = req.files.file;
    const newPath = __dirname.split("controllers").join("") + "images/";
    const name = req.files.file.name.split(" ").join("_");
    const extension = MIME_TYPES[req.files.file.mimetype];
    const filename = name + Date.now() + "." + extension;

    const postObject = req.body;
    delete postObject._id;

    post = new Post({
      ...postObject,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${filename}`,
    });

    post
      .save()
      .then(() => {
        file.mv(`${newPath}${filename}`, (err) => {
          if (err) {
            res.status(500).send({ message: "File upload failed", code: 500 });
          }
        });
      })
      .then((post) =>
        res.status(201).json({ message: "Post enregistrée!", post: post })
      )
      .catch((error) => res.status(403).json({ error }));
  } else {
    res.status(401).json({ error: "Création par raw JSON non autorisée !" });
  }
};

/* supprimer un post */
exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id }).then((post) => {
    if (!post) {
      return res.status(404).json({ error: "Post non trouvée !" });
    }
    if (post.userId !== req.auth.userId) {
      return res.status(401).json({ error: "Requête non autorisée !" });
    }
    if (post.imageUrl) {
      const filename = post.imageUrl.split("images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
          .then((Post) => res.status(200).json({ message: "Post supprimée !" }))
          .catch((error) => res.status(403).json({ error }));
      });
    } else {
      Post.deleteOne({ _id: req.params.id })
        .then((Post) => res.status(200).json({ message: "Post supprimée !" }))
        .catch((error) => res.status(403).json({ error }));
    }
  });
};

/* ================================================================ */

/* modification d'un post */
exports.modifyPost = (req, res, next) => {
  Post.findOne({ _id: req.params.id }).then((post) => {
    /* Dictionnaire 'mine_type', qui défini les type de fichiers accepté */
    const MIME_TYPES = {
      "image/jpg": "jpg",
      "image/jpeg": "jpg",
      "image/png": "png",
    };

    if (req.body.userId !== req.auth.userId) {
      res
        .status(401)
        .send({ code: 401, message: "Uttilisateur non autorisée !" });
    }

    if (!post) {
      res.status(404).send({ code: 404, message: "Post non trouvée !" });
    }

    if (req._body === true) {
      const postObject = req.body;
      delete postObject._id;

      // modification du post
      Post.updateOne(
        // 1er argument : le post à modifier
        // 2ème argument : la version modifié du post, celle envoyée dans la requête
        { _id: req.params.id },
        { ...postObject, _id: req.params.id }
      )
        .then((post) =>
          res.status(200).json({ code: 200, message: "Post bien modifiée !" })
        )
        .catch((error) => res.status(400).json(error));
    } else if (req.files.file) {
      const file = req.files.file;
      const newPath = __dirname.split("controllers").join("") + "images/";
      const name = req.files.file.name.split(" ").join("_");
      const extension = MIME_TYPES[req.files.file.mimetype];
      const filename = name + Date.now() + "." + extension;
      const postObject = {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${filename}`,
      };
      if (post.imageUrl) {
        const filename = post.imageUrl.split("images/")[1];
        fs.unlink(`images/${filename}`, (error) => {
          if (error) {
            throw new Error(error);
          }
        });
      }
      Post.updateOne(
        { _id: req.params.id },
        { ...postObject, _id: req.params.id }
      )
        .then(() => {
          file.mv(`${newPath}${filename}`, (err) => {
            if (err) {
              res
                .status(500)
                .send({ code: 500, message: "Upload du fichier echoue !" });
            }
          });
        })
        .then(
          res
            .status(200)
            .send({ code: 200, message: "Post et image bien modifiée !" })
        )
        .catch((error) => res.status(400).json({ error: error.message }));
    }
  });
};

/* like et dislike un post */
exports.likeAPost = (req, res, next) => {
  // Cherche le post dans la base des données
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      // Récupérer les valeurs de likes et dislikes
      const userStatus = {
        usersLiked: post.usersLiked,
        usersDisliked: post.usersDisliked,
        likes: 0,
        dislikes: 0,
      };

      // Gestion des cas selon la valeur de "like"
      switch (req.body.like) {
        // si req.body.like = 1, l'utilisateur aime le post
        case 1:
          // ...et qu'il n'a pas encore liké
          if (!userStatus.usersLiked.includes(req.body.userId)) {
            userStatus.usersLiked.push(req.body.userId); // ajouter dans le tableau "userLiked"
          } else {
            // ...et qu'il a déjà liké
            throw new Error("Un seul like possible !");
          }
          // ... et qu'il a déjà disliké
          if (userStatus.usersDisliked.includes(req.body.userId)) {
            throw new Error("Merci d'annuler votre dislike avant de liker !");
          }
          break;

        // si req.body.like = -1, l'utilisateur n'aime pas le post
        case -1:
          // ...et qu'il n'a pas encore disliké
          if (!userStatus.usersDisliked.includes(req.body.userId)) {
            userStatus.usersDisliked.push(req.body.userId); // ajouter dans le tableau "userDisliked"
          } else {
            // ...et qu'il a déjà disliké
            throw new Error("Un seul dislike possible !");
          }
          // ...et qu'il a déjà liké
          if (userStatus.usersLiked.includes(req.body.userId)) {
            throw new Error("Merci d'annuler votre like avant de disliker !");
          }
          break;

        // si req.body.like = 0, l'utilisateur annule son like ou dislike ou neutre
        case 0:
          // si l'utilisateur a déjà liké, retirer-le du tableau "userLiked"
          if (userStatus.usersLiked.includes(req.body.userId)) {
            let indexLiked = userStatus.usersLiked.indexOf(req.body.userId); // indexer l'userID
            userStatus.usersLiked.splice(indexLiked, 1); // supprimer 1 élément à partir de l'index "index"
          } else if (userStatus.usersDisliked.includes(req.body.userId)) {
            // si l'utilise a déjà disliké, retirer-le du tableau "userDisliked"
            let indexDisliked = userStatus.usersDisliked.indexOf(
              req.body.userId
            );
            userStatus.usersDisliked.splice(indexDisliked, 1);
          }
          break;

        default:
          throw error;
      }

      // calculer le nombre total de likes et dislikes
      userStatus.likes = userStatus.usersLiked.length;
      userStatus.dislikes = userStatus.usersDisliked.length;

      // mettre à jour le post avec les nouveaux status
      Post.updateOne({ _id: req.params.id }, userStatus)
        .then((post) => res.status(200).json({ message: "Post bien notée!" }))
        .catch((error) => res.status(400).json({ error: error.message }));
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};
