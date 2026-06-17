import StorageManager from "../managers/StorageManager.js";

export default class UserModel {

    static getData() {

        return StorageManager.load();

    }

    static saveData(data) {

        StorageManager.save(data);

    }

    static getCurrentUser() {

        const data = this.getData();

        return data.users.find(
            user => user.id === data.currentUser
        );

    }

    static register(
        username,
        email,
        password
    ) {

        const data = this.getData();

        const userExists =
            data.users.find(
                user =>
                    user.username === username ||
                    user.email === email
            );

        if (userExists) {

            return false;

        }

        const user = {

            id: Date.now(),

            username,

            email,

            password,

            avatar: "avatar_azul",

            ownedItems: [

                "avatar_azul"

            ],

            equippedItems: {

                hat: null,

                glasses: null,

                accessory: null

            },

            equippedAchievements: [

                null,
                null,
                null

            ],

            coins: 0,

            stats: {

                melhorTempoReacao: null,

                objetosEncontrados: 0,

                alvosAcertados: 0,

                sequenciaVitoriasSeguidas: 0,

                totalMoedasObtidas: 0

            },

            achievements: [],

            progress: {

                sequencia: {
                    facil: 0,
                    medio: 0,
                    dificil: 0
                },

                alvo: {
                    facil: 0,
                    medio: 0,
                    dificil: 0
                }

            },

            completedLevels: {

                sequencia: [],
                alvo: []

            },

            xp: 0,

            gamesPlayed: {
                reacao: 0,
                foco: 0,
                sequencia: 0,
                alvo: 0
            },

            recentGames: []

        };

        data.users.push(user);

        data.currentUser =
            user.id;

        this.saveData(data);

        return true;

    }

    static login(
        usernameOrEmail,
        password
    ) {

        const data = this.getData();

        const user =
            data.users.find(
                user =>

                    (
                        user.username === usernameOrEmail ||
                        user.email === usernameOrEmail
                    )

                    &&

                    user.password === password
            );

        if (
            usernameOrEmail === "admin" &&
            password === "admin123"
        ) {

            localStorage.setItem(
                "isAdmin",
                "true"
            );

            let adminUser =
                data.users.find(
                    user =>
                        user.username === "admin"
                );

            if (!adminUser) {

                adminUser = {

                    id: Date.now(),

                    username: "admin",

                    email: "admin@admin.pt",

                    password: "admin123",

                    avatar: "avatar_azul",

                    ownedItems: [
                        "avatar_azul"
                    ],

                    equippedItems: {
                        hat: null,
                        glasses: null,
                        accessory: null
                    },

                    equippedAchievements: [
                        null,
                        null,
                        null
                    ],

                    coins: 0,
                    xp: 0,

                    stats: {
                        melhorTempoReacao: null,
                        objetosEncontrados: 0,
                        alvosAcertados: 0,
                        sequenciaVitoriasSeguidas: 0,
                        totalMoedasObtidas: 0
                    },

                    achievements: [],

                    progress: {
                        sequencia: {
                            facil: 0,
                            medio: 0,
                            dificil: 0
                        },
                        alvo: {
                            facil: 0,
                            medio: 0,
                            dificil: 0
                        }
                    },

                    completedLevels: {
                        sequencia: [],
                        alvo: []
                    },

                    gamesPlayed: {
                        reacao: 0,
                        foco: 0,
                        sequencia: 0,
                        alvo: 0
                    },

                    recentGames: []

                };

                data.users.push(
                    adminUser
                );

            }

            data.currentUser =
                adminUser.id;

            this.saveData(data);

            return true;
        }

        if (user) {

            data.currentUser =
                user.id;

            this.saveData(data);

            return true;

        }

        return false;

    }

    static logout() {

        const data = this.getData();

        localStorage.removeItem(
            "isAdmin"
        );

        data.currentUser = null;

        this.saveData(data);

    }

    static getUsername() {

        const user =
            this.getCurrentUser();

        return user
            ? user.username
            : "";

    }

    static getEmail() {

        const user =
            this.getCurrentUser();

        return user
            ? user.email
            : "";

    }

    static getCoins() {

        const user =
            this.getCurrentUser();

        return user
            ? user.coins
            : 0;

    }

    static addCoins(coins) {

        const data =
            this.getData();

        const user =
            data.users.find(
                user =>
                    user.id === data.currentUser
            );

        if (!user) {
            return;
        }

        user.coins += coins;

        user.stats.totalMoedasObtidas +=
            coins;

        this.saveData(data);
    }

    static removeCoins(coins) {

        const data =
            this.getData();

        const user =
            data.users.find(
                user =>
                    user.id === data.currentUser
            );

        if (!user) {
            return;
        }

        user.coins -= coins;

        this.saveData(data);

    }

    static isLoggedIn() {

        return this.getCurrentUser() !== undefined;

    }

    static getXp() {

        const user =
            this.getCurrentUser();

        return user
            ? user.xp
            : 0;

    }

    static addXp(xp) {

        const data =
            this.getData();

        const user =
            data.users.find(
                user =>
                    user.id === data.currentUser
            );

        if (!user) {
            return;
        }

        user.xp += xp;

        this.saveData(data);

    }

    static getLevel() {

        const xp =
            this.getXp();

        return Math.min(
            Math.floor(xp / 100) + 1,
            20
        );

    }
    
    static getBestReactionTime() {

        const user =
            this.getCurrentUser();

        return user
            ? user.stats.melhorTempoReacao
            : null;

    }

    static updateBestReactionTime(time) {

        const data =
            this.getData();

        const user =
            data.users.find(
                user =>
                    user.id === data.currentUser
            );

        if (!user) {
            return;
        }

        if (

            user.stats.melhorTempoReacao === null ||

            time <
            user.stats.melhorTempoReacao

        ) {

            user.stats.melhorTempoReacao =
                time;

            this.saveData(data);

        }

    }

    static hasAchievement(id) {

        const user =
            this.getCurrentUser();

        return user
            ? user.achievements.includes(id)
            : false;

    }

    static hasCompletedLevel(
        game,
        difficulty,
        level
    ) {

        const user =
            this.getCurrentUser();

        if (
            !user ||
            !user.completedLevels
        ) {

            return false;

        }

        return user.completedLevels[game]
            .includes(
                `${difficulty}-${level}`
            );

    }

    static completeLevel(
        game,
        difficulty,
        level
    ) {

        const data =
            this.getData();

        const user =
            data.users.find(
                user =>
                    user.id ===
                    data.currentUser
            );

        if (!user) {

            return;

        }

        if (!user.completedLevels) {

            user.completedLevels = {

                sequencia: [],
                alvo: []

            };

        }

        const levelId =
            `${difficulty}-${level}`;

        if (

            !user.completedLevels[game]
                .includes(levelId)

        ) {

            user.completedLevels[game]
                .push(levelId);

            this.saveData(data);

        }

    }

    static hasCompletedDifficulty(
        game,
        difficulty
    ) {

        const user =
            this.getCurrentUser();

        if (!user) {

            return false;

        }

        for (

            let level = 0;

            level <= 23;

            level++

        ) {

            const levelId =
                `${difficulty}-${level}`;

            if (

                !user.completedLevels[game]
                    .includes(levelId)

            ) {

                return false;

            }

        }

        return true;

    }

    static getCompletedLevels(
        game
    ) {

        const user =
            this.getCurrentUser();

        if (
            !user ||
            !user.completedLevels
        ) {

            return [];

        }

        return user.completedLevels[
            game
        ];

    }

    static addSequenceWin() {

        const data =
            this.getData();

        const user =
            data.users.find(
                user =>
                    user.id === data.currentUser
            );

        if (!user) {

            return;

        }

        user.stats.sequenciaVitoriasSeguidas++;

        this.saveData(data);

    }

    static resetSequenceWinStreak() {

        const data =
            this.getData();

        const user =
            data.users.find(
                user =>
                    user.id === data.currentUser
            );

        if (!user) {

            return;

        }

        user.stats.sequenciaVitoriasSeguidas = 0;

        this.saveData(data);

    }

    static getSequenceWinStreak() {

        const user =
            this.getCurrentUser();

        return user
            ? user.stats.sequenciaVitoriasSeguidas
            : 0;

    }

    static unlockAchievement(id) {

        const data =
            this.getData();

        const user =
            data.users.find(
                user =>
                    user.id === data.currentUser
            );

        if (!user) {
            return;
        }

        if (

            !user.achievements.includes(id)

        ) {

            user.achievements.push(id);

            this.saveData(data);

        }

    }

    static isLevelUnlocked(
        game,
        difficulty,
        level
    ) {

        level =
            Number(level);

        if (level === 0) {

            return true;

        }

        return this.hasCompletedLevel(

            game,

            difficulty,

            level - 1

        );

    }

    static hasItem(itemId) {

        const user =
            this.getCurrentUser();

        if (!user) {

            return false;

        }

        return user.ownedItems.includes(
            itemId
        );

    }


    static unlockItem(itemId) {

        const data =
            this.getData();

        const user =
            data.users.find(
                user =>
                    user.id ===
                    data.currentUser
            );

        if (!user) {

            return;

        }

        if (

            !user.ownedItems.includes(
                itemId
            )

        ) {

            user.ownedItems.push(
                itemId
            );

            this.saveData(data);

        }

    }

    static equipItem(
        category,
        itemId
    ) {

        const data =
            this.getData();

        const user =
            data.users.find(
                user =>
                    user.id ===
                    data.currentUser
            );

        if (!user) {

            return;

        }

        user.equippedItems[
            category
        ] = itemId;

        this.saveData(data);

    }

    static getEquippedItem(
        category
    ) {

        const user =
            this.getCurrentUser();

        if (!user) {

            return null;

        }

        return user.equippedItems[
            category
        ];

    }

    static ensureInventory() {

        const data =
            this.getData();

        const user =
            data.users.find(
                user =>
                    user.id ===
                    data.currentUser
            );

        if (!user) {

            return;

        }

        if (!user.ownedItems) {

            user.ownedItems = [

                "avatar_azul"

            ];

        }

        if (!user.equippedItems) {

            user.equippedItems = {

                hat: null,

                glasses: null,

                accessory: null

            };

        }

        if (!user.equippedAchievements) {

            user.equippedAchievements = [

                null,
                null,
                null

            ];

        }

        this.saveData(data);

    }

    static getOwnedItems() {

        const user =
            this.getCurrentUser();

        return user
            ? user.ownedItems
            : [];

    }

    static getAvatar() {

        const user =
            this.getCurrentUser();

        return user
            ? user.avatar
            : "avatar_azul";

    }

    static setAvatar(
        avatarId
    ) {

        const data =
            this.getData();

        const user =
            data.users.find(
                user =>
                    user.id ===
                    data.currentUser
            );

        if (!user) {

            return;

        }

        user.avatar =
            avatarId;

        this.saveData(data);

    }

    static getEquippedHat() {

        return this.getEquippedItem(
            "hat"
        );

    }

    static getTotalCoinsEarned() {

        const user =
            this.getCurrentUser();

        return user
            ? user.stats.totalMoedasObtidas
            : 0;

    }

    static getEquippedAchievements() {

        const user =
            this.getCurrentUser();

        return user
            ? user.equippedAchievements
            : [];

    }

    static equipAchievement(id) {

        const data =
            this.getData();

        const user =
            data.users.find(
                user =>
                    user.id ===
                    data.currentUser
            );

        if (!user) {

            return;

        }

        const index =

            user.equippedAchievements.findIndex(
                slot =>
                    slot === null
            );

        if (index !== -1) {

            user.equippedAchievements[index] =
                id;

        }

        this.saveData(data);

    }

    static toggleAchievement(id) {

        const data =
            this.getData();

        const user =
            data.users.find(
                user =>
                    user.id ===
                    data.currentUser
            );

        if (!user) {

            return;

        }

        const equippedIndex =

            user.equippedAchievements.indexOf(
                id
            );

        if (equippedIndex !== -1) {

            user.equippedAchievements[
                equippedIndex
            ] = null;

        }

        else {

            const freeSlot =

                user.equippedAchievements.findIndex(
                    slot =>
                        slot === null
                );

            if (freeSlot !== -1) {

                user.equippedAchievements[
                    freeSlot
                ] = id;

            }

        }

        this.saveData(data);

    }

    static toggleItem(
        category,
        itemId
    ) {

        const data =
            this.getData();

        const user =
            data.users.find(
                user =>
                    user.id ===
                    data.currentUser
            );

        if (!user) {

            return;

        }

        if (

            user.equippedItems[
                category
            ] === itemId

        ) {

            user.equippedItems[
                category
            ] = null;

        }

        else {

            user.equippedItems[
                category
            ] = itemId;

        }

        this.saveData(data);

    }

    static addFoundObject() {

        const data =
            this.getData();

        const user =
            data.users.find(
                user =>
                    user.id ===
                    data.currentUser
            );

        if (!user) {

            return;

        }

        user.stats.objetosEncontrados++;

        this.saveData(data);

    }

    static getFoundObjects() {

        const user =
            this.getCurrentUser();

        return user
            ? user.stats.objetosEncontrados
            : 0;

    }

    static addHit() {

        const data =
            this.getData();

        const user =
            data.users.find(
                user =>
                    user.id === data.currentUser
            );

        if (!user) {

            return;

        }

        user.stats.alvosAcertados++;

        this.saveData(data);

    }

    static addGamePlayed(
        game
    ) {

        const data =
            this.getData();

        const user =
            data.users.find(
                user =>
                    user.id ===
                    data.currentUser
            );

        if (!user) {

            return;

        }

        user.gamesPlayed[game]++;

        if (

            user.gamesPlayed.reacao > 0

            &&

            user.gamesPlayed.foco > 0

            &&

            user.gamesPlayed.sequencia > 0

            &&

            user.gamesPlayed.alvo > 0

            &&

            !user.achievements.includes(
                "explorador"
            )

        ) {

            user.achievements.push(
                "explorador"
            );

        }

        this.saveData(data);

    }

    static hasPlayedAllGames() {

        const user =
            this.getCurrentUser();

        if (!user) {

            return false;

        }

        return (

            user.gamesPlayed.reacao > 0

            &&

            user.gamesPlayed.foco > 0

            &&

            user.gamesPlayed.sequencia > 0

            &&

            user.gamesPlayed.alvo > 0

        );

    }

    static addRecentGame(game) {

        const data =
            this.getData();

        const user =
            data.users.find(
                user =>
                    user.id ===
                    data.currentUser
            );

        if (!user) {
            return;
        }

        if (!user.recentGames) {

            user.recentGames = [];

        }

        user.recentGames =

            user.recentGames.filter(
                g => g !== game
            );

        user.recentGames.unshift(
            game
        );

        user.recentGames =
            user.recentGames.slice(
                0,
                3
            );

        this.saveData(data);

    }
}