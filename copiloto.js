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

    <button id="cp-send" aria-label="Enviar">
  ↑
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


  // Ajusta la altura de #cp-chat con una transición suave: fija la altura
  // actual, deja que 'cambios()' añada/edite contenido, y luego anima hacia
  // la nueva altura (el max-height del CSS sigue limitando el máximo).
  _animarAltura(chat, cambios) {

    const start = chat.getBoundingClientRect().height;
    chat.style.transition = "none";
    chat.style.height = start + "px";
    void chat.offsetHeight; // fuerza reflow para que el paso anterior "cuente"

    cambios();

    const end = chat.scrollHeight;
    requestAnimationFrame(() => {
      chat.style.transition = "height .32s cubic-bezier(.22,.9,.32,1)";
      chat.style.height = end + "px";
      chat.scrollTop = chat.scrollHeight;
    });

    chat.addEventListener("transitionend", function handler(e) {
      if (e.propertyName !== "height") return;
      chat.style.height = ""; // vuelve a altura automática (deja hueco para seguir creciendo)
      chat.removeEventListener("transitionend", handler);
    }, { once: true });

  },

  agregarMensaje(tipo, texto) {

    const chat = document.getElementById("cp-chat");
    let msg;

    this._animarAltura(chat, () => {
      msg = document.createElement("div");
      msg.className = "cp-msg cp-msg-" + tipo;
      msg.textContent = texto;
      chat.appendChild(msg);
    });

    return msg;

  },

  // Burbuja con los tres puntos animados mientras se espera la respuesta.
  mostrarTyping() {

    const chat = document.getElementById("cp-chat");
    let msg;

    this._animarAltura(chat, () => {
      msg = document.createElement("div");
      msg.className = "cp-msg cp-msg-ai cp-typing";
      msg.innerHTML = `<span class="cp-dot"></span><span class="cp-dot"></span><span class="cp-dot"></span>`;
      chat.appendChild(msg);
    });

    return msg;

  },

  // Sustituye la burbuja de "escribiendo" por el texto real, animando el
  // cambio de altura si la respuesta ocupa más (o menos) que los puntos.
  resolverTyping(msgEl, texto) {

    const chat = document.getElementById("cp-chat");

    this._animarAltura(chat, () => {
      msgEl.classList.remove("cp-typing");
      msgEl.innerHTML = "";
      msgEl.textContent = texto;
    });

  },

async enviar(preguntaForzada) {

  const input = document.getElementById("cp-question");
  const pregunta = (preguntaForzada !== undefined ? preguntaForzada : input.value).trim();

  if (!pregunta) return;

  this.agregarMensaje("user", pregunta);

  input.value = "";

  const typingEl = this.mostrarTyping();

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

  this.resolverTyping(typingEl, data.respuesta || "No he podido responder.");

} catch (error) {

  this.resolverTyping(typingEl, "Ha ocurrido un error al conectar con el copiloto.");

  console.error(error);

}

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
