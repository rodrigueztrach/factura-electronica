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

    // Validación local de campos
    if (!nombre || !email || !password || !confirmPassword) {
      alert("Por favor completa todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      // Enviar datos al backend (endpoint correcto)
      await api.post("/usuarios/register", {
        nombre,
        email,
        password,
      });

      // Mostrar mensaje y redirigir a login
      alert("Registro exitoso. Ahora inicia sesión.");
      navigate("/login");
    } catch (err) {
      // Manejo seguro de errores
      if (err.response && err.response.data && err.response.data.msg) {
        alert("Error: " + err.response.data.msg);
      } else {
        alert("Error: no se pudo registrar");
        console.error(err);
      }
    }
  };

  return (
    <form
      onSubmit={manejarRegistro}
      style={{ maxWidth: "300px", margin: "auto" }}
    >
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
