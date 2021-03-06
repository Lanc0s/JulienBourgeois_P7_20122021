const db = require("../database/connect");

exports.createComment = (req, res, next) => {
  const { user_id, post_id, content } = req.body;
  db.query(
    "INSERT INTO `commentaire` VALUES (null, ?,?,?)",
    [user_id, post_id, content],
    function (error, results) {
      if (error) {
        return res.status(400).json({ error });
      }
      return res.status(201).json({ message: "Création commentaire réussie" });
    }
  );
};

exports.getOneComment = (req, res, next) => {
  db.query(
    "SELECT * FROM `commentaire` WHERE comment_id=?",
    [req.params.comment_id],
    function (error, results) {
      if (error) {
        console.log(error);
        return res.status(400).json({ error });
      }
      return res.status(200).json(results);
    }
  );
};

exports.updateComment = (req, res, next) => {
  const { comment_id, content } = req.body;
  db.query(
    "UPDATE `commentaire` SET content=? WHERE comment_id=? and user_id=?",
    [content, comment_id, req.locals.userId],
    function (error, results) {
      if (error) {
        console.log(error);
        return res.status(400).json({ error });
      }
      return res.status(200).json(results);
    }
  );
};

exports.deleteComment = (req, res, next) => {
  let query;
  if (res.locals.isAdmin === 1) {
    query = "DELETE FROM commentaire WHERE comment_id=?";
  } else if (res.locals.isAdmin === 0) {
    query = "DELETE FROM commentaire WHERE comment_id=? AND user_id=?";
  }
  db.query(
    query,
    [parseInt(req.params.comment_id), res.locals.userId],
    function (error, results) {
      if (error || !results.affectedRows) {
        console.log(error);
        return res.status(400).json({ error });
      }
      console.log(results);
      return res.status(200).json({ message: "Commentaire supprimé" });
    }
  );
};
