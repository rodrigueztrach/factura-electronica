// backend/routes/facturaRoutes.js
import express from "express";
const router = express.Router();

// Datos de prueba
let facturas = [
  { id: 1, clienteId: 1, total: 500 },
  { id: 2, clienteId: 2, total: 1200 }
];

// Obtener todas las facturas
router.get("/", (req, res) => {
  res.json(facturas);
});

// Crear una nueva factura
router.post("/", (req, res) => {
  const nuevaFactura = {
    id: facturas.length + 1,
    ...req.body
  };
  facturas.push(nuevaFactura);
  res.status(201).json(nuevaFactura);
});

export default router;
