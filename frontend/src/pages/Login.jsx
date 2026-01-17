import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/usuarios/login", {
        email: email.trim(),
        password: password.trim(),
      });

      // Guardar token y redirigir
      login(res.token);
      navigate("/dashboard"); // o la ruta principal de tu app
    } catch (err) {
      alert("Credenciales incorrectas");
      console.error(err);
    }
  };

  return (
    <form onSubmit={manejarSubmit}>
      <h2>Iniciar Sesión</h2>

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Entrar</button>

      <button
        type="button"
        onClick={() => navigate("/registro")}
        style={{ marginTop: "10px" }}
      >
        Crear nuevo usuario
      </button>
    </form>
  );
}
