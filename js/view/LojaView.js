import HeaderComponent from "../components/HeaderComponent.js";
import UserModel from "../model/UserModel.js";

export default class LojaView {

    // =========================
    // INICIALIZAÇÃO
    // =========================
    // Verifica autenticação,
    // inicializa os itens da loja
    // e carrega a interface.
    constructor() {

        if (!UserModel.isLoggedIn()) {

            window.location.href =
                "login.html";

            return;

        }

        new HeaderComponent();

        // =========================
        // CATÁLOGO DE AVATARES
        // =========================
        // Define todos os avatares
        // disponíveis para compra.
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

        // =========================
        // CATÁLOGO DE CHAPÉUS
        // =========================
        // Define todos os acessórios
        // de cabeça disponíveis.
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

        // =========================
        // CATÁLOGO DE ACESSÓRIOS
        // =========================
        // Define os acessórios
        // equipáveis na cara.
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

        // =========================
        // CONQUISTAS DISPONÍVEIS
        // =========================
        // Conquistas que podem ser
        // equipadas no perfil.
        this.achievements = [

            { id: "primeira_vitoria" },
            { id: "reflexos_aco" },
            { id: "colecionador" },
            { id: "imbativel" },
            { id: "mestre_sequencias" },
            { id: "olho_aguia" },
            { id: "atirador_elite" },
            { id: "explorador" }

        ];

        this.bindTabs();

        this.renderHats();

        this.updatePreviewAvatar();

    }

    // =========================
    // ATUALIZAR PREVIEW
    // =========================
    // Atualiza a imagem do avatar
    // atualmente equipado.
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

    // =========================
    // NAVEGAÇÃO ENTRE ABAS
    // =========================
    // Alterna entre avatares,
    // chapéus, acessórios e
    // conquistas.
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

    // =========================
    // MOSTRAR AVATARES
    // =========================
    // Cria os cartões dos avatares
    // e mostra o respetivo estado:
    // comprado, equipado ou bloqueado.
    renderAvatars() {

        const container =
            document.getElementById(
                "itemsContainer"
            );

        container.innerHTML = "";

        this.avatars.forEach(
            avatar => {

                // Verifica se o avatar já foi comprado
                const owned =

                    UserModel.hasItem(
                        avatar.id
                    );

                // Verifica se o avatar está equipado
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

    // =========================
    // COMPRA E EQUIPAR AVATARES
    // =========================
    // Trata da compra e seleção
    // de avatares.
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

                        // Se já possuir o avatar,
                        // apenas equipa.
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

                            // Verifica se existem moedas
                            // suficientes para comprar.
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

    // =========================
    // MOSTRAR CHAPÉUS
    // =========================
    // Cria os itens da categoria
    // de acessórios de cabeça.
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
                            class="hat-item ${hat.id}"
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

    // =========================
    // COMPRA E EQUIPAR CHAPÉUS
    // =========================
    // Permite comprar e equipar
    // acessórios de cabeça.
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

    // =========================
    // MOSTRAR ACESSÓRIOS FACIAIS
    // =========================
    // Cria os itens da categoria
    // de acessórios faciais.
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

                console.log(accessory.id);

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

    // =========================
    // COMPRA E EQUIPAR ACESSÓRIOS
    // =========================
    // Permite comprar e equipar
    // acessórios faciais.
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

    // =========================
    // MOSTRAR CONQUISTAS
    // =========================
    // Mostra as conquistas
    // desbloqueadas pelo utilizador.
    renderAchievements() {

        const container =
            document.getElementById(
                "itemsContainer"
            );

        container.innerHTML = "";

        this.achievements.forEach(
            achievement => {

                // Verifica se a conquista
                // já foi desbloqueada.
                const unlocked =

                    UserModel.hasAchievement(
                        achievement.id
                    );
                
                // Verifica se a conquista
                // está atualmente equipada.
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

    // =========================
    // EQUIPAR CONQUISTAS
    // =========================
    // Permite equipar ou remover
    // conquistas do perfil.
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