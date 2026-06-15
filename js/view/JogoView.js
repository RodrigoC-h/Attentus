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

        if (this.game === "sequencia") {

            this.renderSequencia();

        } else if (this.game === "reacao") {

            this.renderReacao();

        } else if (this.game === "foco") {

            this.renderFoco();

        }

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

            <div class="reaction-track">

                <img
                    id="semaforo"
                    src="../assets/images/jogos/semaforo_vermelho.png"
                    alt="Semáforo"
                >

                <img
                    id="meta"
                    src="../assets/images/jogos/meta.png"
                    alt="Meta"
                >

                <img
                    id="carro"
                    src="../assets/images/jogos/carro.png"
                    alt="Carro"
                >

            </div>

            <div id="reactionModal" class="hidden">

                <div class="modal-content">

                    <div id="tempoFinal">
                        0 ms
                    </div>

                    <button id="btnContinuar">
                        Continuar
                    </button>

                </div>

            </div>

        `;

        this.startReactionGame();

    }

    startReactionGame() {

        const semaforo =
            document.getElementById("semaforo");

        const carro =
            document.getElementById("carro");

        const modal =
            document.getElementById("reactionModal");

        const tempoFinal =
            document.getElementById("tempoFinal");

        const btnContinuar =
            document.getElementById("btnContinuar");

        btnContinuar.addEventListener("click", () => {

            window.location.href =
                "mini-jogos.html";

        });

        let startTime = 0;

        let canClick = false;

        const yellowTime =
            Math.floor(
                Math.random() * 2000
            ) + 1000;

        carro.addEventListener(
            "click",
            () => {

                if (!canClick) {

                    alert(
                        "Falso arranque!"
                    );

                    window.location.reload();

                    return;

                }

                canClick = false;

                const reactionTime =
                    Math.round(
                        performance.now() -
                        startTime
                    );

                UserModel.updateBestReactionTime(
                    reactionTime
                );

                if (

                    reactionTime < 300 &&

                    !UserModel.hasAchievement(
                        "reflexos_aco"
                    )

                ) {

                    UserModel.unlockAchievement(
                        "reflexos_aco"
                    );

                    UserModel.addCoins(5);

                    UserModel.addXp(50);

                }

                tempoFinal.textContent =
                    `${reactionTime} ms`;

                carro.classList.add(
                    "carro-finish"
                );

                setTimeout(() => {

                    modal.classList.remove(
                        "hidden"
                    );

                }, 1000);

            },

            { once: true }

        );

        setTimeout(() => {

            semaforo.src =
                "../assets/images/jogos/semaforo_amarelo.png";

            setTimeout(() => {

                semaforo.src =
                    "../assets/images/jogos/semaforo_verde.png";

                canClick = true;

                startTime =
                    performance.now();

            }, yellowTime);

        }, 2000);

    }

    renderFoco() {

        this.gameContainer.innerHTML = `
            <h2>
                Jogo do foco
            </h2>
        `;

    }
}