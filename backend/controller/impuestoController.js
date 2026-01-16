import Impuesto from "../models/Impuesto.js";

export const obtenerImpuestos = async (req, res) => {
  try {
    const impuestos = await Impuesto.findAll();
    res.json(impuestos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearImpuesto = async (req, res) => {
  try {
    const nuevo = await Impuesto.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
