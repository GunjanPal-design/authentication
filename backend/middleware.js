const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split("")[1];
  if (!token) {
    return res.status(400).json({ message: "Access denied" });
  }
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(400).json({ error: "invalid token" });
    }
    req.user = user;
    next();
  });
};
module.exports = authMiddleware;
