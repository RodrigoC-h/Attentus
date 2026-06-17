import UserModel from "../model/UserModel.js";

export default class AdminView {

    constructor() {

        if (
            localStorage.getItem("isAdmin")
            !== "true"
        ) {

            window.location.href =
                "homepage.html";

            return;
        }

        this.bindEvents();
    }

    bindEvents() {

        document.getElementById("add100Coins")
            .onclick = () => {
                UserModel.addCoins(100);
            };

        document.getElementById("add500Coins")
            .onclick = () => {
                UserModel.addCoins(500);
            };

        document.getElementById("add100Xp")
            .onclick = () => {
                UserModel.addXp(100);
            };

        document.getElementById("add500Xp")
            .onclick = () => {
                UserModel.addXp(500);
            };

        document.getElementById("unlockAllLevels")
            .onclick = () => {

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

                alert("Níveis desbloqueados!");
            };

        document.getElementById("btnBack")
            .onclick = () => {

                window.location.href =
                    "homepage.html";
            };
    }

}