export default class StorageManager {

    // =========================
    // INICIALIZAÇÃO
    // =========================
    // Cria a estrutura inicial
    // no localStorage caso ainda
    // não exista

    static initialize() {

        if (!localStorage.getItem("attentusData")) {

            const defaultData = {

                // Utilizador com sessão iniciada
                currentUser: null,

                // Lista de utilizadores
                users: [],

                // Definições da aplicação
                settings: {

                    sound: 65,
                    music: 65,
                    language: "pt"

                }

            };

            this.save(defaultData);

        }

    }

    // =========================
    // CARREGAR DADOS
    // =========================
    // Obtém os dados guardados
    // no localStorage

    static load() {

        const data =

            localStorage.getItem(
                "attentusData"
            );

        return data
            ? JSON.parse(data)
            : null;

    }

    // =========================
    // GUARDAR DADOS
    // =========================
    // Guarda os dados no
    // localStorage

    static save(data) {

        localStorage.setItem(

            "attentusData",

            JSON.stringify(data)

        );

    }

    // =========================
    // REINICIAR DADOS
    // =========================
    // Remove todos os dados
    // guardados da aplicação

    static reset() {

        localStorage.removeItem(
            "attentusData"
        );

    }

}