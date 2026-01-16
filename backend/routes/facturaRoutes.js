import express from "express";
import Factura from "../models/Factura.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const facturas = await Factura.findAll({ include: "Cliente" });
    res.json(facturas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const nuevaFactura = await Factura.create(req.body);
    res.status(201).json(nuevaFactura);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
