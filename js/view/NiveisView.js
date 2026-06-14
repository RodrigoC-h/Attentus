import HeaderComponent from "../components/HeaderComponent.js";

export default class NiveisView {

    constructor() {
        console.log("NiveisView carregado");
        new HeaderComponent();

        this.bindEvents();

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
        console.log("Níveis encontrados:", niveis.length);
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

                window.location.href =
                    `jogo.html?game=${game}&difficulty=${difficulty}&level=${numero}`;

            });

        });

    }

}