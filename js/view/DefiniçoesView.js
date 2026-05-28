export default class DefinicoesView {
    constructor(model) {
        this.model = model;

        this.soundSlider = document.querySelector("#soundSlider");
        this.musicSlider = document.querySelector("#musicSlider");

        this.supportBtn = document.querySelector("#supportBtn");
        this.languageBtn = document.querySelector("#languageBtn");

        this.supportPopup = document.querySelector("#supportPopup");
        this.languagePopup = document.querySelector("#languagePopup");

        this.languageOptions = document.querySelectorAll(".option-language");

        this.init();
    }

    init() {
        // sliders
        this.soundSlider.addEventListener("input", (e) => {
            this.model.setEfeitosSom(e.target.value);
        });

        this.musicSlider.addEventListener("input", (e) => {
            this.model.setMusica(e.target.value);
        });

        // botões
        this.supportBtn.addEventListener("click", () => {
            this.model.toggleSupport();
            this.render();
        });

        this.languageBtn.addEventListener("click", () => {
            this.model.toggleLanguage();
            this.render();
        });

        // idiomas
        this.languageOptions.forEach(option => {
            option.addEventListener("click", () => {
                this.model.setIdioma(option.dataset.lang);
                alert(`Idioma alterado para ${option.dataset.lang}`);
            });
        });

        this.render();
    }

    render() {
        this.supportPopup.classList.toggle(
            "hidden",
            !this.model.supportVisible
        );

        this.languagePopup.classList.toggle(
            "hidden",
            !this.model.languageVisible
        );

        this.soundSlider.value = this.model.getEfeitosSom();
        this.musicSlider.value = this.model.getMusica();
    }
}