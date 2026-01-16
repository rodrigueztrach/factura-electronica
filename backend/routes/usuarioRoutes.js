import express from "express";
import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verificarToken } from "../middleware/authMiddleware.js";
import { verificarRol } from "../middleware/roleMiddleware.js";

const router = express.Router();


router.post("/register", async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    const existe = await Usuario.findOne({ where: { email } });
    if (existe) return res.status(400).json({ error: "El correo ya está registrado" });

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
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

    const match = await bcrypt.compare(password, usuario.password);
    if (!match) return res.status(401).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ mensaje: "Login exitoso", token, usuario });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//OBTENER PERFIL 

router.get("/perfil", verificarToken, async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.user.id);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//SOLO ADMIN

router.get("/admin", verificarToken, verificarRol("admin"), (req, res) => {
  res.json({ mensaje: "Bienvenido administrador" });
});


//OBTENER TODOS LOS USUARIOS

router.get("/", verificarToken, verificarRol("admin"), async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//OBTENER POR ID

router.get("/:id", verificarToken, async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//ACTUALIZAR USUARIO

router.put("/:id", verificarToken, async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    await usuario.update(req.body);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete("/:id", verificarToken, verificarRol("admin"), async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

    await usuario.destroy();
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
