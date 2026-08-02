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

            Próximamente...

          </div>

        </div>
      </div>
    `;

    this.modal.style.display = "none";

    document.body.appendChild(this.modal);

    document.getElementById("cp-close").onclick = () => this.cerrar();

  },

  abrir() {
    this.modal.style.display = "block";
  },

  cerrar() {
    this.modal.style.display = "none";
  }

};

window.addEventListener("load", () => Copiloto.init());
