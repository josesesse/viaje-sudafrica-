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

  abrir() {
    this.modal.style.display = "block";
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

},

async enviar() {
  
  const input = document.getElementById("cp-question");
  const pregunta = input.value.trim();

  if (!pregunta) return;

  this.agregarMensaje("user", pregunta);

  input.value = "";

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

  this.agregarMensaje(
    "ai",
    data.respuesta || "No he podido responder."
  );

} catch (error) {

  this.agregarMensaje(
    "ai",
    "Ha ocurrido un error al conectar con el copiloto."
  );

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
