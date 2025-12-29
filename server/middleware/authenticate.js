const jwt = require("jsonwebtoken");
const User = require("../models/register");

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const verifyToken = jwt.verify(token, "Pavan Lohith I Secrte Key");

    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error("User not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = authenticate;
