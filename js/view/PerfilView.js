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

        this.achievements = [

            {
                id: "primeira_vitoria",
                nome: "Primeira Vitória",
                descricao: "Completar um nível"
            },

            {
                id: "reflexos_aco",
                nome: "Reflexos de Aço",
                descricao: "Obter menos de 300ms"
            },

            {
                id: "colecionador",
                nome: "Colecionador",
                descricao: "Obter 100 moedas"
            },

            {
                id: "imbativel",
                nome: "Imbatível",
                descricao: "Obter 10 sequências seguidas"
            },

            {
                id: "mestre_sequencias",
                nome: "Mestre de Sequências",
                descricao: "Completar uma dificuldade"
            },

            {
                id: "olho_aguia",
                nome: "Olho de Águia",
                descricao: "Encontrar 30 objetos"
            },

            {
                id: "atirador_elite",
                nome: "Atirador Elite",
                descricao: "Acertar 100 alvos"
            },

            {
                id: "mestre_organizacao",
                nome: "Mestre da Organização",
                descricao: "Completar uma dificuldade"
            },

            {
                id: "explorador",
                nome: "Explorador",
                descricao: "Jogar os 5 jogos"
            }

        ];

        this.loadUserData();

        this.renderAchievements();

        this.expanded = false;

        this.bindAchievementExpand();

        this.bindEvents();

        this.bindStatsModal();

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
    
    renderAchievements() {

        const container =
            document.getElementById(
                "conquistasContainer"
            );

        if (!container) {

            return;

        }

        container.innerHTML = "";

        const achievementsToShow =

            this.expanded

                ? this.achievements

                : this.achievements.slice(
                    0,
                    3
                );

        achievementsToShow.forEach(
            achievement => {

                const unlocked =

                    UserModel.hasAchievement(
                        achievement.id
                    );

                let current = 0;

                let max = 1;

                switch (achievement.id) {

                    case "primeira_vitoria":

                        current =

                            UserModel.hasAchievement(
                                "primeira_vitoria"
                            )

                            ? 1
                            : 0;

                        max = 1;

                        break;

                    case "reflexos_aco":

                        current =

                            UserModel.hasAchievement(
                                "reflexos_aco"
                            )

                            ? 1
                            : 0;

                        max = 1;

                        break;

                    case "colecionador":

                        current = Math.min(

                            UserModel.getTotalCoinsEarned(),

                            100

                        );

                        max = 100;

                        break;

                    case "imbativel":

                        current = Math.min(

                            UserModel.getSequenceWinStreak(),

                            10

                        );

                        max = 10;

                        break;

                    case "olho_aguia":

                        current = Math.min(

                            UserModel.getCurrentUser()
                                .stats
                                .objetosEncontrados,

                            30

                        );

                        max = 30;

                        break;

                    case "atirador_elite":

                        current = Math.min(

                            UserModel.getCurrentUser()
                                .stats
                                .alvosAcertados,

                            100

                        );

                        max = 100;

                        break;

                    case "explorador":

                        current = 0;

                        const games =
                            UserModel.getCurrentUser()
                                .gamesPlayed;

                        Object.values(games)
                            .forEach(v => {

                                if (v > 0) {

                                    current++;

                                }

                            });

                        max = 5;

                        break;

                    default:

                        current =
                            unlocked ? 1 : 0;

                        max = 1;

                }

                container.innerHTML += `

                    <div class="conquista">

                        <img
                            src="../assets/images/conquistas/${achievement.id}.png"
                        >

                        <h4>
                            ${achievement.nome}
                        </h4>

                        <p class="achievement-desc">

                            ${achievement.descricao}

                        </p>

                        <span>

                            ${current >= max

                                ? "Completado"

                                : `${current}/${max}`}

                        </span>

                        <div class="progress">

                            <div
                                class="progress-fill"
                                style="width:${(current / max) * 100}%"
                            ></div>

                        </div>

                    </div>

                `;

            }

        );

        const expandBtn =

            document.getElementById(
                "expandAchievements"
            );

        if (expandBtn) {

            expandBtn.textContent =

                this.expanded

                    ? "↑"

                    : "↓";

        }

    }

    bindAchievementExpand() {

        const btn =

            document.getElementById(
                "expandAchievements"
            );

        if (!btn) {

            return;

        }

        btn.addEventListener(
            "click",
            () => {

                this.expanded =
                    !this.expanded;

                this.renderAchievements();

            }
        );

    }

    bindStatsModal() {

        const card =

            document.querySelector(
                ".user-card"
            );

        const modal =

            document.getElementById(
                "statsModal"
            );

        const close =

            document.getElementById(
                "closeStatsModal"
            );

        const content =

            document.getElementById(
                "statsContent"
            );

        if (

            !card ||

            !modal ||

            !close ||

            !content

        ) {

            return;

        }

        card.addEventListener(
            "click",
            () => {

                const reaction =

                    UserModel.getBestReactionTime();

                const sequenciaLevels =

                    UserModel
                        .getCompletedLevels(
                            "sequencia"
                        )
                        .length;

                const alvoLevels =

                    UserModel
                        .getCompletedLevels(
                            "alvo"
                        )
                        .length;

                const objects =

                    UserModel.getFoundObjects();

                const hits =

                    UserModel
                        .getCurrentUser()
                        .stats
                        .alvosAcertados;

                content.innerHTML = `

                    <div class="stat-line">

                        <strong>
                            Reação
                        </strong>

                        <br>

                        Melhor tempo:
                        ${reaction ?? "-" } ms

                    </div>

                    <div class="stat-line">

                        <strong>
                            Sequência
                        </strong>

                        <br>

                        ${sequenciaLevels}/69 níveis

                    </div>

                    <div class="stat-line">

                        <strong>
                            Foco
                        </strong>

                        <br>

                        ${objects} objetos encontrados

                    </div>

                    <div class="stat-line">

                        <strong>
                            Alvo
                        </strong>

                        <br>

                        ${alvoLevels}/69 níveis

                        <br>

                        ${hits} alvos acertados

                    </div>

                `;

                modal.classList.remove(
                    "hidden"
                );

            }
        );

        close.addEventListener(
            "click",
            () => {

                modal.classList.add(
                    "hidden"
                );

            }
        );

    }
    
}