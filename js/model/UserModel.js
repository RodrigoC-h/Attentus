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

            avatar: "defaultAvatar",

            coins: 0,

            stats: {

                melhorTempoReacao: null,

                objetosEncontrados: 0,

                alvosAcertados: 0,

                sequenciaSemErros: 0,

                sequenciaVitoriasSeguidas: 0

            },

            achievements: [],

            progress: {

                sequencia: {
                    facil: 0,
                    medio: 0,
                    dificil: 0
                },

                organizacao: {
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

        return Math.floor(xp / 100) + 1;

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
}