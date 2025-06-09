import renderRegister from "./screens/register.js";
import renderMedidas from "./screens/medidas.js";
import renderPiel from "./screens/piel.js";
import renderCabello from "./screens/cabello.js";
import renderOjos from "./screens/ojos.js";
import renderResultados from "./screens/resultados.js";

const socket = io("http://localhost:5050", { path: "/real-time" });

let route = { path: "/", data: {} };

function clearApp() {
  document.getElementById("app").innerHTML = "";
}

function renderRoute(path, data = {}) {
  clearApp();
  route = { path, data };
  switch (path) {
    case "/":
      renderRegister();
      break;  
    case "/medidas":
      renderMedidas();
      break;
    case "/piel":
      renderPiel();
      break;
    case "/cabello":
      renderCabello();
      break;
    case "/ojos":
      renderOjos();
      break;
    case "/resultados":
      renderResultados();
      break;
    default:
      document.getElementById("app").innerHTML = "<h1>404 - No encontrado</h1>";
  }
}

function navigateTo(path, data = {}) {
  renderRoute(path, data);
}

// Inicia con pantalla de inicio
navigateTo("/");
export { socket, navigateTo };
