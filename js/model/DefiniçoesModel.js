export default class DefinicoesModel {
    constructor() {
        this.efeitosSom = 55;
        this.musica = 75;
        this.idioma = "Português";
        this.supportVisible = false;
        this.languageVisible = false;
    }

    // GETTERS
    getEfeitosSom() {
        return this.efeitosSom;
    }

    getMusica() {
        return this.musica;
    }

    getIdioma() {
        return this.idioma;
    }

    // SETTERS
    setEfeitosSom(valor) {
        this.efeitosSom = valor;
    }

    setMusica(valor) {
        this.musica = valor;
    }

    setIdioma(idioma) {
        this.idioma = idioma;
    }

    toggleSupport() {
        this.supportVisible = !this.supportVisible;
        this.languageVisible = false;
    }

    toggleLanguage() {
        this.languageVisible = !this.languageVisible;
        this.supportVisible = false;
    }
}