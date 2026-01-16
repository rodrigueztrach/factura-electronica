import { useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      // 🔥 Ruta corregida: ahora coincide con tu backend
      const res = await api.post("/usuarios/login", { email, password });

      login(res.data.token); // Guarda token en contexto
    } catch (err) {
      alert("Credenciales incorrectas");
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
    </form>
  );
}
