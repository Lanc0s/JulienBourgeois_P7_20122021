const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

const postCtrl = require("../controllers/post");
const multer = require("../middleware/multer-config");

router.post("/", auth, multer, postCtrl.createPost);
router.get("/", auth, postCtrl.getPosts);
router.get("/:post_id", auth, postCtrl.getOnePost);
router.put("/:post_id", auth, multer, postCtrl.updatePost);
router.delete("/:post_id", auth, postCtrl.deletePost);

module.exports = router;
