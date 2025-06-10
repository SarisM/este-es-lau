import { navigateTo } from "../app.js";

export default function renderMedidas() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <section id="medidas-section">
      <h1 id="titulo-medidas" >Empecemos</h1>
      <h2 id="subtitulo-medidas" >La moda se adapta a ti</h2>
      <form id="bodyForm">
        <input type="number" id="shoulders" placeholder="Hombros" required />
        <input type="number" id="waist" placeholder="Cintura" required />
        <input type="number" id="hips" placeholder="Caderas" required />
        <button type="submit" id="medidas-btn">Continuar</button>
      </form>
    </section>
  `;

  document.getElementById("bodyForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const userId = Number(localStorage.getItem("userId"));
    const shoulders = document.getElementById("shoulders").value;
    const waist = document.getElementById("waist").value;
    const hips = document.getElementById("hips").value;

    try {
      const response = await fetch('/form-body-measurements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, shoulders, waist, hips })
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Medidas registradas:", data.user);
        navigateTo("/piel");
      } else {
        alert("Error al guardar medidas");
      }
    } catch (error) {
      console.error(error);
    }
  });
}
