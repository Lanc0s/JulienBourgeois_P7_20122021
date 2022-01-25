const multer = require("multer");

const MINM_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "postImages");
  },
  filename: (req, file, callback) => {
    const fileName = file.originalname.split(" ").join("_");
    const extension = MINM_TYPES[file.mimetype];
    callback(null, fileName + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage }).single("image");
