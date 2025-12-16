const { validate } = require("../service/service");
const User = require("../Model/User");

async function checkforauth(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    let decoded;
    try {
      decoded = validate(token);
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const AdminAuth = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    if (!user.role || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
  } catch (error) {
    console.error("Error during admin authentication:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { checkforauth, AdminAuth };
