import HeaderComponent from "../components/HeaderComponent.js";

export default class PerfilView {

    constructor() {

        new HeaderComponent();

        this.bindEvents();

    }

    bindEvents() {

        const btnEditar =
            document.getElementById("btnEditar");

        const btnLogout =
            document.getElementById("btnLogout");

        if (btnEditar) {

            btnEditar.addEventListener("click", () => {
                window.location.href = "loja.html";

            });
        }

        if (btnLogout) {

            btnLogout.addEventListener("click", () => {
                window.location.href = "login.html";

            });
        }
    }
}
