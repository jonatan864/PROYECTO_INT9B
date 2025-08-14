function togglePassword() {
      const input = document.getElementById("contraseña");
      const icon = document.querySelector(".toggle-password");

      // Cambiar tipo de input
      if (input.type === "password") {
        input.type = "text";     // Muestra lo que se escribe
        icon.textContent = "🙈"; // Cambia ícono a 'ocultar'
      } else {
        input.type = "password"; // Oculta lo que se escribe
        icon.textContent = "👁️"; // Cambia ícono a 'mostrar'
      }
    }

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const usuario = document.getElementById('usuario').value;
  const contraseña = document.getElementById('contraseña').value;

  fetch("http://10.10.38.7:3000/usuarios/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ usuario, contraseña })
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`Error del servidor: ${res.status}`);
    }
    return res.json();
  })
  .then(data => {
    console.log("Respuesta:", data);

    const rol = data.usuario.rol;

    if (rol === "Administrador") {
      window.location.href = "InicioAdmin.html";
    } else if (rol === "Empleado") {
      window.location.href = "InicioEmpleado.html";
    } else {
      alert("Rol desconocido o no autorizado. Rol recibido: " + rol);
    }
  })
  .catch(err => {
    console.error("Error:", err);
    alert("Error al iniciar sesión. Verifica tus credenciales.");
  });
});
