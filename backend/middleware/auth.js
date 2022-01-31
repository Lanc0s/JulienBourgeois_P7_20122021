const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    console.log(decodedToken);
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;
    const pseudo = decodedToken.pseudo;
    res.locals.userId = userId;
    res.locals.isAdmin = isAdmin;
    /* 
    req.auth = { userId: userId, isAdmin: isAdmin, pseudo: pseudo }; */
    if (req.body.userId && req.body.userId !== userId) {
      throw "User ID non reconnu !";
    } else {
      next();
    }
  } catch {
    return res.status(401).json({ message: "Requête non authentifiée !" });
  }
};
