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

            <div class="nivel-badge">
                Nível ${this.level || 1}
            </div>

            <div class="game-board">

                <button class="color red"></button>
                <button class="color yellow"></button>
                <button class="color green"></button>

                <button class="color blue"></button>
                <button class="color orange"></button>
                <button class="color purple"></button>

                <button class="color white"></button>
                <button class="color pink"></button>
                <button class="color cyan"></button>

            </div>

            <div id="winModal" class="hidden">

                <div class="modal-content">

                    <h2>
                        ⭐⭐⭐
                    </h2>

                    <h3>
                        Nível Completado!
                    </h3>

                    <p id="rewardText"></p>

                    <button id="btnVoltarNivel">
                        Voltar
                    </button>

                    <button id="btnContinuarNivel">
                        Continuar
                    </button>

                </div>

            </div>

            <div id="loseModal" class="hidden">

                <div class="modal-content">

                    <h2>
                        ❌
                    </h2>

                    <h3>
                        Nível Falhado!
                    </h3>

                    <button id="btnTentarNovamente">
                        Tentar novamente
                    </button>

                </div>

            </div>

        `;

        this.generateSequence();

        console.log(
            this.sequence
        );

        this.playerSequence = [];

        console.log(
            this.sequence
        );

        this.showSequence();
    }

    showSequence() {

        let index = 0;

        const interval = setInterval(() => {

            const color =
                document.querySelector(
                    `.${this.sequence[index]}`
                );

            color.classList.add(
                "active"
            );

            setTimeout(() => {

                color.classList.remove(
                    "active"
                );

            }, 500);

            index++;

            if (
                index >=
                this.sequence.length
            ) {

                clearInterval(
                    interval
                );

                this.enableClicks();

            }

        }, 800);

    }

    getSequenceLength() {

        const level =
            Number(this.level);

        if (level === 0) {

            if (this.difficulty === "facil")
                return 2;

            if (this.difficulty === "medio")
                return 3;

            if (this.difficulty === "dificil")
                return 4;

        }

        if (this.difficulty === "facil") {

            if (level <= 7) return 3;
            if (level <= 14) return 4;

            return 5;

        }

        if (this.difficulty === "medio") {

            if (level <= 7) return 4;
            if (level <= 14) return 5;
            if (level <= 17) return 6;

            return 7;

        }

        if (this.difficulty === "dificil") {

            if (level <= 5) return 5;
            if (level <= 10) return 6;
            if (level <= 15) return 7;
            if (level <= 18) return 8;

            return 9;

        }

    }

    generateSequence() {

        if (Number(this.level) === 0) {

            if (this.difficulty === "facil") {

                this.sequence = [
                    "red",
                    "blue"
                ];

                return;
            }

            if (this.difficulty === "medio") {

                this.sequence = [
                    "red",
                    "blue",
                    "yellow"
                ];

                return;
            }

            if (this.difficulty === "dificil") {

                this.sequence = [
                    "red",
                    "blue",
                    "yellow",
                    "green"
                ];

                return;
            }

        }

        const colors = [

            "red",
            "yellow",
            "green",

            "blue",
            "orange",
            "purple",

            "white",
            "pink",
            "cyan"

        ];

        const length =
            this.getSequenceLength();

        this.sequence = [];

        for (

            let i = 0;

            i < length;

            i++

        ) {

            const randomIndex =
                Math.floor(
                    Math.random() *
                    colors.length
                );

            this.sequence.push(
                colors[randomIndex]
            );

        }

    }

    enableClicks() {

        this.playerSequence = [];

        const colors =
            document.querySelectorAll(
                ".color"
            );

        colors.forEach((button) => {

            button.addEventListener("click", () => {

                const clickedColor =

                    Array.from(
                        button.classList
                    ).find(
                        className =>

                            className !== "color"
                            &&
                            className !== "active"
                    );

                button.classList.add(
                    "active"
                );

                setTimeout(() => {

                    button.classList.remove(
                        "active"
                    );

                }, 250);

                this.playerSequence.push(
                    clickedColor
                );

                const currentIndex =
                    this.playerSequence.length - 1;

                if (

                    this.playerSequence[currentIndex]

                    !==

                    this.sequence[currentIndex]

                ) {

                    this.showLoseModal();

                    return;

                }

                if (

                    this.playerSequence.length ===

                    this.sequence.length

                ) {

                    this.showWinModal();

                }

            });

        });

    }

    showWinModal() {

        const firstTime =

            !UserModel.hasCompletedLevel(

                "sequencia",

                this.difficulty,

                this.level

            );

        if (firstTime) {

            if (

                Number(this.level) > 0

            ) {

                UserModel.addSequenceWin();

            }

            if (

                UserModel.getSequenceWinStreak() >= 10

                &&

                !UserModel.hasAchievement(
                    "imbativel"
                )

            ) {

                UserModel.unlockAchievement(
                    "imbativel"
                );

                UserModel.addCoins(5);

                UserModel.addXp(50);

            }

            UserModel.completeLevel(

                "sequencia",

                this.difficulty,

                this.level

            );

            if (

                Number(this.level) > 0

                &&

                !UserModel.hasAchievement(
                    "primeira_vitoria"
                )

            ) {

                UserModel.unlockAchievement(
                    "primeira_vitoria"
                );

                UserModel.addCoins(5);

                UserModel.addXp(50);

            }

            if (

                UserModel.getTotalCoinsEarned()

                >=

                100

                &&

                !UserModel.hasAchievement(
                    "colecionador"
                )

            ) {

                UserModel.unlockAchievement(
                    "colecionador"
                );

                UserModel.addCoins(5);

                UserModel.addXp(50);

            }

            let xp = 0;
            let coins = 0;

            if (this.difficulty === "facil") {

                xp = 10;
                coins = 2;

            }

            if (this.difficulty === "medio") {

                xp = 15;
                coins = 3;

            }

            if (this.difficulty === "dificil") {

                xp = 20;
                coins = 4;

            }

            UserModel.addXp(xp);

            UserModel.addCoins(coins);

            if (

                UserModel.hasCompletedDifficulty(
                    "sequencia",
                    this.difficulty
                )

                &&

                !UserModel.hasAchievement(
                    "mestre_sequencias"
                )

            ) {

                UserModel.unlockAchievement(
                    "mestre_sequencias"
                );

                UserModel.addCoins(5);

                UserModel.addXp(50);

            }

        }

        const modal =
            document.getElementById(
                "winModal"
            );

        const rewardText =
            document.getElementById(
                "rewardText"
            );

        let xp = 0;
        let coins = 0;

        if (this.difficulty === "facil") {

            xp = 10;
            coins = 2;

        }

        if (this.difficulty === "medio") {

            xp = 15;
            coins = 3;

        }

        if (this.difficulty === "dificil") {

            xp = 20;
            coins = 4;

        }

        rewardText.textContent =
            `+${xp} XP | +${coins} moedas`;

        modal.classList.remove(
            "hidden"
        );

        const btnVoltar =
            document.getElementById(
                "btnVoltarNivel"
            );

        const btnContinuar =
            document.getElementById(
                "btnContinuarNivel"
            );

        btnVoltar.onclick = () => {

            window.location.href =

                `niveis.html?game=sequencia&difficulty=${this.difficulty}`;

        };

        btnContinuar.onclick = () => {

            const nextLevel =

                Number(this.level) + 1;

            if (nextLevel > 20) {

                window.location.href =

                    `niveis.html?game=sequencia&difficulty=${this.difficulty}`;

                return;

            }

            window.location.href =

                `jogo.html?game=sequencia&difficulty=${this.difficulty}&level=${nextLevel}`;

        };

    }

    showLoseModal() {

        UserModel.resetSequenceWinStreak();

        const modal =
            document.getElementById(
                "loseModal"
            );

        modal.classList.remove(
            "hidden"
        );

        const btn =
            document.getElementById(
                "btnTentarNovamente"
            );

        btn.onclick = () => {

            window.location.reload();

        };

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