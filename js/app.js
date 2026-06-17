import StorageManager from "./managers/StorageManager.js";

import HomepageView from "./view/HomepageView.js";
import MiniJogosView from "./view/MiniJogosView.js";
import PerfilView from "./view/PerfilView.js";
import LojaView from "./view/LojaView.js";
import LoginView from "./view/LoginView.js";
import IntroView from "./view/IntroView.js";
import IndexView from "./view/IndexView.js";
import JogoView from "./view/JogoView.js";
import DificuldadeView from "./view/DificuldadeView.js";
import NiveisView from "./view/NiveisView.js";
import AdminView from "./view/AdminView.js";

StorageManager.initialize();

const pagina = window.location.pathname;

if (pagina.includes("homepage.html")) {
    new HomepageView();
}

if (pagina.includes("mini-jogos.html")) {
    new MiniJogosView();
}

if (pagina.includes("perfil.html")) {
    new PerfilView();
}

if (pagina.includes("loja.html")) {
    new LojaView();
}

if (pagina.includes("login.html")) {
    new LoginView();
}

if (pagina.includes("intro.html")) {
    new IntroView();
}

if (pagina.includes("index.html")) {
    new IndexView();
}

if (pagina.includes("jogo.html")) {
    new JogoView();
}

if (pagina.includes("dificuldade.html")) {
    new DificuldadeView();
}

if (pagina.includes("niveis.html")) {
    new NiveisView();
}

if (pagina.includes("admin.html")) {
    new AdminView();
}