// perfilView.js
import { perfilModel } from '../js/model/PerfilModel.js';

// Adicionamos o "export default" aqui na frente da classe
export default class PerfilView {
    constructor() {
        // --- Mapeamento do DOM ---
        this.settingsBtn = document.querySelector('.settings-btn');
        this.editBtn = document.querySelector('.edit-btn');
        this.logoutBtn = document.querySelector('.logout-btn');
        this.expandBtn = document.querySelector('.expand-btn');
        
        this.avatarImg = document.querySelector('.avatar-container img');
        this.usernameContainer = document.querySelector('.username');
        this.equipCircles = document.querySelectorAll('.equip-circle');
        
        this.xpSpan = document.querySelector('.xp-card span');
        this.xpFill = document.querySelector('.xp-fill');
        this.saldoValue = document.querySelector('.saldo-value');
        this.conquistasContainer = document.querySelector('.conquistas');

        // --- Inicialização Automática ao Instanciar ---
        this.setupEvents();
        this.render();
    }

    setupEvents() {
        // (Fica igual ao código anterior...)
        this.editBtn.addEventListener('click', () => {
            const novoNome = prompt("Digita o teu novo username:", perfilModel.username);
            if (novoNome) {
                perfilModel.updateUsername(novoNome);
                this.render();
            }
        });

        this.logoutBtn.addEventListener('click', () => {
            if (confirm("Desejas mesmo terminar sessão?")) {
                perfilModel.logout();
                window.location.href = '../html/login.html';
            }
        });
    }

    render() {
        // (Método que injeta os dados do perfilModel no HTML...)
        this.usernameContainer.textContent = perfilModel.username;
        this.avatarImg.src = perfilModel.avatarUrl;
        
        this.equipCircles.forEach((circle, index) => {
            circle.textContent = perfilModel.equippedItems[index] || '';
        });

        const currentXp = perfilModel.xp;
        const maxXp = perfilModel.maxXp || 1000;
        this.xpSpan.textContent = `${currentXp} / ${maxXp}`;
        this.xpFill.style.width = `${(currentXp / maxXp) * 100}%`;

        this.saldoValue.innerHTML = `${perfilModel.saldo} 🪙`;
    }
}
