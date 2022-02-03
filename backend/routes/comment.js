const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/comment");

router.post("/", auth, multer, commentCtrl.createComment);
router.get("/:comment_id", auth, commentCtrl.getOneComment);
router.put("/:comment_id", auth, multer, commentCtrl.updateComment);
router.delete("/:comment_id", auth, commentCtrl.deleteComment);

module.exports = router;
