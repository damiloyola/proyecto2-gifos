// ** NAVIGATION ** //
const goToFav = () => {
    $sectionHero.classList.add("hide");
    $misGifContainer.classList.add("hide");
    $createContainer.classList.add("hide");
    $favContainer.classList.remove("hide");
    $mainContainer.classList.add("hide");
    $burgerMenuUl.classList.add("hide");
    $sectionMax.classList.add("hide");
    if (localStorage.getItem("mode") === "dark") {
        $burgerBtn.src = "assets/burger-modo-noct.svg";
    } else {
        $burgerBtn.src = "assets/burger.svg";
    }
};

const goToMisGif = () => {
    $sectionHero.classList.add("hide");
    $favContainer.classList.add("hide");
    $createContainer.classList.add("hide");
    $mainContainer.classList.add("hide");
    $misGifContainer.classList.remove("hide");
    $burgerMenuUl.classList.add("hide");
    $sectionMax.classList.add("hide");
    if (localStorage.getItem("mode") === "dark") {
        $burgerBtn.src = "assets/burger-modo-noct.svg";
    } else {
        $burgerBtn.src = "assets/burger.svg";
    }
};
const goToCreate = () => {
    $trendContainer.classList.add("hide");
    $sectionHero.classList.add("hide");
    $favContainer.classList.add("hide");
    $misGifContainer.classList.add("hide");
    $mainContainer.classList.add("hide");
    $createContainer.classList.remove("hide");
    $burgerMenuUl.classList.add("hide");
    $sectionMax.classList.add("hide");
    if (localStorage.getItem("mode") === "dark") {
        $burgerBtn.src = "assets/burger-modo-noct.svg";
    } else {
        $burgerBtn.src = "assets/burger.svg";
    }
};

// ** MAX GIF **//
const $favMaxBtn = document.getElementById("addFav_max");

const showMax = (url, user, title) => {
    const $userMax = document.querySelector(".max_user");
    $userMax.innerHTML = user;
    const $titleMax = document.querySelector(".max_title");
    $titleMax.innerHTML = title;
    $sectionMax.classList.remove("hide");
    $sectionHero.classList.add("hide");
    $mainContainer.classList.add("hide");
    $trendContainer.classList.add("hide");
    $favContainer.classList.add("hide");
    $misGifContainer.classList.add("hide");
    $mainContainer.classList.add("hide");
    $createContainer.classList.add("hide");
    $imgMax.src = url;
    window.scrollTo({ top: 0, behavior: "auto" });
    if (arrFav.find((element) => element.url === url) == undefined) {
        $favMaxBtn.src = "/assets/icon-fav.svg";
        $favMaxBtn.addEventListener("click", () => {
            addFav(url, user, title);
            showMax(url, user, title);
        });
    } else {
        $favMaxBtn.src = "/assets/icon-trash-normal.svg";
        $favMaxBtn.addEventListener("click", () => {
            deleteFav(url);
            showMax(url, user, title);
        });
    }
};

const closeMax = () => {
    $sectionMax.classList.add("hide");
    $trendContainer.classList.remove("hide");
    $sectionHero.classList.remove("hide");
    $mainContainer.classList.remove("hide");
    $favContainer.classList.add("hide");
    $misGifContainer.classList.add("hide");
    $createContainer.classList.add("hide");

    window.scrollTo({ top: 650, behavior: "smooth" });
};

$closeMax.addEventListener("click", closeMax);

// ** DOWNLOAD ** //

async function downloadGif(url, title) {
    let blob = await fetch(url).then((img) => img.blob());
    invokeSaveAsDialog(blob, title + ".gif");
}
