import HeaderComponent from "../components/HeaderComponent.js";
import UserModel from "../model/UserModel.js";

export default class HomepageView {

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

    renderRecentGames() {

        const container =

            document.getElementById(
                "recentGamesContainer"
            );

        if (!container) {
            return;
        }

        const games =

            UserModel
                .getCurrentUser()
                .recentGames || [];

        container.innerHTML = "";

        games.forEach(game => {

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

                case "organizacao":
                    nome =
                        "Organização";
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

    bindEvents() {

        const btnMaisJogos =
            document.getElementById("btnMaisJogos");

        if (btnMaisJogos) {

            btnMaisJogos.addEventListener("click", () => {
                window.location.href = "mini-jogos.html";
                
            });
        }
    }

}