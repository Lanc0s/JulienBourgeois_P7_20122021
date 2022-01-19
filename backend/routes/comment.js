const express = require("express");
const router = express.Router;

const commentCtrl = require("../controllers/comment");

router.post("/", commentCtrl.createComment);
router.get("/", commentCtrl.getComments);
router.get("/:id", commentCtrl.getOneComment);
router.put("/:id", commentCtrl.updateComment);
router.delete("/:id", commentCtrl.deleteComment);

module.exports = router;
