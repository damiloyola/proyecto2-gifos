// ** NAVIGATION ** //
const goToFav = () => {
    populateFavGif();
    window.scrollTo({ top: 0, behavior: "auto" });
    $sectionHero.classList.add("hide");
    $misGifContainer.classList.add("hide");
    $createContainer.classList.add("hide");
    $favContainer.classList.remove("hide");
    $mainContainer.classList.add("hide");
    $burgerMenuUl.classList.add("hide");
    $sectionMax.classList.add("hide");
    $trendContainer.classList.remove("hide");
    $footerContainer.classList.remove("hide");
    if (localStorage.getItem("mode") === "dark") {
        $burgerBtn.src = "assets/burger-modo-noct.svg";
    } else {
        $burgerBtn.src = "assets/burger.svg";
    }
};

const goToMisGif = () => {
    populateMisGif();
    window.scrollTo({ top: 0, behavior: "auto" });
    $sectionHero.classList.add("hide");
    $favContainer.classList.add("hide");
    $createContainer.classList.add("hide");
    $mainContainer.classList.add("hide");
    $misGifContainer.classList.remove("hide");
    $burgerMenuUl.classList.add("hide");
    $sectionMax.classList.add("hide");
    $footerContainer.classList.remove("hide");
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
let handleMaxClick;
const showMax = (fav, url, user, title) => {
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
    $footerContainer.classList.add("hide");
    $imgMax.src = url;
    window.scrollTo({ top: 0, behavior: "auto" });

    if (fav === "fav") {
        handleMaxClick = () => {
            deleteFav(url);
            goToFav();
        };
        $favMaxBtn.src = "/assets/icon-trash-normal.svg";
    } else if (fav === "gifo") {
        handleMaxClick = () => {
            deleteMisGif(url);
            goToMisGif();
        };
        $favMaxBtn.src = "/assets/icon-trash-normal.svg";
    } else {
        handleMaxClick = () => {
            addFav(url, user, title);
            closeMax();
        };
        $favMaxBtn.src = "/assets/icon-fav.svg";
    }

    // if (fav === "fav") {
    //     $favMaxBtn.src = "/assets/icon-trash-normal.svg";

    //     $favMaxBtn.addEventListener("click", () => {
    //         $favMaxBtn.src = "/assets/icon-trash-hover.svg";
    //         deleteFav(url);

    //         goToFav();

    //         return;
    //     });
    // } else if (fav === "gifo") {
    //     $favMaxBtn.src = "/assets/icon-trash-normal.svg";
    //     $favMaxBtn.addEventListener("click", () => {
    //         $favMaxBtn.src = "/assets/icon-trash-hover.svg";
    //         deleteMisGif(url);
    //         goToMisGif();

    //         return;
    //     });
    // } else {
    //     $favMaxBtn.src = "/assets/icon-fav.svg";

    //     $favMaxBtn.addEventListener("click", () => {
    //         $favMaxBtn.src = "/assets/icon-fav-active.png";
    //         addFav(url, user, title);
    //         closeMax();
    //         return;
    //     });
    // }
};

const closeMax = () => {
    $sectionMax.classList.add("hide");
    $trendContainer.classList.remove("hide");
    $sectionHero.classList.remove("hide");
    $mainContainer.classList.remove("hide");
    $favContainer.classList.add("hide");
    $misGifContainer.classList.add("hide");
    $createContainer.classList.add("hide");
    $footerContainer.classList.remove("hide");
    window.scrollTo({ top: 650, behavior: "smooth" });
};

$closeMax.addEventListener("click", closeMax);

// ** DOWNLOAD ** //

async function downloadGif(url, title) {
    let blob = await fetch(url).then((img) => img.blob());
    invokeSaveAsDialog(blob, title + ".gif");
}
