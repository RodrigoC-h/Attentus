import HeaderComponent from "../components/HeaderComponent.js";
import UserModel from "../model/UserModel.js";

export default class JogoView {

    constructor() {

        if (!UserModel.isLoggedIn()) {

            window.location.href =
                "login.html";

            return;

        }

        new HeaderComponent();

        this.gameContainer =
            document.getElementById("gameContainer");

        const params =
            new URLSearchParams(window.location.search);

        this.game =
            params.get("game");

        this.difficulty =
            params.get("difficulty");

        this.level =
            params.get("level");

        this.loadGame();

    }

    loadGame() {

        if (this.game === "escape") {

            this.renderEscape();

        } else if (this.game === "sequencia") {

            this.renderSequencia();

        } else if (this.game === "reacao") {

            this.renderReacao();

        } else if (this.game === "foco") {

            this.renderFoco();

        }

    }

    renderEscape() {

        console.log(this.game);
        console.log(this.difficulty);

        this.gameContainer.innerHTML = `
            <h2>Escape Room</h2>

            <p>
                Dificuldade:
                ${this.difficulty}
            </p>
        `;

    }

    renderSequencia() {

        this.gameContainer.innerHTML = `
            <div class="nivel">
                Nível ${this.level}
            </div>

            <h2>
                Repete a sequência!
            </h2>
        `;

    }

    renderReacao() {

        this.gameContainer.innerHTML = `
            <h2>
                Clica no carro quando a luz ficar verde!
            </h2>
        `;
    }

    renderFoco() {

        this.gameContainer.innerHTML = `
            <h2>
                Jogo do foco
            </h2>
        `;

    }
}