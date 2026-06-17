export default class HeaderComponent {

    constructor() {
        this.bindEvents();
    }

    bindEvents() {

        const logo = document.getElementById("logo");
        const btnPerfil = document.getElementById("btnPerfil");
        const btnDefinicoes = document.getElementById("btnDefinicoes");
        const btnMaisJogos = document.getElementById("btnMaisJogos");
        const logoutBtn = document.querySelector(".logout-btn");

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

        if (btnMaisJogos) {
            btnMaisJogos.addEventListener("click", () => {
                window.location.href = "mini-jogos.html";
            });
        }

        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => {
                import("../model/UserModel.js").then(({ default: UserModel }) => {
                    UserModel.logout();
                    window.location.href = "login.html";
                });
            });
        }

    }

}
