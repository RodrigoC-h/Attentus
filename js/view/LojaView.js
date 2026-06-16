import HeaderComponent from "../components/HeaderComponent.js";
import UserModel from "../model/UserModel.js";

export default class LojaView {

    constructor() {

        if (!UserModel.isLoggedIn()) {

            window.location.href =
                "login.html";

            return;

        }

        new HeaderComponent();

        this.avatars = [

            { id: "avatar_azul", price: 0 },
            { id: "avatar_amarelo", price: 10 },
            { id: "avatar_laranja", price: 10 },
            { id: "avatar_verde", price: 10 },
            { id: "avatar_vermelho", price: 10 },
            { id: "avatar_rosa", price: 10 },
            { id: "avatar_roxo", price: 10 },
            { id: "avatar_branco", price: 10 },
            { id: "avatar_preto", price: 10 }

        ];

        this.hats = [

            { id: "bone", price: 10 },
            { id: "auriculares", price: 10 },
            { id: "cartola", price: 10 },
            { id: "coroa", price: 10 },
            { id: "chapeu", price: 10 },
            { id: "laco", price: 10 },
            { id: "halo", price: 10 },
            { id: "nuvens", price: 10 },
            { id: "mini_atti", price: 10 }

        ];

        this.faceAccessories = [

            { id: "oculos", price: 10 },
            { id: "bigode", price: 10 },
            { id: "monoculo", price: 10 },
            { id: "mascara", price: 10 },
            { id: "hacker", price: 10 },
            { id: "pala", price: 10 },
            { id: "laco_formal", price: 10 },
            { id: "mascara_gas", price: 10 },
            { id: "fita", price: 10 }

        ];

        this.achievements = [

            { id: "primeira_vitoria" },
            { id: "reflexos_aco" },
            { id: "colecionador" },
            { id: "imbativel" },
            { id: "mestre_sequencias" },
            { id: "olho_aguia" },
            { id: "atirador_elite" },
            { id: "mestre_organizacao" },
            { id: "explorador" }

        ];

        this.bindTabs();

        this.renderHats();

        this.updatePreviewAvatar();

    }

    updatePreviewAvatar() {

        const preview =
            document.getElementById(
                "previewAvatar"
            );

        if (!preview) {

            return;

        }

        preview.src =

            `../assets/images/avatar/${UserModel.getAvatar()}.png`;

    }

    bindTabs() {

        document
            .getElementById("tabHead")
            ?.addEventListener(
                "click",
                () => {

                    this.renderHats();

                }
            );

        document
            .getElementById("tabFace")
            ?.addEventListener(
                "click",
                () => {

                    this.renderFaceAccessories();

                }
            );

        document
            .getElementById("tabColor")
            ?.addEventListener(
                "click",
                () => {

                    this.renderAvatars();

                }
            );

        document
            .getElementById("tabAchievement")
            ?.addEventListener(
                "click",
                () => {

                    this.renderAchievements();

                }
            );

    }

    renderAvatars() {

        const container =
            document.getElementById(
                "itemsContainer"
            );

        container.innerHTML = "";

        this.avatars.forEach(
            avatar => {

                const owned =

                    UserModel.hasItem(
                        avatar.id
                    );

                const equipped =

                    UserModel.getAvatar()
                    === avatar.id;

                let buttonText = "";

                if (equipped) {

                    buttonText =
                        "Equipado";

                }

                else if (owned) {

                    buttonText =
                        "Equipar";

                }

                else {

                    buttonText =
                        `${avatar.price} 🪙`;

                }

                container.innerHTML += `

                    <div class="item">

                        <img
                            src="../assets/images/avatar/${avatar.id}.png"
                            alt="${avatar.id}"
                        >

                        <button
                            class="avatar-btn"
                            data-id="${avatar.id}"
                        >

                            ${buttonText}

                        </button>

                    </div>

                `;

            }

        );

        this.bindAvatarEvents();

    }

    bindAvatarEvents() {

        const buttons =

            document.querySelectorAll(
                ".avatar-btn"
            );

        buttons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const id =
                            button.dataset.id;

                        if (

                            UserModel.hasItem(
                                id
                            )

                        ) {

                            UserModel.setAvatar(
                                id
                            );

                        }

                        else {

                            if (

                                UserModel.getCoins()
                                < 10

                            ) {

                                alert(
                                    "Moedas insuficientes!"
                                );

                                return;

                            }

                            UserModel.removeCoins(
                                10
                            );

                            UserModel.unlockItem(
                                id
                            );

                            UserModel.setAvatar(
                                id
                            );

                        }

                        this.updatePreviewAvatar();

                        this.renderAvatars();

                    }

                );

            }

        );

    }

    renderHats() {

        const container =
            document.getElementById(
                "itemsContainer"
            );

        container.innerHTML = "";

        this.hats.forEach(
            hat => {

                const owned =

                    UserModel.hasItem(
                        hat.id
                    );

                const equipped =

                    UserModel.getEquippedItem(
                        "hat"
                    ) === hat.id;

                let buttonText = "";

                if (equipped) {

                    buttonText =
                        "Equipado";

                }

                else if (owned) {

                    buttonText =
                        "Equipar";

                }

                else {

                    buttonText =
                        `${hat.price} 🪙`;

                }

                container.innerHTML += `

                    <div class="item">

                        <img
                            src="../assets/images/avatar/${hat.id}.png"
                            alt="${hat.id}"
                        >

                        <button
                            class="hat-btn"
                            data-id="${hat.id}"
                        >

                            ${buttonText}

                        </button>

                    </div>

                `;

            }

        );

        this.bindHatEvents();

    }

    bindHatEvents() {

        const buttons =
            document.querySelectorAll(
                ".hat-btn"
            );

        buttons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const id =
                            button.dataset.id;

                        if (

                            UserModel.hasItem(
                                id
                            )

                        ) {

                            UserModel.toggleItem(
                                "hat",
                                id
                            );

                        }

                        else {

                            if (

                                UserModel.getCoins()
                                < 10

                            ) {

                                alert(
                                    "Moedas insuficientes!"
                                );

                                return;

                            }

                            UserModel.removeCoins(
                                10
                            );

                            UserModel.unlockItem(
                                id
                            );

                            UserModel.toggleItem(
                                "hat",
                                id
                            );

                        }

                        this.renderHats();

                    }

                );

            }

        );

    }

    renderFaceAccessories() {

        const container =
            document.getElementById(
                "itemsContainer"
            );

        container.innerHTML = "";

        this.faceAccessories.forEach(
            accessory => {

                const owned =

                    UserModel.hasItem(
                        accessory.id
                    );

                const equipped =

                    UserModel.getEquippedItem(
                        "glasses"
                    ) === accessory.id;

                let buttonText = "";

                if (equipped) {

                    buttonText =
                        "Equipado";

                }

                else if (owned) {

                    buttonText =
                        "Equipar";

                }

                else {

                    buttonText =
                        `${accessory.price} 🪙`;

                }

                container.innerHTML += `

                    <div class="item">

                        <img
                            class="face-item ${accessory.id}"
                            src="../assets/images/avatar/${accessory.id}.png"
                        >

                        <button
                            class="face-btn"
                            data-id="${accessory.id}"
                        >

                            ${buttonText}

                        </button>

                    </div>

                `;

            }

        );

        this.bindFaceEvents();

    }

    bindFaceEvents() {

        const buttons =

            document.querySelectorAll(
                ".face-btn"
            );

        buttons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const id =
                            button.dataset.id;

                        if (

                            UserModel.hasItem(id)

                        ) {

                            UserModel.toggleItem(
                                "glasses",
                                id
                            );

                        }

                        else {

                            if (

                                UserModel.getCoins()
                                < 10

                            ) {

                                alert(
                                    "Moedas insuficientes!"
                                );

                                return;

                            }

                            UserModel.removeCoins(
                                10
                            );

                            UserModel.unlockItem(
                                id
                            );

                            UserModel.toggleItem(
                                "glasses",
                                id
                            );

                        }

                        this.renderFaceAccessories();

                    }

                );

            }

        );

    }

    renderAchievements() {

        const container =
            document.getElementById(
                "itemsContainer"
            );

        container.innerHTML = "";

        this.achievements.forEach(
            achievement => {

                const unlocked =

                    UserModel.hasAchievement(
                        achievement.id
                    );
                
                const equipped =

                    UserModel
                        .getEquippedAchievements()
                        .includes(
                            achievement.id
                        );
                
                container.innerHTML += `

                    <div class="item">

                        <img
                            src="../assets/images/conquistas/${achievement.id}.png"
                        >

                        <button
                            class="achievement-btn"
                            data-id="${achievement.id}"
                            ${!unlocked ? "disabled" : ""}
                        >

                            ${equipped
                                ? "Equipado"
                                : unlocked
                                    ? "Equipar"
                                    : "Bloqueada"}

                        </button>

                    </div>

                `;

            }

        );

        this.bindAchievementEvents();

    }

    bindAchievementEvents() {

        const buttons =

            document.querySelectorAll(
                ".achievement-btn"
            );

        buttons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        UserModel.toggleAchievement(
                            button.dataset.id
                        );

                        this.renderAchievements();

                    }

                );

            }

        );

    }
}