import UserModel from "../model/UserModel.js";

export default class AdminView {

    // =========================
    // INICIALIZAÇÃO
    // =========================
    // Verifica se o utilizador é
    // administrador antes de
    // permitir o acesso ao painel

    constructor() {

        if (

            localStorage.getItem(
                "isAdmin"
            ) !== "true"

        ) {

            window.location.href =
                "homepage.html";

            return;

        }

        this.bindEvents();

    }

    // =========================
    // EVENTOS DOS BOTÕES
    // =========================
    // Liga cada botão à respetiva
    // funcionalidade administrativa

    bindEvents() {

        // -------------------------
        // MOEDAS
        // -------------------------

        document.getElementById(
            "add100Coins"
        ).onclick = () => {

            UserModel.addCoins(100);

        };

        document.getElementById(
            "add500Coins"
        ).onclick = () => {

            UserModel.addCoins(500);

        };

        // -------------------------
        // EXPERIÊNCIA
        // -------------------------

        document.getElementById(
            "add100Xp"
        ).onclick = () => {

            UserModel.addXp(100);

        };

        document.getElementById(
            "add500Xp"
        ).onclick = () => {

            UserModel.addXp(500);

        };

        // -------------------------
        // DESBLOQUEAR NÍVEIS
        // -------------------------
        // Marca todos os níveis dos
        // jogos Sequência e Alvo
        // como concluídos

        document.getElementById(
            "unlockAllLevels"
        ).onclick = () => {

            const data =
                UserModel.getData();

            const user =
                data.users.find(
                    user =>
                        user.id ===
                        data.currentUser
                );

            if (!user) {

                return;

            }

            user.completedLevels.sequencia = [];
            user.completedLevels.alvo = [];

            ["facil", "medio", "dificil"]
                .forEach(difficulty => {

                    for (

                        let level = 0;

                        level <= 23;

                        level++

                    ) {

                        user.completedLevels
                            .sequencia
                            .push(
                                `${difficulty}-${level}`
                            );

                        user.completedLevels
                            .alvo
                            .push(
                                `${difficulty}-${level}`
                            );

                    }

                });

            UserModel.saveData(data);

            alert(
                "Níveis desbloqueados!"
            );

        };

        // -------------------------
        // VOLTAR
        // -------------------------
        // Regressa à homepage

        document.getElementById(
            "btnBack"
        ).onclick = () => {

            window.location.href =
                "homepage.html";

        };

    }

}