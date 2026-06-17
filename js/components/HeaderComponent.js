export default class HeaderComponent {

    constructor() {
        this.bindEvents();
    }

    bindEvents() {

        const logo = document.getElementById("logo");
        const btnPerfil = document.getElementById("btnPerfil");
        const btnDefinicoes = document.getElementById("btnDefinicoes");

        if (logo) {
            logo.addEventListener("click", () => {
                window.location.href = "homepage.html";
            });
        }

        if (btnPerfil) {
            btnPerfil.addEventListener("click", () => {
                window.location.href = "perfil.html";
            });
        }

        if (btnDefinicoes) {
            btnDefinicoes.addEventListener("click", () => {
                window.location.href = "definicoes.html";
            });

        }
    }
}