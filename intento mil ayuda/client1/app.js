import renderInicio from "./screens/inicio.js";
import renderMedidas from "./screens/medidas.js";
import renderPiel from "./screens/piel.js";
import renderCabello from "./screens/cabello.js";
import renderOjos from "./screens/ojos.js";
import renderResultados from "./screens/resultados.js";

const socket = io("http://localhost:5050", { path: "/real-time" });

function clearApp() {
  document.getElementById("app").innerHTML = "";
}

function renderRoute(path) {
  clearApp();
  switch (path) {
    case "/":
      renderInicio();
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

function navigateTo(path) {
  renderRoute(path);
}

// === Socket.io ===
socket.on("registro-completado", () => {
  navigateTo("/medidas");
});

socket.on("formulario-completado", (data) => {
  switch (data.form) {
    case "body-measurements":
      navigateTo("/piel");
      break;
    case "skin-tone":
      navigateTo("/cabello");
      break;
    case "hair-color":
      navigateTo("/ojos");
      break;
    case "eye-color":
      navigateTo("/resultados");
      break;
    default:
      console.log("Formulario no reconocido:", data.form);
  }
});

// Inicia con pantalla de inicio
navigateTo("/");

export { socket };
