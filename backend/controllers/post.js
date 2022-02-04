const db = require("../database/connect");
const fs = require("fs");
const express = require("express");
const { post } = require("../routes/user");
const connection = require("../database/connect");

exports.createPost = (req, res, next) => {
  const { user_id, content } = req.body;
  let imageUrl = req.file;
  if (!req.file) {
    imageUrl = null;
  } else if (req.file) {
    imageUrl = `${req.protocol}://${req.get("host")}/postImages/${
      req.file.filename
    }`;
  }

  db.query(
    "INSERT INTO `publication` VALUES (null, ?,?,?)",
    [user_id, content, imageUrl],
    function (error, results) {
      if (error) {
        console.log(error);
        return res.status(400).json({ error });
      }
      return res.status(201).json({ message: "Création post réussie" });
    }
  );
};

exports.getPosts = async (req, res, next) => {
  db.query(
    `select publication.post_id, u.pseudo, publication.content, publication.imageUrl, JSON_ARRAYAGG(JSON_OBJECT('comment_id', commentaire.comment_id, 'content', commentaire.content, 'user_id', commentaire.user_id, 'pseudo', utilisateur.pseudo)) as comments 
    from publication 
    left join commentaire on publication.post_id = commentaire.post_id 
    left join utilisateur on commentaire.user_id = utilisateur.user_id 
    left join utilisateur as u on publication.user_id = u.user_id 
    group by publication.post_id`,
    function (err, results) {
      const reworked = results.map((post) => ({
        ...post,
        comments: JSON.parse(post.comments),
      }));

      res.status(200).json(reworked);
    }
  );
};

exports.getOnePost = (req, res, next) => {
  db.query(
    "SELECT * FROM publication WHERE post_id = ?",
    [req.params.post_id],
    function (error, results) {
      if (error) {
        console.log(error);
        return res.status(400).json({ error });
      }
      return res.status(200).json(results);
    }
  );
};

exports.updatePost = (req, res, next) => {
  const query = "UPDATE `publication` SET ? WHERE post_id=?";
  db.query(query, [req.body, req.params.post_id], function (error, results) {
    if (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
    return res.status(200).json(results);
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
  let query;
  if (res.locals.isAdmin === 1) {
    query = "DELETE FROM publication WHERE post_id=?";
  } else if (res.locals.isAdmin === 0) {
    query = "DELETE FROM publication WHERE post_id=? AND user_id=?";
  }
  db.query(
    query,
    [parseInt(req.params.post_id), res.locals.userId],
    function (error, results) {
      if (error || !results.affectedRows) {
        console.log(error);
        return res.status(400).json({ error });
      }
      console.log(results);
      return res.status(200).json({ message: "Post supprimé" });
    }
  );
};
