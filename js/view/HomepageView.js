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