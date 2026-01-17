import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Registro from "./pages/Registro";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="*" element={<Navigate to="/login" />} /> {/* Redirige cualquier ruta desconocida */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
