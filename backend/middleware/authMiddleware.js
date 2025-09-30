const jwt = require("jsonwebtoken");

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    try {
        //checking wheather middleware is working
        console.log("auth middleware called");

     // const token = req.cookies?.token;
      const token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];
      
      //printing token for debugging
           console.log("printing Token:", token);
      if (!token) return res.status(401).json({ message: "No token provided" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access denied: wrong role" });
      }

      req.user = decoded; // attach user
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

module.exports = authMiddleware;

///////////

