import HeaderComponent from "../components/HeaderComponent.js";
import UserModel from "../model/UserModel.js";

export default class DificuldadeView {

    constructor() {

        if (!UserModel.isLoggedIn()) {

            window.location.href =
                "login.html";

            return;

        }

        new HeaderComponent();

        this.bindEvents();

    }

    bindEvents() {

        const game =
            new URLSearchParams(window.location.search)
                .get("game");

        const btnFacil =
            document.getElementById("btnFacil");

        const btnMedio =
            document.getElementById("btnMedio");

        const btnDificil =
            document.getElementById("btnDificil");

        const btnVoltar =
            document.getElementById("btnVoltar");

        if (btnVoltar) {

            btnVoltar.addEventListener("click", () => {

                window.location.href =
                    "mini-jogos.html";

            });

        }

        if (game === "escape") {

            if (btnFacil) {

                btnFacil.addEventListener("click", () => {

                    window.location.href =
                        "jogo.html?game=escape&difficulty=facil";

                });

            }

            if (btnMedio) {

                btnMedio.addEventListener("click", () => {

                    window.location.href =
                        "jogo.html?game=escape&difficulty=medio";

                });

            }

            if (btnDificil) {

                btnDificil.addEventListener("click", () => {

                    window.location.href =
                        "jogo.html?game=escape&difficulty=dificil";

                });

            }

        }

        if (
            game === "sequencia" ||
            game === "organizacao" ||
            game === "alvo"
        ) {

            if (btnFacil) {

                btnFacil.addEventListener("click", () => {

                    window.location.href =
                        `niveis.html?game=${game}&difficulty=facil`;

                });

            }

            if (btnMedio) {

                btnMedio.addEventListener("click", () => {

                    window.location.href =
                        `niveis.html?game=${game}&difficulty=medio`;

                });

            }

            if (btnDificil) {

                btnDificil.addEventListener("click", () => {

                    window.location.href =
                        `niveis.html?game=${game}&difficulty=dificil`;

                });

            }

        }
    }
}