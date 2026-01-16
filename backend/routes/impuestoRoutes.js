import express from "express";
import Impuesto from "../models/Impuesto.js";

const router = express.Router();

// Obtener todos los impuestos
router.get("/", async (req, res) => {
  try {
    const impuestos = await Impuesto.findAll();
    res.json(impuestos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un impuesto por ID
router.get("/:id", async (req, res) => {
  try {
    const impuesto = await Impuesto.findByPk(req.params.id);
    if (!impuesto) {
      return res.status(404).json({ error: "Impuesto no encontrado" });
    }
    res.json(impuesto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear un nuevo impuesto
router.post("/", async (req, res) => {
  try {
    const nuevoImpuesto = await Impuesto.create(req.body);
    res.status(201).json(nuevoImpuesto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un impuesto
router.put("/:id", async (req, res) => {
  try {
    const impuesto = await Impuesto.findByPk(req.params.id);
    if (!impuesto) {
      return res.status(404).json({ error: "Impuesto no encontrado" });
    }
    await impuesto.update(req.body);
    res.json(impuesto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un impuesto
router.delete("/:id", async (req, res) => {
  try {
    const impuesto = await Impuesto.findByPk(req.params.id);
    if (!impuesto) {
      return res.status(404).json({ error: "Impuesto no encontrado" });
    }
    await impuesto.destroy();
    res.json({ message: "Impuesto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;