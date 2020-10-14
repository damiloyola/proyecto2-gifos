const darkMode = () => {
    document.body.classList.toggle("darkMode");

    if (document.body.classList.contains("darkMode")) {
        localStorage.setItem("mode", "dark");
    } else {
        localStorage.setItem("mode", "light");
    }
};

const $modeBtn = document.querySelector(".modeBtn");
const $logo = document.querySelector(".header__logo");

const changeMode = () => {
    mode = localStorage.getItem("mode");

    if (mode === "dark") {
        $modeBtn.innerHTML = "Modo Claro";
        document.body.classList.add("darkMode");
        $logo.src = "/assets/Logo-modo-noc.svg";
    } else {
        document.body.classList.remove("darkMode");
        $modeBtn.innerHTML = "Modo Oscuro";
    }
};
changeMode();
