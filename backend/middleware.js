const jwt = require("jsonwebtoken");

const secretKey = "56tdn7kqh1isyfu6rn3u8b";
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ status: "401", message: "Access denied" });
  }
  console.log(token, "tpken");
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(400).json({ status: "401", error: "invalid token" });
    }
    req.user = user;
    next();
  });
};
module.exports = authMiddleware;
