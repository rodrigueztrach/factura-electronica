import FacturaDetalle from "../models/FacturaDetalle.js";

export const obtenerDetalles = async (req, res) => {
  try {
    const detalles = await FacturaDetalle.findAll();
    res.json(detalles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearDetalle = async (req, res) => {
  try {
    const detalle = await FacturaDetalle.create(req.body);
    res.status(201).json(detalle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
