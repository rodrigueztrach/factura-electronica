import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());

// Rutas
app.use("/api/usuarios", authRoutes);

// Probar conexión y sincronizar tabla
sequelize.authenticate()
  .then(() => console.log("Conexión a DB OK"))
  .catch(err => console.error("Error conexión DB", err));

sequelize.sync({ alter: true })
  .then(() => console.log("Tablas sincronizadas"))
  .catch(err => console.error(err));

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
