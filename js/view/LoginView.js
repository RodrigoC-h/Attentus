export default class LoginView {

    constructor() {

        this.bindEvents();
        this.bindSwitch();

    }

    bindEvents() {

        const btnEntrar =
            document.getElementById("btnEntrar");

        const btnCriarConta =
            document.getElementById("btnCriarConta");

        if (btnEntrar) {

            btnEntrar.addEventListener("click", (event) => {

                event.preventDefault();

                window.location.href = "homepage.html";

            });

        }

        if (btnCriarConta) {

            btnCriarConta.addEventListener("click", (event) => {

                event.preventDefault();

                window.location.href = "homepage.html";

            });

        }

    }

    bindSwitch() {

        const btnLogin =
            document.getElementById("btnLogin");

        const btnRegisto =
            document.getElementById("btnRegisto");

        const loginForm =
            document.getElementById("loginForm");

        const registoForm =
            document.getElementById("registoForm");

        if (
            !btnLogin ||
            !btnRegisto ||
            !loginForm ||
            !registoForm
        ) {
            return;
        }

        btnLogin.addEventListener("click", () => {

            btnLogin.classList.add("active");
            btnRegisto.classList.remove("active");

            loginForm.classList.remove("hidden");
            registoForm.classList.add("hidden");

        });

        btnRegisto.addEventListener("click", () => {

            btnRegisto.classList.add("active");
            btnLogin.classList.remove("active");

            registoForm.classList.remove("hidden");
            loginForm.classList.add("hidden");

        });

    }

}