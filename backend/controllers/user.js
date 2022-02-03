const db = require("../database/connect");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Console } = require("console");

exports.signup = (req, res, next) => {
  const { nom, prenom, email, user_password } = req.body;
  bcrypt
    .hash(user_password, 10)
    .then((hash) => {
      db.query(
        "INSERT INTO `utilisateur` (`nom`,`prenom`,`email`, `user_password`, `isAdmin`) VALUES (?,?,?,?,0)",
        [nom, prenom, email, hash],
        function (error, results) {
          if (error) {
            console.log(error);
            return res.status(400).json({ error });
          }
          return res.status(201).json({ message: "User created" });
        }
      );
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error });
    });
};

exports.signin = (req, res, next) => {
  const { nom, prenom, email, user_password, isAdmin } = req.body;
  console.log(req.body);
  db.query(
    " SELECT user_id, nom, prenom, email, user_password, isAdmin from `utilisateur` where email = ?",
    [req.body.email],
    function (error, results) {
      if (error) {
        console.log(error);
      }
      const user = results[0];
      bcrypt.compare(user_password, user.user_password).then((valid) => {
        if (!valid) {
          return res.status(401).json({ error: "Mot de passe incorrect !" });
        }
        return res.status(200).json({
          userId: user.user_id,
          pseudo: user.prenom + " " + user.nom,
          isAdmin: user.isAdmin,
          token: jwt.sign(
            { userId: user.user_id, isAdmin: user.isAdmin },
            "RANDOM_TOKEN_SECRET",
            {
              expiresIn: "24h",
            }
          ),
        });
      });
    }
  );
};
