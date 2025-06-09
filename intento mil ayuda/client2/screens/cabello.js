import { navigateTo } from "../app.js";

export default function renderCabello() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <section id="cabello-section">
      <h2>¡Solo una más!</h2>
      <form id="hairColorForm">
        <label><input type="radio" name="hairColor" value="Negro" required /> Negro</label><br>
        <label><input type="radio" name="hairColor" value="Castaño" /> Castaño</label><br>
        <label><input type="radio" name="hairColor" value="Rubio" /> Rubio</label><br>
        <label><input type="radio" name="hairColor" value="Pelirrojo" /> Pelirrojo</label><br>
        <button type="submit" id="hair-btn">Continuar</button>
      </form>
    </section>
  `;

  document.getElementById("hairColorForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const selectedHair = document.querySelector('input[name="hairColor"]:checked');
    if (!selectedHair) {
      alert("Selecciona un color de cabello");
      return;
    }
    const hairColor = selectedHair.value;
    const userId = Number(localStorage.getItem("userId"));

    try {
      const response = await fetch('/form-hair-color', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, hairColor })
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Cabello guardado:", data.user);
        navigateTo("/ojos");
      } else {
        alert("Error al guardar color de cabello");
      }
    } catch (error) {
      console.error(error);
    }
  });
}
