import HeaderComponent from "../components/HeaderComponent.js";
import UserModel from "../model/UserModel.js";

export default class PerfilView {

    constructor() {

        if (!UserModel.isLoggedIn()) {

            window.location.href =
                "login.html";

            return;

        }

        UserModel.ensureInventory();

        new HeaderComponent();

        this.loadUserData();

        this.bindEvents();

    }

    loadUserData() {

        const username =
            document.getElementById(
                "username"
            );

        const saldo =
            document.getElementById(
                "saldo"
            );

        const level =
            document.getElementById(
                "level"
            );

        const xpText =
            document.getElementById(
                "xpText"
            );

        const xpFill =
            document.getElementById(
                "xpFill"
            );

        if (username) {

            username.textContent =
                UserModel.getUsername();

        }

        if (saldo) {

            saldo.textContent =
                `${UserModel.getCoins()} 🪙`;

        }

        const xp =
            UserModel.getXp();

        const currentLevel =
            UserModel.getLevel();

        const xpNeeded =
            currentLevel * 100;

        if (level) {

            level.textContent =
                currentLevel;

        }

        if (xpText) {

            xpText.textContent =
                `${xp} / ${xpNeeded}`;

        }

        if (xpFill) {

            xpFill.style.width =
                `${Math.min(
                    (xp / xpNeeded) * 100,
                    100
                )}%`;

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