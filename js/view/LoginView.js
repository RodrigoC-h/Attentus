const btnLogin = document.getElementById("btnLogin");
const btnRegisto = document.getElementById("btnRegisto");

const loginForm = document.getElementById("loginForm");
const registoForm = document.getElementById("registoForm");

btnLogin.addEventListener("click", () => {

    btnLogin.classList.add("active");
    btnRegisto.classList.remove("active");

    loginForm.classList.remove("hidden");
    registoForm.classList.add("hidden");

});

btnRegisto.addEventListener("click", () => {

    btnRegisto.classList.add("active");
    btnLogin.classList.remove("active");

    registoForm.classList.remove("hidden");
    loginForm.classList.add("hidden");

});