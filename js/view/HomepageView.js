import HeaderComponent from "../components/HeaderComponent.js";

export default class HomepageView {

    constructor() {

        new HeaderComponent();

        this.bindEvents();
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