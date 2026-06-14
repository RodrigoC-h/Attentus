export default class StorageManager {

    static initialize() {

        if (!localStorage.getItem("attentusData")) {

            const defaultData = {

                currentUser: null,

                users: [

                ],

                settings: {
                    sound: 65,
                    music: 65,
                    language: "pt"
                }

            };

            this.save(defaultData);

        }

    }

    static load() {

        const data =
            localStorage.getItem("attentusData");

        return data
            ? JSON.parse(data)
            : null;

    }

    static save(data) {

        localStorage.setItem(
            "attentusData",
            JSON.stringify(data)
        );

    }

    static reset() {

        localStorage.removeItem(
            "attentusData"
        );

    }

}