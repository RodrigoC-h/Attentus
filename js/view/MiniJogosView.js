import HeaderComponent from "../components/HeaderComponent.js";

export default class MiniJogosView {

    constructor() {

        new HeaderComponent();

        this.bindEvents();

    }

    bindEvents() {

        const cardEscape =
            document.getElementById("cardEscape");

        if (cardEscape) {

            cardEscape.addEventListener("click", () => {

                window.location.href =
                    "dificuldade.html?game=escape";

            });

        }

    }

}