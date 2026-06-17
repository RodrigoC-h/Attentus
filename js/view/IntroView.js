export default class IntroView {

    constructor() {

        this.bindEvents();

    }

    bindEvents() {

        const reactionCard =
            document.querySelector(".reaction-card");

        if (reactionCard) {

            reactionCard.addEventListener(
                "click",
                () => {

                    document
                        .getElementById("introModal")
                        .classList.remove("hidden");

                }
            );

        }

        const btnContinuar =
            document.getElementById("btnContinuar");

        if (btnContinuar) {

            btnContinuar.addEventListener(
                "click",
                () => {

                    window.location.href =
                        "login.html";

                }
            );

        }

    }

}