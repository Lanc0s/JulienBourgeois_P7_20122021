const db = require("../database/connect");
const fs = require("fs");
const express = require("express");

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

exports.getPosts = (req, res, next) => {
  db.query(
    "SELECT p.post_id, up.user_id,uc.user_id,p.content AS postContent,imageUrl," +
      "concat( up.Prenom, ' ',up.Nom) as 'pseudoPost', comment_id, c.content AS commentContent, concat( uc.Prenom, ' ',uc.Nom) as 'pseudoCom'" +
      "FROM publication p JOIN utilisateur AS up ON p.user_id = up.user_id " +
      "LEFT join commentaire as c ON p.post_id = c.post_id " +
      "LEFT JOIN utilisateur AS uc ON uc.user_id=c.user_id ;",
    function (error, results) {
      if (error) {
        console.log(error);
        return res.status(400).json({ error });
      }
      return res.status(200).json(results);
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
