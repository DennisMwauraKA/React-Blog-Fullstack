require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

const authenticateToken = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    console.log("No token found in cookies");
    return res.status(401).json({ message: "Unauthorized Access" });
  }

  jwt.verify(token, secret, {}, (err, info) => {
    if (err) {
      console.log("Error during token verification:", err);
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.userInfo = info;
    next();
  });
};

module.exports = authenticateToken;
