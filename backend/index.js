import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";

import clienteRoutes from "./routes/clienteRoutes.js";
import facturaRoutes from "./routes/facturaRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/clientes", clienteRoutes);
app.use("/api/facturas", facturaRoutes);

// Ruta de prueba
app.get("/", (req, res) => res.send("Backend funcionando correctamente!"));

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos OK!");
    
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
};

startServer();
