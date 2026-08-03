function mdToHtml(texto){
  // Escapar HTML primero, por seguridad
  let s = texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Negrita **texto**
  s = s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Encabezados markdown (#, ##, ###) -> línea en negrita
  s = s.replace(/^#{1,6}\s?(.+)$/gm, "<strong>$1</strong>");

  // Listas "- item" o "* item" -> <li>
  s = s.replace(/^[*-]\s+(.+)$/gm, "<li>$1</li>");
  s = s.replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>");

  // Saltos de línea restantes
  s = s.replace(/\n{2,}/g, "<br><br>");
  s = s.replace(/\n/g, "<br>");

  return s;
}

function renderCopilotoContent(container, texto){
  container.innerHTML = "";
  const regex = /\[\[(DIA|ALOJAMIENTO|MAPA):([^\]]+)\]\]/g;
  let lastIndex = 0, match;

  function appendText(fragment){
    if(!fragment.trim()) return;
    const p = document.createElement("div");
    p.innerHTML = mdToHtml(fragment);
    container.appendChild(p);
  }

  while((match = regex.exec(texto))){
    appendText(texto.slice(lastIndex, match.index));
    const tipo = match[1];
const valor = match[2];

if(tipo === "DIA" || tipo === "ALOJAMIENTO"){

    const dayNum = Number(valor);

    const day = (typeof TRIP !== "undefined")
        ? TRIP.days.find(d => d.day === dayNum)
        : null;

    if(day){

        container.appendChild(
            tipo === "DIA"
                ? buildDayCard(day)
                : buildStayCard(day)
        );

    }

}
else if(tipo === "MAPA"){

    const partes = valor.split(",");
    const lat = Number(partes[0]);
    const lng = Number(partes[1]);
    const etiqueta = partes.slice(2).join(",").trim();

    if(!isNaN(lat) && !isNaN(lng)){

        const mapa = document.createElement("div");

        renderMapCard(
            mapa,
            lat,
            lng,
            etiqueta
        );

        container.appendChild(mapa);

    }

}
    lastIndex = regex.lastIndex;
  }
  appendText(texto.slice(lastIndex));
}

function buildDayCard(day){
  const card = document.createElement("button");
  card.type = "button";
  card.className = "cp-card cp-card-day";
  card.innerHTML = `
    <div class="cp-card-top">
  <span class="cp-card-daytag">Día ${day.day}</span>

  <div style="display:flex;align-items:center;gap:8px;">
    <span class="cp-card-route">${day.fromCode} → ${day.toCode}</span>
    <span class="cp-card-arrow">›</span>
  </div>
</div>
    <div class="cp-card-title">${day.subtitle || day.title}</div>
    <div class="cp-card-sub">${day.summary}</div>
  `;
  card.addEventListener("click", () => {
    Copiloto.cerrar();
    if(typeof openDay === "function") openDay(day.day);
  });
  return card;
}

function buildStayCard(day){
  const card = document.createElement("button");
  card.type = "button";
  card.className = "cp-card cp-card-stay";
  card.innerHTML = `
    <div class="cp-card-top">
  <span class="cp-card-daytag">Día ${day.day}</span>
  <span class="cp-card-arrow">›</span>
</div>
    <div class="cp-card-title">🏨 ${day.stay.name}</div>
    <div class="cp-card-sub">${day.stay.area || ""}</div>
  `;
  card.addEventListener("click", () => {
    Copiloto.cerrar();
    if(typeof openDay === "function") openDay(day.day);
  });
  return card;
}

function renderMapCard(container, lat, lng, etiqueta){
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  container.innerHTML = `
    <div class="cp-map"></div>
    <div class="cp-map-actions">
      <a href="${googleMapsUrl}" target="_blank" rel="noopener" class="cp-map-action">🗺️ Abrir en Google Maps</a>
    </div>
  `;
  const mapDiv = container.querySelector(".cp-map");
  const map = L.map(mapDiv, {
    zoomControl: false,
    attributionControl: false
  });
  map.setView([lat, lng], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom:19
  }).addTo(map);
  const marker = L.marker([lat, lng]).addTo(map);
  if(etiqueta){
    marker.bindPopup(etiqueta).openPopup();
  }
  // Leaflet necesita recalcular el tamaño cuando el div ya existe
  setTimeout(() => map.invalidateSize(), 50);
}



window.Copiloto = {

  
  modal: null,

  init() {

    this.modal = document.createElement("div");
    this.modal.id = "copiloto-modal";

    this.modal.innerHTML = `
      <div class="cp-backdrop">
        <div class="cp-window">

          <div class="cp-header">
  <span class="cp-header-title"><span class="cp-header-emoji">🦁</span>Copiloto</span>
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

    function ajustarScroll(){
      if(scrollToEl){
        chat.scrollTop = Math.max(0, scrollToEl.offsetTop - 8);
      } else {
        chat.scrollTop = chat.scrollHeight;
      }
    }
    
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

    if (tipo === "ai") {

      renderCopilotoContent(msg, texto);

    } else {

      msg.textContent = texto;

    }

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
    msg.innerHTML = `
      <span class="cp-dot"></span>
      <span class="cp-dot"></span>
      <span class="cp-dot"></span>
    `;
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
      renderCopilotoContent(msgEl, texto);
    }, msgEl);

  },

async enviar(preguntaForzada) {

  const input = document.getElementById("cp-question");
  const pregunta = (preguntaForzada !== undefined ? preguntaForzada : input.value).trim();

  if (!pregunta) return;

  this.agregarMensaje("user", pregunta);

  input.value = "";

  const typingEl = this.mostrarTyping();

  try {

  const ubicacion = JSON.parse(localStorage.getItem("ubicacion"));

const response = await fetch("/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    pregunta,
    ubicacion
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




