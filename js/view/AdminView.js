import StorageManager from "../managers/StorageManager.js";
import UserModel from "../model/UserModel.js";

(function init() {

    StorageManager.initialize();

    if (!UserModel.isLoggedIn()) {
        window.location.href = "login.html";
        return;
    }

    if (!UserModel.isAdmin()) {
        window.location.href = "homepage.html";
        return;
    }

    document.getElementById("admin-username").textContent =
        UserModel.getUsername();

    renderUsers();
    setupLogout();
    setupDelete();

})();

function getUsers() {
    const data = StorageManager.load();
    return data ? data.users : [];
}

function renderUsers() {

    const users = getUsers().filter(u => u.role !== "admin");
    const list  = document.getElementById("user-list");
    const count = document.getElementById("user-count");

    count.textContent =
        `${users.length} utilizador${users.length !== 1 ? "es" : ""}`;

    if (users.length === 0) {
        list.innerHTML =
            '<p class="empty-state">Nenhum utilizador registado.</p>';
        return;
    }

    list.innerHTML = users.map(user => `
        <div class="user-card" data-id="${user.id}">

            <div class="user-card-header">
                <div class="user-info">
                    <div class="user-avatar">
                        ${user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <div class="user-name">${user.username}</div>
                        <div class="user-email">${user.email || ""}</div>
                    </div>
                </div>
            </div>

            <div class="user-stats">
                <div class="stat-item">
                    <span class="stat-label">XP</span>
                    <span class="stat-value">${user.xp ?? 0}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Moedas</span>
                    <span class="stat-value">${user.coins ?? 0} 🪙</span>
                </div>
            </div>

            <div class="user-conquistas">
                ${(user.achievements && user.achievements.length > 0)
                    ? user.achievements
                        .map(a => `<span class="conquista-tag">${a}</span>`)
                        .join("")
                    : '<span class="conquistas-vazio">Sem conquistas</span>'
                }
            </div>

            <div class="user-card-footer">
                <button class="btn-delete" data-id="${user.id}">
                    🗑 Apagar
                </button>
            </div>

        </div>
    `).join("");

}

function setupLogout() {

    const btn = document.getElementById("btn-logout");
    if (!btn) return;

    btn.addEventListener("click", () => {
        UserModel.logout();
        window.location.href = "login.html";
    });

}

function setupDelete() {

    const modal   = document.getElementById("confirm-modal");
    const msgEl   = document.getElementById("modal-message");
    const btnOk   = document.getElementById("btn-confirm-delete");
    const btnCancel = document.getElementById("btn-cancel-delete");
    let targetId  = null;

    document.getElementById("user-list").addEventListener("click", e => {

        const btn = e.target.closest(".btn-delete");
        if (!btn) return;

        targetId = btn.dataset.id;
        const name = btn
            .closest(".user-card")
            .querySelector(".user-name").textContent;

        msgEl.textContent =
            `Tens a certeza que queres apagar o utilizador "${name}"?`;

        modal.classList.remove("hidden");

    });

    btnOk.addEventListener("click", () => {

        if (!targetId) return;

        const data  = StorageManager.load();
        data.users  = data.users.filter(
            u => String(u.id) !== String(targetId)
        );
        StorageManager.save(data);

        renderUsers();
        modal.classList.add("hidden");
        targetId = null;

    });

    btnCancel.addEventListener("click", () => {
        modal.classList.add("hidden");
        targetId = null;
    });

    modal.addEventListener("click", e => {
        if (e.target === modal) {
            modal.classList.add("hidden");
            targetId = null;
        }
    });

}
