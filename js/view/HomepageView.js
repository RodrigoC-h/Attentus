import HeaderComponent from "../components/HeaderComponent.js";
import UserModel from "../model/UserModel.js";

export default class HomepageView {

    // =========================
    // INICIALIZAÇÃO
    // =========================
    // Verifica se existe sessão
    // iniciada e carrega os
    // elementos da homepage

    constructor() {

        if (!UserModel.isLoggedIn()) {

            window.location.href =
                "login.html";

            return;

        }

        new HeaderComponent();

        this.renderRecentGames();

        this.bindEvents();

    }

    // =========================
    // JOGOS RECENTES
    // =========================
    // Mostra os últimos jogos
    // jogados pelo utilizador

    renderRecentGames() {

        const container =

            document.getElementById(
                "recentGamesContainer"
            );

        if (!container) {
            return;
        }

        const user =
            UserModel.getCurrentUser();

        const games =
            user?.recentGames || [];

        container.innerHTML = "";

        games.forEach(game => {

            // Converte o identificador
            // interno para o nome visível

            let nome = "";

            switch (game) {

                case "reacao":
                    nome =
                        "Jogo da Reação";
                    break;

                case "sequencia":
                    nome =
                        "Repetir Sequência";
                    break;

                case "foco":
                    nome =
                        "Jogo do Foco";
                    break;

                case "alvo":
                    nome =
                        "Jogo do Alvo";
                    break;

            }

            container.innerHTML += `

                <div
                    class="recent-card"
                    data-game="${game}"
                >
                    ${nome}
                </div>

            `;

        });

        // Liga cada cartão ao
        // respetivo jogo

        document
            .querySelectorAll(
                ".recent-card"
            )
            .forEach(card => {

                card.addEventListener(
                    "click",
                    () => {

                        const game =

                            card.dataset.game;

                        if (

                            game === "reacao"

                        ) {

                            window.location.href =
                                "jogo.html?game=reacao";

                        }

                        else if (

                            game === "foco"

                        ) {

                            window.location.href =
                                "jogo.html?game=foco";

                        }

                        else if (

                            game === "sequencia"

                        ) {

                            window.location.href =
                                "dificuldade.html?game=sequencia";

                        }

                        else if (

                            game === "alvo"

                        ) {

                            window.location.href =
                                "dificuldade.html?game=alvo";

                        }

                    }
                );

            });

    }

    // =========================
    // EVENTOS DOS BOTÕES
    // =========================

    bindEvents() {

        const btnMaisJogos =
            document.getElementById(
                "btnMaisJogos"
            );

        if (btnMaisJogos) {

            btnMaisJogos.addEventListener(
                "click",
                () => {

                    window.location.href =
                        "mini-jogos.html";

                }
            );

        }

    }

}