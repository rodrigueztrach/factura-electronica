import express from "express";
import { registrarUsuario, loginUsuario } from "../controller/authController.js";

const router = express.Router();

// Ruta para registrar usuario
router.post("/register", registrarUsuario);

// Ruta para login
router.post("/login", loginUsuario);

export default router;
