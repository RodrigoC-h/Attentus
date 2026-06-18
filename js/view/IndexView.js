export default class IndexView {

    // =========================
    // ECRÃ INICIAL
    // =========================
    // Mostra o splash screen
    // durante 6 segundos e
    // depois avança para o intro

    constructor() {

        setTimeout(
            () => {

                window.location.href =
                    "intro.html";

            },

            6000

        );

    }

}