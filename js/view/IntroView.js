export default class IntroView {

    constructor() {

        this.bindEvents();

    }

    bindEvents() {

        const cardReacao =
            document.getElementById("cardReacao");

        const cardSequencia =
            document.getElementById("cardSequencia");

        const cardAlvo =
            document.getElementById("cardAlvo");

        if (cardReacao) {

            cardReacao.addEventListener(
                "click",
                () => {

                    window.location.href =
                        "jogo.html?game=reacao&tutorial=true";

                }
            );

        }

        if (cardSequencia) {

            cardSequencia.addEventListener(
                "click",
                () => {

                    window.location.href =
                        "jogo.html?game=sequencia&difficulty=facil&level=0&tutorial=true";

                }
            );

        }

        if (cardAlvo) {

            cardAlvo.addEventListener(
                "click",
                () => {

                    window.location.href =
                        "jogo.html?game=alvo&difficulty=facil&level=0&tutorial=true";

                }
            );

        }

        const btnContinuar =
            document.getElementById("btnContinuar");

        if (btnContinuar) {

            btnContinuar.addEventListener(
                "click",
                () => {

                    window.location.href =
                        "login.html";

                }
            );

        }

    }

}