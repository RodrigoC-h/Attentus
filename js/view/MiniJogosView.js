import HeaderComponent from "../components/HeaderComponent.js";
import UserModel from "../model/UserModel.js";

// =========================
// MINI JOGOS
// =========================
// Página que apresenta os
// jogos disponíveis ao utilizador.
export default class MiniJogosView {

    // =========================
    // INICIALIZAÇÃO
    // =========================
    // Verifica se existe sessão
    // iniciada e prepara a página.
    constructor() {

        // Impede acesso sem login
        if (!UserModel.isLoggedIn()) {

            window.location.href =
                "login.html";

            return;

        }

        // Ativa os eventos do cabeçalho
        new HeaderComponent();

        this.bindEvents();

    }

    // =========================
    // EVENTOS DOS CARTÕES
    // =========================
    // Associa cada cartão ao
    // respetivo jogo.
    bindEvents() {

        const cardReacao =
            document.getElementById("cardReacao");

        const cardFoco =
            document.getElementById("cardFoco");

        const cardSequencia =
            document.getElementById("cardSequencia");

        const cardAlvo =
            document.getElementById("cardAlvo");

        // Cartão do jogo da reação
        if (cardReacao) {

            cardReacao.addEventListener("click", () => {

                window.location.href =
                    "jogo.html?game=reacao";

            });

        }

        // Cartão do jogo do foco
        if (cardFoco) {

            cardFoco.addEventListener("click", () => {

                window.location.href =
                    "jogo.html?game=foco";

            });

        }

        // Cartão do jogo da sequência
        if (cardSequencia) {

            cardSequencia.addEventListener("click", () => {

                window.location.href =
                    "dificuldade.html?game=sequencia";

            });

        }

        // Cartão do jogo do alvo
        if (cardAlvo) {

                cardAlvo.addEventListener("click", () => {

                    window.location.href =
                        "dificuldade.html?game=alvo";

                });

            }

    }

}