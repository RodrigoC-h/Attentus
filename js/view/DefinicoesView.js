import HeaderComponent from "../components/HeaderComponent.js";
import UserModel from "../model/UserModel.js";

export default class DefinicoesView {

    constructor() {
        
        if (!UserModel.isLoggedIn()) {

            window.location.href =
                "login.html";

            return;

        }
        
        new HeaderComponent();

    }
}