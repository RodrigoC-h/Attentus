import StorageManager from "../managers/StorageManager.js";
import UserModel from "../model/UserModel.js";

export default class LoginView {

    constructor() {

        StorageManager.initialize();

        UserModel.ensureAdminUser();

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

                const usernameOrEmail =
                    document.getElementById("loginUser").value;

                const password =
                    document.getElementById("loginPassword").value;

                if (
                    usernameOrEmail.trim() === "" ||
                    password.trim() === ""
                ) {

                    alert("Preencha todos os campos.");

                    return;

                }

                const success =
                    UserModel.login(usernameOrEmail, password);

                if (success) {

                    window.location.href = "homepage.html";

                } else {

                    alert("Utilizador ou palavra-passe incorretos.");

                }

            });

        }

        if (btnCriarConta) {

            btnCriarConta.addEventListener("click", (event) => {

                event.preventDefault();

                const username =
                    document.getElementById("registerUsername").value;

                const email =
                    document.getElementById("registerEmail").value;

                const password =
                    document.getElementById("registerPassword").value;

                const confirmPassword =
                    document.getElementById("registerConfirmPassword").value;

                if (
                    username.trim() === "" ||
                    email.trim() === "" ||
                    password.trim() === "" ||
                    confirmPassword.trim() === ""
                ) {

                    alert("Preencha todos os campos.");

                    return;

                }

                if (password !== confirmPassword) {

                    alert("As palavras-passe não coincidem.");

                    return;

                }

                const success =
                    UserModel.register(username, email, password);

                if (success) {

                    window.location.href = "homepage.html";

                } else {

                    alert("Já existe uma conta com esse utilizador ou email.");

                }

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

        if (!btnLogin || !btnRegisto || !loginForm || !registoForm) {
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

new LoginView();
