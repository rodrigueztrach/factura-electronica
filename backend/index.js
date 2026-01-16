
import express from "express";
import cors from "cors";

// Importar rutas (suponiendo que tengas rutas separadas)
import clienteRoutes from "./routes/clienteRoutes.js";
import facturaRoutes from "./routes/facturaRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Permite que el frontend acceda al backend
app.use(express.json()); // Para poder recibir JSON en las peticiones

// Rutas
app.use("/api/cliente", clienteRoutes);
app.use("/api/factura", facturaRoutes);

// Ruta principal para probar que el backend funciona
app.get("/", (req, res) => {
  res.send("Backend funcionando correctamente!");
});

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
