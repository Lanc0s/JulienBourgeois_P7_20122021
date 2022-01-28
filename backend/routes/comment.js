const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const commentCtrl = require("../controllers/comment");

router.post("/", multer, commentCtrl.createComment);
router.get("/", commentCtrl.getComments);
router.get("/:id", commentCtrl.getOneComment);
router.put("/:id", multer, commentCtrl.updateComment);
router.delete("/:id", commentCtrl.deleteComment);

module.exports = router;
