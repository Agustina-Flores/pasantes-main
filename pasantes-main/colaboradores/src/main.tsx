import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
import FormEmpresa from "./pages/formEmpresa";
import FormColaborador from "./pages/formColaborador";
import Rutas from "./pages/rutas";
const root = document.getElementById("root");
if (root) {
  const rootElement = createRoot(root);
  rootElement.render(
    <Router basename="/colaboradores">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/r" element={<Rutas />} />
        <Route path="/formEmpresa" element={<FormEmpresa />} />
        <Route path="/formColaborador" element={<FormColaborador />} />

      </Routes>
    </Router>
  );
} else {
  console.error("No se pudo encontrar el elemento");
}
