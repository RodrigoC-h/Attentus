// perfilModel.js
export const perfilModel = {
    username: "User",
    avatarUrl: "../assets/images/avatar.png",
    equippedItems: ["🏆", "", ""],
    xp: 748,
    maxXp: 1000,
    saldo: 80,
    conquistas: [
        { title: "Primeira Vitória", statusText: "Completado", progress: 1, max: 1, imgUrl: "../assets/images/conquista1.png" },
        { title: "10 Jogos Jogados", statusText: "7/10", progress: 7, max: 10, imgUrl: "../assets/images/conquista2.png" },
        { title: "Ofensiva", statusText: "7/15 Dias", progress: 7, max: 15, imgUrl: "../assets/images/conquista3.png" }
    ],
    
    updateUsername(novoNome) {
        this.username = novoNome;
        // aqui podias fazer um fetch/axios para guardar na base de dados
    },
    logout() {
        console.log("Limpar tokens de sessão...");
    }
};