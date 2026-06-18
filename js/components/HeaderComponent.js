export default class HeaderComponent {

    constructor() {

        this.bindEvents();

    }

    bindEvents() {

        // =========================
        // ELEMENTOS DO HEADER
        // =========================

        const logo =
            document.getElementById(
                "logo"
            );

        const btnPerfil =
            document.getElementById(
                "btnPerfil"
            );

        const btnAdmin =
            document.getElementById(
                "btnAdmin"
            );

        // =========================
        // VISIBILIDADE DO BOTÃO ADMIN
        // =========================
        // Apenas mostra o botão
        // se o utilizador for admin

        if (

            btnAdmin &&

            localStorage.getItem(
                "isAdmin"
            ) === "true"

        ) {

            btnAdmin.style.display =
                "block";

        }

        // =========================
        // LOGÓTIPO
        // =========================
        // Volta para a homepage

        if (logo) {

            logo.addEventListener(
                "click",
                () => {

                    window.location.href =
                        "homepage.html";

                }
            );

        }

        // =========================
        // PERFIL
        // =========================
        // Abre a página de perfil

        if (btnPerfil) {

            btnPerfil.addEventListener(
                "click",
                () => {

                    window.location.href =
                        "perfil.html";

                }
            );

        }

        // =========================
        // ADMIN
        // =========================
        // Abre o painel de administração

        if (btnAdmin) {

            btnAdmin.addEventListener(
                "click",
                () => {

                    window.location.href =
                        "admin.html";

                }
            );

        }

    }

}