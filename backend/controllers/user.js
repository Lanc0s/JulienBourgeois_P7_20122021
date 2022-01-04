const db = require("../database/connect");

exports.signup = (req, res, next) => {
  const { nom, prenom, email, isAdmin } = req.body;
  db.query(
    "INSERT INTO `utilisateur` (`nom`,`prenom`,`email`, `isAdmin`) VALUES (?,?,?,?)",
    [nom, prenom, email, isAdmin],
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
