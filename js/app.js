import DefinicoesModel from "./js/model/DefinicoesModel.js";
import DefinicoesView from "./js/view/DefinicoesView.js";

document.addEventListener("DOMContentLoaded", () => {
    const definicoesModel = new DefinicoesModel();
    new DefinicoesView(definicoesModel);
});

// app.js
import PerfilView from '../js/view/PerfilView.js';

// Garante que o HTML está totalmente carregado antes de iniciar o JS
document.addEventListener('DOMContentLoaded', () => {
    console.log('Aplicação Attentus Inicializada!');
    
    // Inicializa a View do Perfil
    const perfilApp = new PerfilView();
});
