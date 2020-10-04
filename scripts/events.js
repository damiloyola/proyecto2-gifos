const $imgMax = document.querySelector(".img_max");
const $sectionMax = document.getElementById("max");
const $sectionHero = document.getElementById("hero");
const $closeMax = document.querySelector(".max__close");

const showMax = (url, user, title) => {
    const $userMax = document.querySelector(".max_user");
    $userMax.innerHTML = user;
    const $titleMax = document.querySelector(".max_title");
    $titleMax.innerHTML = title;
    $sectionMax.classList.remove("hide");
    $sectionHero.classList.add("hide");
    $imgMax.src = url;
    window.scrollTo({ top: 0, behavior: "auto" });
};

const closeMax = () => {
    $sectionMax.classList.add("hide");
    $sectionHero.classList.remove("hide");
    window.scrollTo({ top: 650, behavior: "smooth" });
};

$closeMax.addEventListener("click", closeMax);
