import { navigateTo } from "../app.js";

export default function renderPiel() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <section id="piel-section">
      <h1>Vas muy bien</h1>
      <h2>Tu piel no necesita permiso para brillar</h2>
      <form id="skinToneForm">
        <label id="label-piel-claro"><input type="radio" name="skinTone" value="Claro" required /> Muy claro</label><br>
        <label id="label-piel-oliva"><input type="radio" name="skinTone" value="Oliva" /> Claro</label><br>
        <label id="label-piel-miel"><input type="radio" name="skinTone" value="Miel" /> Medio</label><br>
        <label id="label-piel-moreno"><input type="radio" name="skinTone" value="Moreno" /> Oscuro</label><br>
        <label id="label-piel-moreno-oscuro"><input type="radio" name="skinTone" value="Moreno oscuro" /> Muy oscuro</label><br>
        <button type="submit" id="skin-btn">Continuar</button>
      </form>
    </section>
  `;

  document.getElementById("skinToneForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const selectedSkin = document.querySelector('input[name="skinTone"]:checked');
    if (!selectedSkin) {
      alert("Selecciona un tono de piel");
      return;
    }
    const skinTone = selectedSkin.value;
    const userId = Number(localStorage.getItem("userId"));

    try {
      const response = await fetch('/form-skin-tone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, skinTone })
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Piel guardada:", data.user);
        navigateTo("/cabello");
      } else {
        alert("Error al guardar tono de piel");
      }
    } catch (error) {
      console.error(error);
    }
  });
}
