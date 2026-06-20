export default class IndexView {

    // =========================
    // ECRÃ INICIAL
    // =========================
    // Mostra o splash screen
    // durante 6 segundos e
    // depois avança para o intro

    constructor() {
        setTimeout(() => {
            // Usar .replace força o browser a carregar a intro.html como se fosse uma página nova,
            // e impede que o utilizador consiga voltar para o splash screen ao clicar no botão "Retroceder"
            window.location.replace("intro.html");
        }, 6000);
    }
}

