// backend/routes/clienteRoutes.js
import express from "express";
const router = express.Router();

// Datos de prueba
let clientes = [
  { id: 1, nombre: "Juan Perez", email: "juan@mail.com" },
  { id: 2, nombre: "Maria Lopez", email: "maria@mail.com" }
];

// Obtener todos los clientes
router.get("/", (req, res) => {
  res.json(clientes);
});

// Crear un nuevo cliente
router.post("/", (req, res) => {
  const nuevoCliente = {
    id: clientes.length + 1,
    ...req.body
  };
  clientes.push(nuevoCliente);
  res.status(201).json(nuevoCliente);
});

export default router;
