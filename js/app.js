import DefinicoesModel from "./js/model/DefinicoesModel.js";
import DefinicoesView from "./js/view/DefinicoesView.js";

document.addEventListener("DOMContentLoaded", () => {
    const definicoesModel = new DefinicoesModel();
    new DefinicoesView(definicoesModel);
});