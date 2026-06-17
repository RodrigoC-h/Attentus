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

    static register(username, email, password) {

        const data = this.getData();

        const userExists = data.users.find(
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

            ownedItems: ["avatar_azul"],

            equippedItems: {
                hat: null,
                glasses: null,
                accessory: null
            },

            equippedAchievements: [null, null, null],

            coins: 0,

            stats: {
                melhorTempoReacao: null,
                objetosEncontrados: 0,
                alvosAcertados: 0,
                sequenciaSemErros: 0,
                sequenciaVitoriasSeguidas: 0,
                totalMoedasObtidas: 0
            },

            achievements: [],

            progress: {
                sequencia: { facil: 0, medio: 0, dificil: 0 },
                organizacao: { facil: 0, medio: 0, dificil: 0 },
                alvo: { facil: 0, medio: 0, dificil: 0 }
            },

            completedLevels: {
                sequencia: [],
                organizacao: [],
                alvo: []
            },

            xp: 0,

            gamesPlayed: {
                reacao: 0,
                foco: 0,
                sequencia: 0,
                organizacao: 0,
                alvo: 0
            }

        };

        data.users.push(user);

        data.currentUser = user.id;

        this.saveData(data);

        return true;

    }

    static login(usernameOrEmail, password) {

        const data = this.getData();

        const user = data.users.find(
            user =>
                (
                    user.username === usernameOrEmail ||
                    user.email === usernameOrEmail
                )
                && user.password === password
        );

        if (user) {

            data.currentUser = user.id;

            this.saveData(data);

            return true;

        }

        return false;

    }

    static logout() {

        const data = this.getData();

        data.currentUser = null;

        this.saveData(data);

    }

    static isLoggedIn() {

        return this.getCurrentUser() !== undefined;

    }

    // ===== ADMIN =====

    static ensureAdminUser() {

        const data = this.getData();

        const adminExists = data.users.find(
            u => u.username === "admin"
        );

        if (!adminExists) {

            data.users.unshift({

                id: "admin",

                username: "admin",

                email: "admin@attentus.pt",

                password: "admin123",

                role: "admin",

                avatar: "avatar_azul",

                ownedItems: ["avatar_azul"],

                equippedItems: {
                    hat: null,
                    glasses: null,
                    accessory: null
                },

                equippedAchievements: [null, null, null],

                coins: 0,

                stats: {
                    melhorTempoReacao: null,
                    objetosEncontrados: 0,
                    alvosAcertados: 0,
                    sequenciaSemErros: 0,
                    sequenciaVitoriasSeguidas: 0,
                    totalMoedasObtidas: 0
                },

                achievements: [],

                progress: {
                    sequencia: { facil: 0, medio: 0, dificil: 0 },
                    organizacao: { facil: 0, medio: 0, dificil: 0 },
                    alvo: { facil: 0, medio: 0, dificil: 0 }
                },

                completedLevels: {
                    sequencia: [],
                    organizacao: [],
                    alvo: []
                },

                xp: 0,

                gamesPlayed: {
                    reacao: 0,
                    foco: 0,
                    sequencia: 0,
                    organizacao: 0,
                    alvo: 0
                }

            });

            this.saveData(data);

        }

    }

    static isAdmin() {

        const user = this.getCurrentUser();

        return user ? user.role === "admin" : false;

    }

    // ===== GETTERS =====

    static getUsername() {

        const user = this.getCurrentUser();

        return user ? user.username : "";

    }

    static getEmail() {

        const user = this.getCurrentUser();

        return user ? user.email : "";

    }

    static getCoins() {

        const user = this.getCurrentUser();

        return user ? user.coins : 0;

    }

    static addCoins(coins) {

        const data = this.getData();

        const user = data.users.find(
            user => user.id === data.currentUser
        );

        if (!user) return;

        user.coins += coins;

        user.stats.totalMoedasObtidas += coins;

        this.saveData(data);

    }

    static removeCoins(coins) {

        const data = this.getData();

        const user = data.users.find(
            user => user.id === data.currentUser
        );

        if (!user) return;

        user.coins -= coins;

        this.saveData(data);

    }

    static getXp() {

        const user = this.getCurrentUser();

        return user ? user.xp : 0;

    }

    static addXp(xp) {

        const data = this.getData();

        const user = data.users.find(
            user => user.id === data.currentUser
        );

        if (!user) return;

        user.xp += xp;

        this.saveData(data);

    }

    static getAvatar() {

        const user = this.getCurrentUser();

        return user ? user.avatar : "avatar_azul";

    }

    static setAvatar(avatarId) {

        const data = this.getData();

        const user = data.users.find(
            user => user.id === data.currentUser
        );

        if (!user) return;

        user.avatar = avatarId;

        this.saveData(data);

    }

    static getEquippedHat() {

        return this.getEquippedItem("hat");

    }

    static getEquippedItem(category) {

        const user = this.getCurrentUser();

        return user ? user.equippedItems[category] : null;

    }

    static getTotalCoinsEarned() {

        const user = this.getCurrentUser();

        return user ? user.stats.totalMoedasObtidas : 0;

    }

    static getEquippedAchievements() {

        const user = this.getCurrentUser();

        return user ? user.equippedAchievements : [];

    }

    static equipAchievement(id) {

        const data = this.getData();

        const user = data.users.find(
            user => user.id === data.currentUser
        );

        if (!user) return;

        const index = user.equippedAchievements.findIndex(
            slot => slot === null
        );

        if (index !== -1) {
            user.equippedAchievements[index] = id;
        }

        this.saveData(data);

    }

    static toggleAchievement(id) {

        const data = this.getData();

        const user = data.users.find(
            user => user.id === data.currentUser
        );

        if (!user) return;

        const equippedIndex = user.equippedAchievements.indexOf(id);

        if (equippedIndex !== -1) {

            user.equippedAchievements[equippedIndex] = null;

        } else {

            const freeSlot = user.equippedAchievements.findIndex(
                slot => slot === null
            );

            if (freeSlot !== -1) {
                user.equippedAchievements[freeSlot] = id;
            }

        }

        this.saveData(data);

    }

    static toggleItem(category, itemId) {

        const data = this.getData();

        const user = data.users.find(
            user => user.id === data.currentUser
        );

        if (!user) return;

        if (user.equippedItems[category] === itemId) {
            user.equippedItems[category] = null;
        } else {
            user.equippedItems[category] = itemId;
        }

        this.saveData(data);

    }

}
