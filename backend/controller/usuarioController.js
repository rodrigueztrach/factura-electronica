import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const usuario = await Usuario.create({
      nombre,
      email,
      password: hashed,
      rol
    });

    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

    const match = await bcrypt.compare(password, usuario.password);
    if (!match) return res.status(401).json({ error: "Credenciales inválidas" });

    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, usuario });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
