import jwt from "jsonwebtoken";
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = await req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token" });
    }
    const token = authHeader.split(" ")[1];
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedUser.id;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export default authMiddleware;
