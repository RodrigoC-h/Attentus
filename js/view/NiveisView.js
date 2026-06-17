import HeaderComponent from "../components/HeaderComponent.js";
import UserModel from "../model/UserModel.js";

export default class NiveisView {

    constructor() {

        if (!UserModel.isLoggedIn()) {

            window.location.href =
                "login.html";

            return;

        }

        new HeaderComponent();

        this.bindEvents();

        this.loadProgress();

    }

    loadProgress() {

        const params =
            new URLSearchParams(
                window.location.search
            );

        const game =
            params.get("game");

        const difficulty =
            params.get("difficulty");

        const levels =
            document.querySelectorAll(
                ".level"
            );

        levels.forEach((level) => {

            const levelNumber =
                level.dataset.level;

            if (

                UserModel.hasCompletedLevel(

                    game,

                    difficulty,

                    levelNumber

                )

            ) {

                level.classList.add(
                    "completed"
                );

            }

            if (

                !UserModel.isLevelUnlocked(

                    game,

                    difficulty,

                    levelNumber

                )

            ) {

                level.disabled = true;

                level.classList.add(
                    "locked"
                );

            }

        });

    }

    bindEvents() {

        const params =
            new URLSearchParams(window.location.search);

        const game =
            params.get("game");

        const difficulty =
            params.get("difficulty");

        const niveis =
            document.querySelectorAll(".level");
        
        const btnVoltar =
            document.getElementById("btnVoltar");

        if (btnVoltar) {

            btnVoltar.addEventListener("click", () => {

                const params =
                    new URLSearchParams(window.location.search);

                const game =
                    params.get("game");

                window.location.href =
                    `dificuldade.html?game=${game}`;

            });

        }

        niveis.forEach((nivel) => {

            nivel.addEventListener("click", () => {

                const numero =
                    nivel.dataset.level;

                if (

                    !UserModel.isLevelUnlocked(

                        game,

                        difficulty,

                        numero

                    )

                ) {

                    return;

                }

                window.location.href =
                    `jogo.html?game=${game}&difficulty=${difficulty}&level=${numero}`;

            });

        });

    }

}