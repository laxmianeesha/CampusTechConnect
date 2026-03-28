const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader)
      return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];

    if (!token)
      return res.status(401).json({ message: "Invalid token format" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // { id, role }
console.log("REQ USER:", req.user);
    next();
  } catch (error) {
    console.error("ERROR:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;