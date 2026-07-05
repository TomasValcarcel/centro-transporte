/* ============================================
   TERMINAL LINIERS - Lógica JS
   Consulta de Viajes (datos simulados) + Chatbot FAQ
   ============================================ */
 
// ---------- DATOS SIMULADOS DE VIAJES ----------
// Basados en los ramales reales de Línea 109
const viajesSimulados = {
  "correo-central": {
    transporte: "Línea 109 - Ramal A",
    plataforma: "Andén 1",
    tiempoMin: 35,
    tiempoMax: 45,
    costo: 350,
    detalle: "Recorrido clásico por Av. Rivadavia. Frecuencia cada 6 minutos."
  },
  "ciudad-universitaria": {
    transporte: "Línea 109 - Ramal B",
    plataforma: "Andén 2",
    tiempoMin: 50,
    tiempoMax: 60,
    costo: 380,
    detalle: "Ramal extendido pensado para estudiantes. Frecuencia cada 10 minutos."
  },
  "centro-express": {
    transporte: "Línea 109 - Ramal C (Express)",
    plataforma: "Andén 3",
    tiempoMin: 25,
    tiempoMax: 30,
    costo: 420,
    detalle: "Servicio rápido por autopista. Frecuencia cada 15 minutos. Recomendado en hora pico."
  }
};
 
// ---------- LÓGICA DE CONSULTA DE VIAJES ----------
const formConsulta = document.getElementById("formConsulta");
 
if (formConsulta) {
  formConsulta.addEventListener("submit", function (evento) {
    evento.preventDefault();
 
    const destino = document.getElementById("destino").value;
    const contenedorResultado = document.getElementById("resultado");
 
    if (!destino) {
      contenedorResultado.innerHTML = `
        <div class="alerta-error">No seleccionaste un destino. Probá de nuevo.</div>
      `;
      contenedorResultado.classList.add("visible");
      return;
    }
 
    const viaje = viajesSimulados[destino];
 
    if (!viaje) {
      contenedorResultado.innerHTML = `
        <div class="alerta-error">
          No encontramos un transporte directo a ese destino desde la Terminal Liniers.
          Probá consultando en la Oficina de Información de la terminal.
        </div>
      `;
      contenedorResultado.classList.add("visible");
      return;
    }
 
    contenedorResultado.innerHTML = `
      <div class="tarjeta-resultado">
        <div class="franja-resultado">
          <h3>${viaje.transporte}</h3>
        </div>
        <div class="grid-datos-viaje">
          <div class="dato-viaje">
            <span class="etiqueta-dato">Plataforma</span>
            <span class="valor-dato">${viaje.plataforma}</span>
          </div>
          <div class="dato-viaje">
            <span class="etiqueta-dato">Tiempo estimado</span>
            <span class="valor-dato">${viaje.tiempoMin}-${viaje.tiempoMax} min</span>
          </div>
          <div class="dato-viaje">
            <span class="etiqueta-dato">Costo estimado</span>
            <span class="valor-dato">$${viaje.costo}</span>
          </div>
        </div>
        <p style="padding: 20px 25px; color:#4a5568;">${viaje.detalle}</p>
      </div>
    `;
    contenedorResultado.classList.add("visible");
  });
}
 
// ---------- CHATBOT DE PREGUNTAS FRECUENTES ----------
const respuestasFAQ = {
  "horarios": "La terminal está abierta las 24 horas. Línea 109 circula sin interrupciones, con menor frecuencia entre la 1 y las 5 de la madrugada.",
  "banos": "Los baños están ubicados en el sector central de la terminal, junto a las áreas de espera. Son de acceso libre y gratuito.",
  "estacionamiento": "El estacionamiento se encuentra en planta baja, con capacidad para autos y bicicletas. El primer hora es sin cargo para quienes vayan a tomar el colectivo.",
  "informacion": "La Oficina de Información está en el ingreso principal, frente a las plataformas. Atiende de 6 a 23 hs.",
  "comida": "Contamos con locales gastronómicos en el sector de espera, con opciones de cafetería y comidas rápidas.",
  "wifi": "Sí, la terminal ofrece WiFi gratuito en todas sus áreas comunes. Buscá la red 'Terminal-Liniers-Free'.",
  "default": "No tengo información exacta sobre eso. Te recomiendo consultar en la Oficina de Información de la terminal, o revisar la sección de Servicios."
};
 
function responderFAQ(clave) {
  return respuestasFAQ[clave] || respuestasFAQ["default"];
}
 
const chatbotMensajes = document.getElementById("chatbotMensajes");
const chips = document.querySelectorAll(".chip-pregunta");
 
if (chatbotMensajes && chips.length > 0) {
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      const pregunta = chip.textContent;
      const clave = chip.getAttribute("data-clave");
 
      // Mensaje del usuario
      const burbujaUsuario = document.createElement("div");
      burbujaUsuario.classList.add("mensaje", "usuario");
      burbujaUsuario.textContent = pregunta;
      chatbotMensajes.appendChild(burbujaUsuario);
 
      // Respuesta del bot
      const burbujaBot = document.createElement("div");
      burbujaBot.classList.add("mensaje", "bot");
      burbujaBot.textContent = responderFAQ(clave);
      chatbotMensajes.appendChild(burbujaBot);
 
      // Scroll automático al último mensaje
      chatbotMensajes.scrollTop = chatbotMensajes.scrollHeight;
    });
  });
}