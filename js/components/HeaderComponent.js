export default class HeaderComponent {

    constructor() {
        this.bindEvents();
    }

    bindEvents() {

        const btnAdmin = document.getElementById("btnAdmin");
        const logo = document.getElementById("logo");
        const btnPerfil = document.getElementById("btnPerfil");

        if (

            btnAdmin &&

            localStorage.getItem(
                "isAdmin"
            ) === "true"

        ) {

            btnAdmin.style.display =
                "block";

        }

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