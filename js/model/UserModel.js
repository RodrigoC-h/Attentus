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

                escapeRoom: {
                    facil: null,
                    medio: null,
                    dificil: null
                }
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

}