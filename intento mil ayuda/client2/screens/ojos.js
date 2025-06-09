import { navigateTo } from "../app.js";

export default function renderOjos() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <section id="ojos-section">
      <h1>¡Acabamos!</h1>
      <h2>Que tu mirada hable por sí sola</h2>
      <form id="eyeColorForm">
        <label><input type="radio" name="eyeColor" value="Marrones" required /> Marrón</label><br>
        <label><input type="radio" name="eyeColor" value="Azules" /> Azul</label><br>
        <label><input type="radio" name="eyeColor" value="Verdes" /> Verde</label><br>
        <label><input type="radio" name="eyeColor" value="Negros" /> Gris</label><br>
        <button type="submit" id="eyes-btn">Ver resultados</button>
      </form>
    </section>
  `;

  document.getElementById("eyeColorForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const selectedEye = document.querySelector('input[name="eyeColor"]:checked');
    if (!selectedEye) {
      alert("Selecciona un color de ojos");
      return;
    }
    const eyeColor = selectedEye.value;
    const userId = Number(localStorage.getItem("userId"));

    try {
      const response = await fetch('/form-eyes-color', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, eyeColor })
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Ojos guardados:", data.user);
        navigateTo("/resultados");
      } else {
        alert("Error al guardar color de ojos");
      }
    } catch (error) {
      console.error(error);
    }
  });
}
