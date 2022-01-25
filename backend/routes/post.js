const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");
const multer = require("../middleware/multer-config");

router.post("/", multer, postCtrl.createPost);
router.get("/", postCtrl.getPosts);
router.get("/:id", postCtrl.getOnePost);
router.put("/:id", postCtrl.updatePost);
router.delete("/:id", postCtrl.deletePost);

module.exports = router;
