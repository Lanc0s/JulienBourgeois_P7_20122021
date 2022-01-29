const db = require("../database/connect");

exports.createComment = (req, res, next) => {
  const { user_id, post_id, content } = req.body;
  let imageUrl = req.file;
  if (!req.file) {
    imageUrl = null;
  } else if (req.file) {
    imageUrl = `${req.protocol}://${req.get("host")}/postImages/${
      req.file.filename
    }`;
  }
  db.query(
    "INSERT INTO `commentaire` VALUES (null, ?,?,?,?)",
    [user_id, post_id, content, imageUrl],
    function (error, results) {
      if (error) {
        console.log(error);
        return res.status(400).json({ error });
      }
      return res.status(201).json({ message: "Création commentaire réussie" });
    }
  );
};

exports.getComments = (req, res, next) => {
  const { user_id, post_id, content, imageUrl } = req.body;
  db.query(
    "SELECT user_id, post_id, content, imageUrl FROM `commentaire` WHERE post_id=3",
    /* [post_id], */
    function (error, results) {
      if (error) {
        console.log(error);
        return res.status(400).json({ error });
      }
      return res.status(200).json(results);
    }
  );
};

exports.getOneComment = (req, res, next) => {
  db.query(
    "SELECT * FROM `commentaire` WHERE comment_id=?",
    [req.params.id],
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
  db.query(
    "UPDATE `commentaire` SET ? WHERE comment_id=?",
    [req.body, req.params.id],
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
  console.log(req.locals.token);
  console.log(res.locals.token);
  db.query(
    "DELETE FROM commentaire WHERE comment_id = ?",
    [req.params.id],
    function (error, results) {
      if (error) {
        console.log(error);
        return res.status(400).json({ error });
      }
      return res.status(200).json(results);
    }
  );
};
