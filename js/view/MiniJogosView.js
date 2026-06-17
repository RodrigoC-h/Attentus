import HeaderComponent from "../components/HeaderComponent.js";
import UserModel from "../model/UserModel.js";

export default class MiniJogosView {

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

        const cardReacao =
            document.getElementById("cardReacao");

        const cardFoco =
            document.getElementById("cardFoco");

        const cardSequencia =
            document.getElementById("cardSequencia");

        const cardAlvo =
            document.getElementById("cardAlvo");

        if (cardReacao) {

            cardReacao.addEventListener("click", () => {

                window.location.href =
                    "jogo.html?game=reacao";

            });

        }

        if (cardFoco) {

            cardFoco.addEventListener("click", () => {

                window.location.href =
                    "jogo.html?game=foco";

            });

        }

        if (cardSequencia) {

            cardSequencia.addEventListener("click", () => {

                window.location.href =
                    "dificuldade.html?game=sequencia";

            });

        }

        if (cardAlvo) {

                cardAlvo.addEventListener("click", () => {

                    window.location.href =
                        "dificuldade.html?game=alvo";

                });

            }

    }

}