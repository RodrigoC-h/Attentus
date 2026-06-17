export default class IntroView {

    constructor() {

        this.bindEvents();

    }

    bindEvents() {

        const btnPerfil =
            document.getElementById("btnPerfil");

        if (btnPerfil) {

            btnPerfil.addEventListener("click", () => {
                window.location.href = "login.html";

            });
        }
    }
}