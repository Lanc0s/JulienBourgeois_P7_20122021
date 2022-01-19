const db = require("../database/connect");

exports.createComment = (req, res, next) => {
  const { user_id, post_id, content, imageURL } = req.body;

  db.query(
    "INSERT INTO `commentaire` VALUES (null, ?,?,?,?)",
    [user_id, post_id, content, imageURL],
    function (error, results) {
      if (error) {
        console.log(error);
        res.status(400).json({ error });
      }
      res.status(201).json({ message: "Comment creation succeed" });
    }
  );
};

exports.getComments = (req, res, next) => {
  db.query("SELECT * FROM `commentaire`", function (error, results) {
    if (error) {
      console.log(error);
      res.status(400).json({ error });
    }
    res.status(200).json(results);
  });
};

exports.getOneComment = (req, res, next) => {
  db.query(
    "SELECT * FROM `commentaire` WHERE comment_id=?",
    [req.params.id],
    function (error, results) {
      if (error) {
        console.log(error);
        res.status(400).json({ error });
      }
      res.status(200).json(results);
    }
  );
};

exports.updateComment = (req, res, next) => {
  db.query(
    "UPDATE `commentaire` SET ? WHERE comment_id=?",
    [req.body, req.params.id],
    function (error, results) {
      if (error) {
        console.log(error);
        res.status(400).json({ error });
      }
      console.log(results);
    }
  );
};

exports.deleteComment = (req, res, next) => {
  db.query(
    "DELETE FROM commentaire WHERE comment_id = ?",
    [req.params.id],
    function (error, results) {
      if (error) {
        console.log(error);
        res.status(400).json({ error });
      }
      console.log(results);
    }
  );
};
