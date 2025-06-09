import { navigateTo } from "../app.js";

export default function renderRegister() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <section id="register-section">
      <h2 id="titulo-registro">Registro</h2>
      <form id="registerForm">
        <input type="text" id="name" placeholder="Nombre" required />
        <input type="email" id="email" placeholder="Correo" required />
        <button type="submit" id="register-btn">Registrarse</button>
      </form>
    </section>
  `;

  document.getElementById("registerForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    try {
      const response = await fetch('/users-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("userId", data.user.id);
        console.log("Usuario registrado:", data.user);
        navigateTo("/medidas");
      } else {
        alert("Error al registrar el usuario");
      }
    } catch (error) {
      console.error(error);
    }
  });
}
