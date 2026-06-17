import StorageManager from "../managers/StorageManager.js";
import UserModel from "../model/UserModel.js";
import HeaderComponent from "../components/HeaderComponent.js";

(function initNavbar() {

    StorageManager.initialize();

    // Liga todos os botões de navegação (logo, perfil, definições, mais jogos, logout)
    new HeaderComponent();

    // Mostra botão Admin apenas se o utilizador atual for administrador
    if (!UserModel.isAdmin()) return;

    const style = document.createElement("style");
    style.textContent = `
        .admin-nav-btn {
            background: rgba(184, 204, 255, 0.15);
            border: 1px solid #b8ccff;
            border-radius: 8px;
            color: #b8ccff;
            font-size: 0.78rem;
            font-weight: bold;
            letter-spacing: 0.03em;
            padding: 4px 12px;
            cursor: pointer;
            transition: background 0.2s;
        }
        .admin-nav-btn:hover {
            background: rgba(184, 204, 255, 0.3);
        }
    `;
    document.head.appendChild(style);

    const headerIcons = document.querySelector(".header-icons");
    if (!headerIcons) return;

    const adminBtn = document.createElement("button");
    adminBtn.className = "admin-nav-btn";
    adminBtn.title = "Área de Administração";
    adminBtn.textContent = "Admin";

    adminBtn.addEventListener("click", () => {
        window.location.href = "admin.html";
    });

    headerIcons.insertBefore(adminBtn, headerIcons.firstChild);

})();
