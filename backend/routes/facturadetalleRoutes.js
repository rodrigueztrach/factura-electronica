import express from "express";
import FacturaDetalle from "../models/FacturaDetalle.js";

const router = express.Router();

// Obtener todos los detalles de factura
router.get("/", async (req, res) => {
  try {
    const detalles = await FacturaDetalle.findAll();
    res.json(detalles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear un nuevo detalle de factura
router.post("/", async (req, res) => {
  try {
    const nuevoDetalle = await FacturaDetalle.create(req.body);
    res.status(201).json(nuevoDetalle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un detalle por id
router.get("/:id", async (req, res) => {
  try {
    const detalle = await FacturaDetalle.findByPk(req.params.id);
    if (!detalle) {
      return res.status(404).json({ error: "Detalle no encontrado" });
    }
    res.json(detalle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un detalle de factura
router.put("/:id", async (req, res) => {
  try {
    const detalle = await FacturaDetalle.findByPk(req.params.id);
    if (!detalle) {
      return res.status(404).json({ error: "Detalle no encontrado" });
    }
    await detalle.update(req.body);
    res.json(detalle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un detalle de factura
router.delete("/:id", async (req, res) => {
  try {
    const detalle = await FacturaDetalle.findByPk(req.params.id);
    if (!detalle) {
      return res.status(404).json({ error: "Detalle no encontrado" });
    }
    await detalle.destroy();
    res.json({ message: "Detalle eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
