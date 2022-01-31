const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/comment");

router.post("/", auth, multer, commentCtrl.createComment);
router.get("/:id", auth, commentCtrl.getOneComment);
router.put("/:id", auth, multer, commentCtrl.updateComment);
router.delete("/:id", auth, commentCtrl.deleteComment);

module.exports = router;
