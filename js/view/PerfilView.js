import HeaderComponent from "../components/HeaderComponent.js";
import UserModel from "../model/UserModel.js";

export default class PerfilView {

    constructor() {

        if (!UserModel.isLoggedIn()) {

            window.location.href =
                "login.html";

            return;

        }

        UserModel.ensureInventory();

        new HeaderComponent();

        this.loadUserData();

        this.bindEvents();

    }

    loadUserData() {

        const username =
            document.getElementById(
                "username"
            );

        const saldo =
            document.getElementById(
                "saldo"
            );

        const level =
            document.getElementById(
                "level"
            );

        const xpText =
            document.getElementById(
                "xpText"
            );

        const xpFill =
            document.getElementById(
                "xpFill"
            );

        const avatarBase =
            document.getElementById(
                "avatarBase"
            );

        const avatarFace =
            document.getElementById(
                "avatarFace"
            );

        const avatarHat =
            document.getElementById(
                "avatarHat"
            );

        const equippedAchievements =
            UserModel.getEquippedAchievements();

        if (username) {

            username.textContent =
                UserModel.getUsername();

        }

        if (saldo) {

            saldo.textContent =
                `${UserModel.getCoins()} 🪙`;

        }

        const xp =
            UserModel.getXp();

        const currentLevel =
            UserModel.getLevel();

        const xpNeeded =
            currentLevel * 100;

        if (level) {

            level.textContent =
                currentLevel;

        }

        if (xpText) {

            xpText.textContent =
                `${xp} / ${xpNeeded}`;

        }

        if (xpFill) {

            xpFill.style.width =
                `${Math.min(
                    (xp / xpNeeded) * 100,
                    100
                )}%`;

        }

        if (avatarBase) {

            avatarBase.src =

                `../assets/images/avatar/${UserModel.getAvatar()}.png`;

        }

        const faceItem =

            UserModel.getEquippedItem(
                "glasses"
            );

        if (

            avatarFace

            &&

            faceItem

        ) {

            avatarFace.src =
                `../assets/images/avatar/${faceItem}.png`;

                avatarFace.style.display =
                    "block";

            avatarFace.className =
                `avatar-layer ${faceItem}`;

        }

        const hatItem =

            UserModel.getEquippedItem(
                "hat"
            );

        if (

            avatarHat

            &&

            hatItem

        ) {

            avatarHat.src =
                `../assets/images/avatar/${hatItem}.png`;

                avatarHat.style.display =
                    "block";

            avatarHat.className =
                `avatar-layer ${hatItem}`;

        }

        for (

            let i = 0;

            i < 3;

            i++

        ) {

            const img =
                document.getElementById(
                    `achievement${i + 1}`
                );

            const achievement =
                equippedAchievements[i];

            if (

                img

                &&

                achievement

            ) {

                img.src =
                    `../assets/images/conquistas/${achievement}.png`;

                img.style.display =
                    "block";

            }

            else if (img) {

                img.style.display =
                    "none";

            }

        }

        if (!faceItem && avatarFace) {

            avatarFace.style.display =
                "none";

        }

        if (!hatItem && avatarHat) {

            avatarHat.style.display =
                "none";

        }

    }

    bindEvents() {

        const btnEditar =
            document.getElementById("btnEditar");

        const btnLogout =
            document.getElementById("btnLogout");

        if (btnEditar) {

            btnEditar.addEventListener("click", () => {

                window.location.href =
                    "loja.html";

            });

        }

        if (btnLogout) {

            btnLogout.addEventListener("click", () => {

                UserModel.logout();

                window.location.href =
                    "login.html";

            });

        }

    }
    
}