import { navigateTo } from "../app.js";

export default function renderResultados() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <section id="resultados-section">
      <h1>Mira tus resultados en la pantalla</h1>
      <button id="end">Finalizar</button>
    </section>
  `;

  document.getElementById("end").addEventListener("click", () => {
    localStorage.removeItem("userId");

    // Solo por limpieza, aunque no hay otras secciones activas
    navigateTo("/");

    console.log("Sesión finalizada. Volviendo al inicio.");
  });
}
