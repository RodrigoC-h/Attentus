import HeaderComponent from "../components/HeaderComponent.js";
import UserModel from "../model/UserModel.js";

export default class PerfilView {

    constructor() {

        if (!UserModel.isLoggedIn()) {

            window.location.href =
                "login.html";

            return;

        }        

        new HeaderComponent();

        this.loadUserData();

        this.bindEvents();

    }

    loadUserData() {

        const username =
            document.getElementById("username");

        const saldo =
            document.getElementById("saldo");

        if (username) {

            username.textContent =
                UserModel.getUsername();

        }

        if (saldo) {

            saldo.textContent =
                `${UserModel.getCoins()} 🪙`;

        }

    }

    bindEvents() {

        const btnEditar =
            document.getElementById("btnEditar");

        const btnLogout =
            document.getElementById("btnLogout");

        if (btnEditar) {

            btnEditar.addEventListener("click", () => {

                window.location.href =
                    "loja.html";

            });

        }

        if (btnLogout) {

            btnLogout.addEventListener("click", () => {

                UserModel.logout();

                window.location.href =
                    "login.html";

            });

        }

    }

}