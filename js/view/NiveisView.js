import HeaderComponent from "../components/HeaderComponent.js";
import UserModel from "../model/UserModel.js";

// =========================
// SELEÇÃO DE NÍVEIS
// =========================
// Mostra os níveis disponíveis
// para um jogo e dificuldade.
export default class NiveisView {
    
    // =========================
    // INICIALIZAÇÃO
    // =========================
    // Verifica login, ativa o
    // cabeçalho e carrega o progresso.
    constructor() {

        if (!UserModel.isLoggedIn()) {

            window.location.href =
                "login.html";

            return;

        }

        new HeaderComponent();

        this.bindEvents();

        // Atualiza os níveis concluídos
        // e bloqueados
        this.loadProgress();

    }

    // =========================
    // CARREGAR PROGRESSO
    // =========================
    // Verifica quais os níveis
    // concluídos e desbloqueados.
    loadProgress() {

        // Obtém os parâmetros da URL
        const params =
            new URLSearchParams(
                window.location.search
            );

        const game =
            params.get("game");

        const difficulty =
            params.get("difficulty");

        const levels =
            document.querySelectorAll(
                ".level"
            );

        // Percorre todos os níveis
        // apresentados na página
        levels.forEach((level) => {

            const levelNumber =
                level.dataset.level;

            // Marca visualmente os níveis
            // já concluídos
            if (

                UserModel.hasCompletedLevel(

                    game,

                    difficulty,

                    levelNumber

                )

            ) {

                level.classList.add(
                    "completed"
                );

            }

            // Bloqueia níveis ainda não
            // disponíveis ao jogador
            if (

                !UserModel.isLevelUnlocked(

                    game,

                    difficulty,

                    levelNumber

                )

            ) {

                level.disabled = true;

                level.classList.add(
                    "locked"
                );

            }

        });

    }

    // =========================
    // EVENTOS DOS NÍVEIS
    // =========================
    // Liga os botões da página.
    bindEvents() {

        const params =
            new URLSearchParams(window.location.search);

        const game =
            params.get("game");

        const difficulty =
            params.get("difficulty");

        const niveis =
            document.querySelectorAll(".level");
        
        const btnVoltar =
            document.getElementById("btnVoltar");

        // Volta para a seleção
        // de dificuldade
        if (btnVoltar) {

            btnVoltar.addEventListener("click", () => {

                const params =
                    new URLSearchParams(window.location.search);

                const game =
                    params.get("game");

                window.location.href =
                    `dificuldade.html?game=${game}`;

            });

        }

        // Associa um clique
        // a cada nível
        niveis.forEach((nivel) => {

            nivel.addEventListener("click", () => {

                const numero =
                    nivel.dataset.level;

                // Impede acesso a níveis
                // ainda bloqueados
                if (

                    !UserModel.isLevelUnlocked(

                        game,

                        difficulty,

                        numero

                    )

                ) {

                    return;

                }

                // Inicia o nível escolhido
                window.location.href =
                    `jogo.html?game=${game}&difficulty=${difficulty}&level=${numero}`;

            });

        });

    }

}