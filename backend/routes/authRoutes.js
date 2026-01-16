import express from "express";
import { loginUsuario } from "../controller/authController.js";

const router = express.Router();

router.post("/login", loginUsuario);

export default router;
