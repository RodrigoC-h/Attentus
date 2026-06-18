import HeaderComponent from "../components/HeaderComponent.js";
import UserModel from "../model/UserModel.js";

export default class DificuldadeView {

    // =========================
    // INICIALIZAÇÃO
    // =========================
    // Verifica se existe sessão
    // iniciada e carrega o header
    constructor() {

        if (!UserModel.isLoggedIn()) {

            window.location.href =
                "login.html";

            return;

        }

        new HeaderComponent();

        this.bindEvents();

    }

    // =========================
    // EVENTOS DOS BOTÕES
    // =========================
    // Liga os botões de dificuldade
    // ao jogo selecionado
    bindEvents() {

        // Obtém o jogo recebido pela URL
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

        // -------------------------
        // VOLTAR
        // -------------------------
        if (btnVoltar) {

            btnVoltar.addEventListener("click", () => {

                window.location.href =
                    "mini-jogos.html";

            });

        }

        // -------------------------
        // JOGOS COM NÍVEIS
        // -------------------------
        // Abre a página de seleção
        // de níveis da dificuldade
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