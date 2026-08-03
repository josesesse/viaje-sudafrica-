window.Copiloto = {

  
  modal: null,

  init() {

    this.modal = document.createElement("div");
    this.modal.id = "copiloto-modal";

    this.modal.innerHTML = `
      <div class="cp-backdrop">
        <div class="cp-window">

          <div class="cp-header">
            🦁 Copiloto
            <button id="cp-close">✕</button>
          </div>

          <div class="cp-body">

  <div id="cp-chat" class="cp-chat">

    <div class="cp-msg cp-msg-ai">
      👋 Hola. Soy tu copiloto del viaje.

      <br><br>

      Puedo ayudarte con el planning, hoteles, rutas, restaurantes y cualquier duda sobre el viaje.

    </div>

  </div>

  <div class="cp-input">

    <input
      id="cp-question"
      type="text"
      placeholder="Pregúntame cualquier cosa..."
    >

    <button id="cp-send">
      Preguntar
    </button>

  </div>

</div>

        </div>
      </div>
    `;

    this.modal.style.display = "none";

    document.body.appendChild(this.modal);

    document.getElementById("cp-close").onclick = () => this.cerrar();
    this.bind();

  },

  abrir(pregunta) {
    if (!this.modal) this.init(); // salvaguarda por si se llama antes de tiempo

    this.modal.style.display = "block";

    const input = document.getElementById("cp-question");

    if (pregunta) {
      input.value = pregunta;
      this.enviar(pregunta);
    } else {
      setTimeout(() => input && input.focus(), 50);
    }
  },

  cerrar() {
    this.modal.style.display = "none";
  },


  agregarMensaje(tipo, texto) {

  const chat = document.getElementById("cp-chat");

  const msg = document.createElement("div");
  msg.className = "cp-msg cp-msg-" + tipo;
  msg.textContent = texto;

  chat.appendChild(msg);

  chat.scrollTop = chat.scrollHeight;

  return msg;

},

async enviar(preguntaForzada) {

  const input = document.getElementById("cp-question");
  const pregunta = (preguntaForzada !== undefined ? preguntaForzada : input.value).trim();

  if (!pregunta) return;

  this.agregarMensaje("user", pregunta);

  input.value = "";

  const pensando = this.agregarMensaje("ai", "Pensando…");

  try {

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      pregunta: pregunta
    })
  });

  const data = await response.json();

  pensando.textContent = data.respuesta || "No he podido responder.";

} catch (error) {

  pensando.textContent = "Ha ocurrido un error al conectar con el copiloto.";

  console.error(error);

}

  const chat = document.getElementById("cp-chat");
  chat.scrollTop = chat.scrollHeight;

},

bind() {

  document.getElementById("cp-send").onclick = () => this.enviar();

  document.getElementById("cp-question")
    .addEventListener("keydown", (e) => {

      if (e.key === "Enter") this.enviar();

    });

}

  
};

window.addEventListener("DOMContentLoaded", () => Copiloto.init());
