import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Acceso denegado, token faltante" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guarda info del usuario
    next();
  } catch (error) {
    res.status(403).json({ error: "Token inválido o expirado" });
  }
};
