const db = require("../database/connect");

const jtw = require("jsonwebtoken");
const brcypt = require("bcrypt"); //module potentiellement pas installé

exports.signup = (req, res, next) => {
  const { nom, prenom, email, passwrd, isAdmin } = req.body;

  db.query(
    "INSERT INTO `utilisateur` (`nom`,`prenom`,`email`, `passwrd`, `isAdmin`) VALUES (?,?,?,?)",
    [nom, prenom, email, passwrd, isAdmin],
    function (error, results) {
      if (error) {
        console.log(error);
      }
      console.log(results);
    }
  );
  db.query(
    "select * from utilisateur where isAdmin = 1",
    function (error, results) {
      if (error) {
        console.log(error);
      }
      console.log(results);
    }
  );
};

exports.signin = (req, res, next) => {
  const { nom, prenom, email, isAdmin } = req.body;
  db.query();
};
