const db = require("../database/connect");

exports.createPost = (req, res, next) => {
  const { user_id, content, imageURL } = req.body;

  db.query(
    "INSERT INTO `publication` VALUES (null, ?,?,?)",
    [user_id, content, imageURL],
    function (error, results) {
      if (error) {
        console.log(error);
        res.status(400).json({ error });
      }
      res.status(201).json({ message: "Création post réussi" });
    }
  );
};

exports.getPosts = (req, res, next) => {
  db.query("SELECT * FROM publication", function (error, results) {
    if (error) {
      console.log(error);
      res.status(400).json({ error });
    }
    res.status(200).json(results);
  });
};

exports.getOnePost = (req, res, next) => {
  db.query(
    "SELECT * FROM publication WHERE post_id = ?",
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

exports.updatePost = (req, res, next) => {
  const query = "UPDATE `publication` SET ? WHERE post_id=?";
  db.query(query, [req.body, req.params.id], function (error, results) {
    if (error) {
      console.log(error);
      res.status(400).json({ error });
    }
    res.status(200).json(results);
  });

  /* 
  const { user_id, content, imageURL } = req.body;
  db.query("UPDATE VALUES (?,?,?) FROM publication", [
    user_id,
    content,
    imageURL,
  ]); */
};

exports.deletePost = (req, res, next) => {
  db.query(
    "DELETE FROM publication WHERE post_id=?",
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
