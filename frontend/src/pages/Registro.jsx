import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const manejarRegistro = async (e) => {
    e.preventDefault();

    if (!nombre || !email || !password || !confirmPassword) {
      alert("Por favor completa todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      await api.post("/usuarios/register", {
        nombre: nombre.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      alert("Registro exitoso. Ahora inicia sesión.");
      navigate("/login");
    } catch (err) {
      alert("Error: " + err.message);
      console.error(err);
    }
  };

  return (
    <form onSubmit={manejarRegistro} style={{ maxWidth: "300px", margin: "auto" }}>
      <h2>Crear Cuenta</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />

      <input
        type="password"
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />

      <button type="submit" style={{ width: "100%" }}>
        Registrarse
      </button>
    </form>
  );
}
