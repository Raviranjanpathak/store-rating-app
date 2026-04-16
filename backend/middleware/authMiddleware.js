const jwt = require("jsonwebtoken");

module.exports = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ msg: "No token" });

    try {
      const decoded = jwt.verify(token, "secret");

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ msg: "Access denied" });
      }

      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ msg: "Invalid token" });
    }
  };
};