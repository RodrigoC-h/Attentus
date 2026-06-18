import UserModel from "../model/UserModel.js";

export default class IntroView {

    // =========================
    // INICIALIZAÇÃO
    // =========================
    // Liga os cartões dos
    // tutoriais do intro

    constructor() {

        this.bindEvents();

    }

    // =========================
    // EVENTOS DOS CARTÕES
    // =========================
    // Cada cartão abre a versão
    // tutorial do respetivo jogo

    bindEvents() {

        const cardReacao =
            document.getElementById(
                "cardReacao"
            );

        const cardSequencia =
            document.getElementById(
                "cardSequencia"
            );

        const cardAlvo =
            document.getElementById(
                "cardAlvo"
            );

        // -------------------------
        // JOGO DA REAÇÃO
        // -------------------------

        if (cardReacao) {

            cardReacao.addEventListener(
                "click",
                () => {

                    window.location.href =
                        "jogo.html?game=reacao&tutorial=true";

                }
            );

        }

        // -------------------------
        // JOGO DA SEQUÊNCIA
        // -------------------------
        // Abre o nível tutorial

        if (cardSequencia) {

            cardSequencia.addEventListener(
                "click",
                () => {

                    window.location.href =
                        "jogo.html?game=sequencia&difficulty=facil&level=0&tutorial=true";

                }
            );

        }

        // -------------------------
        // JOGO DO ALVO
        // -------------------------
        // Abre o nível tutorial

        if (cardAlvo) {

            cardAlvo.addEventListener(
                "click",
                () => {

                    window.location.href =
                        "jogo.html?game=alvo&difficulty=facil&level=0&tutorial=true";

                }
            );

        }

        // -------------------------
        // CONTINUAR
        // -------------------------

        const btnContinuar =
            document.getElementById(
                "btnContinuar"
            );

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