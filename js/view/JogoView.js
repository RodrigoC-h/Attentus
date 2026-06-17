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

        } else if (this.game === "alvo") {

            this.renderAlvo();

        }

    }

    renderSequencia() {

        if (

            UserModel.getCurrentUser()
                .gamesPlayed
                .sequencia === 0

        ) {

            UserModel.addGamePlayed(
                "sequencia"
            );

        }

        UserModel.addRecentGame(
            "sequencia"
        );

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

            <div id="difficultyCompleteModal" class="hidden">

                <div class="modal-content">

                    <h2>🏆</h2>

                    <h3>
                        Dificuldade Concluída!
                    </h3>

                    <button id="btnDifficultyComplete">
                        Voltar
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

        if (Number(this.level) === 23) {

            this.showDifficultyCompleteModal();

            return;

        }

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

            if (nextLevel > 23) {

                this.showDifficultyCompleteModal();

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

    showDifficultyCompleteModal() {

        document
            .getElementById("winModal")
            .classList.add("hidden");

        const modal =
            document.getElementById(
                "difficultyCompleteModal"
            );

        modal.classList.remove(
            "hidden"
        );

        document.getElementById(
            "btnDifficultyComplete"
        ).onclick = () => {

            window.location.href =
                `niveis.html?game=sequencia&difficulty=${this.difficulty}`;

        };

    }

    renderReacao() {

        if (

            UserModel.getCurrentUser()
                .gamesPlayed
                .reacao === 0

        ) {

            UserModel.addGamePlayed(
                "reacao"
            );

        }

        UserModel.addRecentGame(
            "reacao"
        );

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

        if (

            UserModel.getCurrentUser()
                .gamesPlayed
                .foco === 0

        ) {

            UserModel.addGamePlayed(
                "foco"
            );

        }

        UserModel.addRecentGame(
            "foco"
        );

        this.timeLeft = null;
        this.timerInterval = null;

        this.pages = [

            {
                image: "pagina1.png",

                objects: [
                    "mochila verde",
                    "porco espinho",
                    "casa de pássaro",
                    "barco",
                    "arco hula hoop"
                ]
            },

            {
                image: "pagina2.png",

                objects: [
                    "câmara fotográfica",
                    "comando da televisão",
                    "comando da consola",
                    "auriculares",
                    "globo"
                ]
            },

            {
                image: "pagina3.png",

                objects: [
                    "troféu",
                    "haltere",
                    "relógio",
                    "garrafa",
                    "troféu estrela"
                ]
            },

            {
                image: "pagina4.png",

                objects: [
                    "dinossauro",
                    "relógio",
                    "ampulheta",
                    "lupa",
                    "urso"
                ]
            },

            {
                image: "pagina5.png",

                objects: [
                    "pinguim",
                    "polvo",
                    "frigideira",
                    "telemóvel",
                    "desenho de flor"
                ]
            },

            {
                image: "pagina6.png",

                objects: [
                    "caixa preta",
                    "mochila",
                    "calculadora",
                    "carro",
                    "óculos"
                ]
            },

            {
                image: "pagina7.png",

                objects: [
                    "boné vermelho",
                    "sapatilha preta",
                    "cubo de rubik",
                    "pinguim",
                    "carro verde"
                ]
            },

            {
                image: "pagina8.png",

                objects: [
                    "luvas",
                    "urso",
                    "sinal saída",
                    "extintor",
                    "caneca"
                ]
            }

        ];

        this.remainingPages =

            [...this.pages];

        this.loadFocusPage();

    }

    loadFocusPage() {

        const randomIndex =

            Math.floor(

                Math.random()

                *

                this.remainingPages.length

            );

        const page =

            this.remainingPages.splice(
                randomIndex,
                1
            )[0];

        this.currentPage = page;

        this.foundObjects = [];

        this.gameContainer.innerHTML = `

            <div id="timer" class="timer">
                30
            </div>

            <div class="focus-image-wrapper">

                <img
                    id="focusImage"
                    src="../assets/images/jogos/${page.image}"
                >

                <div
                    id="hitboxesContainer"
                ></div>

            </div>

            <div class="objects-box">

                <div id="objectives">

                    ${page.objects.map(
                        object =>

                            `
                            <div
                                class="objective"
                                id="obj-${object}"
                            >
                                ❌ ${object}
                            </div>
                            `
                    ).join("")}

                </div>

            </div>

            <div id="focusWinModal" class="hidden">

                <div class="modal-content">

                    <h2>
                        ⭐⭐⭐
                    </h2>

                    <h3>
                        Jogo Completado!
                    </h3>

                    <p>
                        +30 XP | +15 moedas
                    </p>

                    <button id="btnFocusWin">
                        Continuar
                    </button>

                </div>

            </div>

            <div id="focusLoseModal" class="hidden">

                <div class="modal-content">

                    <h2>
                        ⏰
                    </h2>

                    <h3>
                        Tempo Esgotado!
                    </h3>

                    <button id="btnFocusLose">
                        Voltar
                    </button>

                </div>

            </div>

        `;

        if (

            page.image === "pagina1.png"

        ) {

            this.createPage1Hitboxes();

        }

        if (

            page.image === "pagina2.png"

        ) {

            this.createPage2Hitboxes();

        }

        if (

            page.image === "pagina3.png"

        ) {

            this.createPage3Hitboxes();

        }

        if (

            page.image === "pagina4.png"

        ) {

            this.createPage4Hitboxes();

        }

        if (

            page.image === "pagina5.png"
        ) {

            this.createPage5Hitboxes();
        }

        if (

            page.image === "pagina6.png"
        ) {

            this.createPage6Hitboxes();
        }

        if (

            page.image === "pagina7.png"
        ) {

            this.createPage7Hitboxes();
        }

        if (

            page.image === "pagina8.png"
        ) {

            this.createPage8Hitboxes();
        }

        if (!this.timeLeft) {

            this.timeLeft = 30;

            this.timerInterval = setInterval(() => {

                this.timeLeft--;

                const timer =
                    document.getElementById(
                        "timer"
                    );

                if (timer) {

                    timer.textContent =
                        this.timeLeft;
                }

                if (this.timeLeft <= 0) {

                    clearInterval(
                        this.timerInterval
                    );

                    const modal =

                        document.getElementById(
                            "focusLoseModal"
                        );

                    modal.classList.remove(
                        "hidden"
                    );

                    document.getElementById(
                        "btnFocusLose"
                    ).onclick = () => {

                        window.location.href =
                            "mini-jogos.html";

                    };
                }

            }, 1000);

        } else {

            document.getElementById(
                "timer"
            ).textContent =
                this.timeLeft;
        }
    }

    createPage1Hitboxes() {

        const container =

            document.getElementById(
                "hitboxesContainer"
            );

        container.innerHTML = `

            <div
                class="hitbox"
                data-object="mochila verde"
                style="
                    left:77%;
                    top:30%;
                    width:7%;
                    height:10%;
                "
            ></div>

            <div
                class="hitbox"
                data-object="porco espinho"
                style="
                    left:18%;
                    top:53%;
                    width:8%;
                    height:8%;
                "
            ></div>

            <div
                class="hitbox"
                data-object="casa de pássaro"
                style="
                    left:2%;
                    top:14%;
                    width:7%;
                    height:8%;
                "
            ></div>

            <div
                class="hitbox"
                data-object="barco"
                style="
                    left:67%;
                    top:54%;
                    width:6.5%;
                    height:6%;
                "
            ></div>

            <div
                class="hitbox"
                data-object="arco hula hoop"
                style="
                    left:21%;
                    top:24%;
                    width:7%;
                    height:9%;
                "
            ></div>

        `;

        this.bindHitboxes();

    }

    createPage2Hitboxes() {

        const container =
            document.getElementById(
                "hitboxesContainer"
            );

        container.innerHTML = `

            <div class="hitbox"
                data-object="câmara fotográfica"
                style="
                    left:81%;
                    top:56.5%;
                    width:6%;
                    height:6%;
                "
            ></div>

            <div class="hitbox"
                data-object="comando da televisão"
                style="
                    left:42%;
                    top:61%;
                    width:6.5%;
                    height:5%;
                "
            ></div>

            <div class="hitbox"
                data-object="comando da consola"
                style="
                    left:62%;
                    top:77%;
                    width:8.5%;
                    height:7.2%;
                "
            ></div>

            <div class="hitbox"
                data-object="auriculares"
                style="
                    left:34%;
                    top:45.5%;
                    width:5.5%;
                    height:6%;
                "
            ></div>

            <div class="hitbox"
                data-object="globo"
                style="
                    left:48.5%;
                    top:8%;
                    width:6%;
                    height:10%;
                "
            ></div>

        `;

        this.bindHitboxes();

    }

    createPage3Hitboxes() {

        const container =
            document.getElementById(
                "hitboxesContainer"
            );

        container.innerHTML = `

            <div class="hitbox"
                data-object="troféu"
                style="
                    left:8%;
                    top:1%;
                    width:5%;
                    height:9%;
                "
            ></div>

            <div class="hitbox"
                data-object="haltere"
                style="
                    left:10.5%;
                    top:88.5%;
                    width:9.5%;
                    height:8.5%;
                "
            ></div>

            <div class="hitbox"
                data-object="relógio"
                style="
                    left:41%;
                    top:1%;
                    width:8.5%;
                    height:12%;
                "
            ></div>

            <div class="hitbox"
                data-object="garrafa"
                style="
                    left:73%;
                    top:31%;
                    width:4%;
                    height:11%;
                "
            ></div>

            <div class="hitbox"
                data-object="troféu estrela"
                style="
                    left:100%;
                    top:29%;
                    width:3.5%;
                    height:11%;
                "
            ></div>

        `;

        this.bindHitboxes();

    }

    createPage4Hitboxes() {

        const container =
            document.getElementById(
                "hitboxesContainer"
            );

        container.innerHTML = `

            <div class="hitbox"
                data-object="dinossauro"
                style="
                    left:27%;
                    top:12%;
                    width:6%;
                    height:9%;
                "
            ></div>

            <div class="hitbox"
                data-object="relógio"
                style="
                    left:80%;
                    top:37%;
                    width:6.2%;
                    height:9.5%;
                "
            ></div>

            <div class="hitbox"
                data-object="ampulheta"
                style="
                    left:40%;
                    top:2%;
                    width:5%;
                    height:9%;
                "
            ></div>

            <div class="hitbox"
                data-object="lupa"
                style="
                    left:70.5%;
                    top:48%;
                    width:6.8%;
                    height:5.5%;
                "
            ></div>

            <div class="hitbox"
                data-object="urso"
                style="
                    left:89%;
                    top:77%;
                    width:11%;
                    height:16%;
                "
            ></div>

        `;

        this.bindHitboxes();

    }

    createPage5Hitboxes() {

        const container =
            document.getElementById(
                "hitboxesContainer"
            );

        container.innerHTML = `

            <div class="hitbox"
                data-object="pinguim"
                style="
                    left:9.6%;
                    top:4.4%;
                    width:4%;
                    height:8%;
                "
            ></div>

            <div class="hitbox"
                data-object="polvo"
                style="
                    left:16%;
                    top:89%;
                    width:8%;
                    height:10%;
                "
            ></div>

            <div class="hitbox"
                data-object="frigideira"
                style="
                    left:96%;
                    top:15%;
                    width:7.3%;
                    height:16%;
                "
            ></div>

            <div class="hitbox"
                data-object="telemóvel"
                style="
                    left:35.5%;
                    top:58%;
                    width:6.2%;
                    height:6%;
                "
            ></div>

            <div class="hitbox"
                data-object="desenho de flor"
                style="
                    left:46.5%;
                    top:9%;
                    width:4%;
                    height:7%;
                "
            ></div>

        `;

        this.bindHitboxes();

    }

    createPage6Hitboxes() {

        const container =
            document.getElementById(
                "hitboxesContainer"
            );

        container.innerHTML = `

            <div class="hitbox"
                data-object="caixa preta"
                style="
                    left:47%;
                    top:0%;
                    width:7.5%;
                    height:8%;
                "
            ></div>

            <div class="hitbox"
                data-object="mochila"
                style="
                    left:26.3%;
                    top:80%;
                    width:12%;
                    height:20%;
                "
            ></div>

            <div class="hitbox"
                data-object="calculadora"
                style="
                    left:24%;
                    top:63.5%;
                    width:6%;
                    height:6%;
                "
            ></div>

            <div class="hitbox"
                data-object="carro"
                style="
                    left:50%;
                    top:61%;
                    width:3.5%;
                    height:4.5%;
                "
            ></div>

            <div class="hitbox"
                data-object="óculos"
                style="
                    left:5.7%;
                    top:72.5%;
                    width:6.7%;
                    height:6.5%;
                "
            ></div>

        `;

        this.bindHitboxes();

    }

    createPage7Hitboxes() {

        const container =
            document.getElementById(
                "hitboxesContainer"
            );

        container.innerHTML = `

            <div class="hitbox"
                data-object="boné vermelho"
                style="
                    left:66.5%;
                    top:15.5%;
                    width:5%;
                    height:13%;
                "
            ></div>

            <div class="hitbox"
                data-object="sapatilha preta"
                style="
                    left:42.7%;
                    top:61%;
                    width:7.3%;
                    height:7%;
                "
            ></div>

            <div class="hitbox"
                data-object="cubo de rubik"
                style="
                    left:59.7%;
                    top:80.3%;
                    width:6.3%;
                    height:9.5%;
                "
            ></div>

            <div class="hitbox"
                data-object="pinguim"
                style="
                    left:86.5%;
                    top:73%;
                    width:8.8%;
                    height:15%;
                "
            ></div>

            <div class="hitbox"
                data-object="carro verde"
                style="
                    left:43.5%;
                    top:88%;
                    width:7%;
                    height:8%;
                "
            ></div>

        `;

        this.bindHitboxes();

    }

    createPage8Hitboxes() {

        const container =
            document.getElementById(
                "hitboxesContainer"
            );

        container.innerHTML = `

            <div class="hitbox"
                data-object="luvas"
                style="
                    left:7.7%;
                    top:55%;
                    width:11%;
                    height:11%;
                "
            ></div>

            <div class="hitbox"
                data-object="urso"
                style="
                    left:65.5%;
                    top:0.5%;
                    width:6%;
                    height:7%;
                "
            ></div>

            <div class="hitbox"
                data-object="sinal saída"
                style="
                    left:39%;
                    top:1.5%;
                    width:6%;
                    height:5.5%;
                "
            ></div>

            <div class="hitbox"
                data-object="extintor"
                style="
                    left:43%;
                    top:16.3%;
                    width:4%;
                    height:10%;
                "
            ></div>

            <div class="hitbox"
                data-object="caneca"
                style="
                    left:57%;
                    top:52%;
                    width:4%;
                    height:6%;
                "
            ></div>

        `;

        this.bindHitboxes();

    }

    bindHitboxes() {

        const hitboxes =

            document.querySelectorAll(
                ".hitbox"
            );

        hitboxes.forEach(
            hitbox => {

                hitbox.addEventListener(
                    "click",
                    () => {

                        hitbox.style.display =
                            "none";

                        const objectName =

                            hitbox.dataset.object;

                        this.foundObjects.push(
                            objectName
                        );

                        UserModel.addFoundObject();

                        if (

                            UserModel.getFoundObjects()

                            >= 30

                            &&

                            !UserModel.hasAchievement(
                                "olho_aguia"
                            )

                        ) {

                            UserModel.unlockAchievement(
                                "olho_aguia"
                            );

                        }
                        
                        this.timeLeft += 1;

                        const timer =
                            document.getElementById(
                                "timer"
                            );

                        if (timer) {

                            timer.textContent =
                                this.timeLeft;
                        }

                        const objective =

                            document.getElementById(
                                `obj-${objectName}`
                            );

                        if (objective) {

                            objective.textContent =
                                `✅ ${objectName}`;

                        }

                        if (

                            this.foundObjects.length

                            ===

                            this.currentPage.objects.length

                        ) {

                            this.completeFocusPage();

                        }

                    }
                );

            }
        );

    }

    completeFocusPage() {

        if (

            this.remainingPages.length > 0

        ) {

            setTimeout(
                () => {

                    this.loadFocusPage();

                },
                1000
            );

            return;

        }

        this.finishFocusGame();

    }

    finishFocusGame() {

        UserModel.addXp(
            30
        );

        if (

            UserModel.hasPlayedAllGames()

            &&

            !UserModel.hasAchievement(
                "explorador"
            )

        ) {

            UserModel.unlockAchievement(
                "explorador"
            );

        }

        UserModel.addCoins(
            15
        );

        clearInterval(
            this.timerInterval
        );

        const modal =

            document.getElementById(
                "focusWinModal"
            );

        modal.classList.remove(
            "hidden"
        );

        document.getElementById(
            "btnFocusWin"
        ).onclick = () => {

            window.location.href =
                "mini-jogos.html";

        };

    }

    renderAlvo() {

        if (

            UserModel.getCurrentUser()
                .gamesPlayed
                .alvo === 0

        ) {

            UserModel.addGamePlayed(
                "alvo"
            );

        }

        UserModel.addRecentGame(
            "alvo"
        );

        this.score = 0;

        const level =
            Number(this.level);

        if (this.difficulty === "facil") {

            if (level === 0) {

                this.goal = 3;

            } else {

                this.goal = 9 + level;

            }

        }

        else if (this.difficulty === "medio") {

            if (level === 0) {

                this.goal = 5;

            } else {

                this.goal = 14 + level;

            }

        }

        else {

            if (level === 0) {

                this.goal = 8;

            } else {

                this.goal = 19 + level;

            }

        }

        this.timeLeft = 30;

        document.getElementById(
            "gameContainer"
        ).innerHTML = `

            <div class="nivel-badge">
                Nível ${this.level}
            </div>

            <div id="alvoTimer">
                30
            </div>

            <div id="alvoScore">
                0 / ${this.goal}
            </div>

            <div id="alvoArea">

                <img
                    id="target"
                    src="../assets/images/jogos/alvo.png"
                >

            </div>

            <div id="alvoWinModal" class="hidden">

                <div class="modal-content">

                    <h2>⭐⭐⭐</h2>

                    <h3>
                        Nível Completado!
                    </h3>

                    <p id="alvoRewardText"></p>

                    <button id="btnAlvoVoltar">
                        Voltar
                    </button>

                    <button id="btnAlvoContinuar">
                        Continuar
                    </button>

                </div>

            </div>

            <div id="alvoLoseModal" class="hidden">

                <div class="modal-content">

                    <h2>❌</h2>

                    <h3>
                        Tempo Esgotado!
                    </h3>

                    <button id="btnAlvoRetry">
                        Tentar novamente
                    </button>

                </div>

            </div>

            <div id="alvoDifficultyCompleteModal" class="hidden">

                <div class="modal-content">

                    <h2>🏆</h2>

                    <h3>
                        Dificuldade Concluída!
                    </h3>

                    <button id="btnAlvoDifficultyComplete">
                        Voltar
                    </button>

                </div>

            </div>

        `;

        const target =

            document.getElementById(
                "target"
            );

        const sizes = {

            facil: 90,
            medio: 60,
            dificil: 40

        };

        const targetSize =
            sizes[this.difficulty];

        target.style.width =
            `${targetSize}px`;

        target.style.height =
            `${targetSize}px`;

        this.moveTarget();

        target.addEventListener(
            "click",
            () => {

                this.score++;

                UserModel.addHit();

                if (

                    UserModel.getCurrentUser()
                        .stats
                        .alvosAcertados >= 100

                    &&

                    !UserModel.hasAchievement(
                        "atirador_elite"
                    )

                ) {

                    UserModel.unlockAchievement(
                        "atirador_elite"
                    );

                    UserModel.addCoins(5);

                    UserModel.addXp(50);

                }

                document.getElementById(
                    "alvoScore"
                ).textContent =

                    `${this.score} / ${this.goal}`;

                this.moveTarget();

                if (

                    this.score >= this.goal

                ) {

                    clearInterval(
                        this.alvoInterval
                    );

                    this.showAlvoWinModal();

                }

            }

        );

        this.alvoInterval =

            setInterval(
                () => {

                    this.timeLeft--;

                    document.getElementById(
                        "alvoTimer"
                    ).textContent =

                        this.timeLeft;

                    if (

                        this.timeLeft <= 0

                    ) {

                        clearInterval(
                            this.alvoInterval
                        );

                        this.showAlvoLoseModal();

                    }

                },
                1000
            );
        
    }

    moveTarget() {

        const target =
            document.getElementById(
                "target"
            );

        const area =
            document.getElementById(
                "alvoArea"
            );

        if (!target || !area) {
            return;
        }

        const maxX =
            area.clientWidth -
            target.offsetWidth;

        const maxY =
            area.clientHeight -
            target.offsetHeight;

        target.style.left =
            `${Math.random() * maxX}px`;

        target.style.top =
            `${Math.random() * maxY}px`;

    }

    showAlvoWinModal() {

        const firstTime =

            !UserModel.hasCompletedLevel(

                "alvo",

                this.difficulty,

                this.level

            );

        if (firstTime) {

            UserModel.completeLevel(

                "alvo",

                this.difficulty,

                this.level

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

            UserModel.addXp(xp);

            UserModel.addCoins(coins);

        }

        const modal =

            document.getElementById(
                "alvoWinModal"
            );

        const rewardText =

            document.getElementById(
                "alvoRewardText"
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

        if (Number(this.level) === 23) {

            this.showAlvoDifficultyCompleteModal();

            return;

        }

        modal.classList.remove(
            "hidden"
        );

        document.getElementById(
            "btnAlvoVoltar"
        ).onclick = () => {

            window.location.href =

                `niveis.html?game=alvo&difficulty=${this.difficulty}`;

        };

        document.getElementById(
            "btnAlvoContinuar"
        ).onclick = () => {

            const nextLevel =

                Number(this.level) + 1;

            if (nextLevel > 23) {

                this.showAlvoDifficultyCompleteModal();

                return;

            }

            window.location.href =

                `jogo.html?game=alvo&difficulty=${this.difficulty}&level=${nextLevel}`;

        };

    }

    showAlvoLoseModal() {

        const modal =

            document.getElementById(
                "alvoLoseModal"
            );

        modal.classList.remove(
            "hidden"
        );

        document.getElementById(
            "btnAlvoRetry"
        ).onclick = () => {

            window.location.reload();

        };

    }

    showAlvoDifficultyCompleteModal() {

        document
            .getElementById(
                "alvoWinModal"
            )
            .classList.add(
                "hidden"
            );

        const modal =

            document.getElementById(
                "alvoDifficultyCompleteModal"
            );

        modal.classList.remove(
            "hidden"
        );

        document.getElementById(
            "btnAlvoDifficultyComplete"
        ).onclick = () => {

            window.location.href =

                `niveis.html?game=alvo&difficulty=${this.difficulty}`;

        };

    }

}