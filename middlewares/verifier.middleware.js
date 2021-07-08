const jwt = require("jsonwebtoken");
const customerModel = require("../database/models/customer.model");
// middleware to validate token
const verifyToken = async (req, res, next) => {
  let token = req.cookies.token;
  if (!token) return res.status(403).json({ error: "Access to this page is denied" });
  try {
    const verified = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.user = await customerModel.findById(verified.id);
    next(); // to continue the flow
  } catch (err) {
    res.status(400).json({ error: "Token is not valid" });
  }
};
module.exports = verifyToken;
