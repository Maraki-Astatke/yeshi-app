import jwt from 'jsonwebtoken';

export function protect(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

export function adminOnly(req, res, next) {
  if (req.user.role !== "admin") { 
    return res.status(403).json({ message: "Admin access only" });
  }

  next();
}

// Alias for protect to match the import name in routes
export const authenticateToken = protect;