const darkMode = () => {
    document.body.classList.toggle("darkMode");

    if (document.body.classList.contains("darkMode")) {
        localStorage.setItem("mode", "dark");
    } else {
        localStorage.setItem("mode", "light");
    }
    changeMode();
};

const $modeBtn = document.querySelector(".modeBtn");
const $logo = document.querySelector(".header__logo");

const changeMode = () => {
    mode = localStorage.getItem("mode");

    if (mode === "dark") {
        $modeBtn.innerHTML = "Modo Claro";
        document.body.classList.add("darkMode");
        $logo.src = "/assets/Logo-modo-noc.svg";
        $burgerBtn.src = "assets/burger-modo-noct.svg";
        $headerSearchIcon.src = "assets/icon-search-mod-noc.svg";
        $searchIcon.src = "assets/icon-search-mod-noc.svg";
        $closMaxIcon.src = "/assets/close-modo-noct.svg";
        $rollo.src = "/assets/pelicula-modo-noc.svg";
        $camera.src = "/assets/camara-modo-noc.svg";
    } else {
        document.body.classList.remove("darkMode");
        $modeBtn.innerHTML = "Modo Oscuro";
        $logo.src = "/assets/logo-desktop (1).svg";
        $burgerBtn.src = "assets/burger.svg";
        $headerSearchIcon.src = "assets/icon-search.svg";
        $searchIcon.src = "assets/icon-search.svg";
        $closMaxIcon.src = "/assets/close.svg";
        $camera.src = "/assets/camara.svg";
        $rollo.src = "/assets/pelicula.svg";
    }
};
changeMode();
