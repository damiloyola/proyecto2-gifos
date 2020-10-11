// ** NAVIGATION ** //
const goToFav = () => {
    $sectionHero.classList.add("hide");
    $misGifContainer.classList.add("hide");
    $createContainer.classList.add("hide");
    $favContainer.classList.remove("hide");
    $mainContainer.classList.add("hide");
    $burgerMenuUl.classList.add("hide");
    $sectionMax.classList.add("hide");
    $burgerBtn.src = "assets/burger.svg";
};

const goToMisGif = () => {
    $sectionHero.classList.add("hide");
    $favContainer.classList.add("hide");
    $createContainer.classList.add("hide");
    $mainContainer.classList.add("hide");
    $misGifContainer.classList.remove("hide");
    $burgerMenuUl.classList.add("hide");
    $sectionMax.classList.add("hide");
    $burgerBtn.src = "assets/burger.svg";
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
    $burgerBtn.src = "assets/burger.svg";
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

// ** FAV **//
let arrFav;
if (localStorage.getItem("FavGifs") === null) {
    arrFav = [];
} else {
    arrFav = JSON.parse(localStorage.getItem("FavGifs"));
}

const addFav = (url, user, title) => {
    let gifFav = {
        user: user,
        title: title,
        url: url,
    };

    arrFav.push(gifFav);

    console.log(arrFav);

    localStorage.setItem("FavGifs", JSON.stringify(arrFav));
    populateFavGif();
};

$favGallery = document.querySelector(".fav_gallery");
const populateFavGif = () => {
    $favGallery.innerHTML = "";
    if (localStorage.getItem("FavGifs") === null) {
        $favGallery.innerHTML = `
        <div class ="search_error-container">
        <img class="search_error-img"  src="assets/icon-fav-sin-contenido.svg" alt="Sin resultados de busqueda" >
        <h4 class="search_error-text">¡Guarda tu primer GIFO en Favoritos para que se muestre aqui!</h4>
        </div> `;
    } else {
        const gifsLocalstorage = JSON.parse(localStorage.getItem("FavGifs"));

        for (let i = 0; i < gifsLocalstorage.length; i++) {
            const gifContainer = document.createElement("div");
            gifContainer.classList.add("result_container_fav");
            gifContainer.innerHTML = `<img class="gif_result" src="${gifsLocalstorage[i].url}" alt="${gifsLocalstorage[i].title}"></img>
            <div class="gif_hover hide">
               <div class="gif_icons">
                   <div class="icon iconTrash" onclick="deleteFav('${gifsLocalstorage[i].url}')"></div>
                   <div class="icon iconDownload" onclick="downloadGif('${gifsLocalstorage[i].url}','${gifsLocalstorage[i].title}')"></div>
                   <div class="icon iconBig" onclick="showMax('${gifsLocalstorage[i].url}','${gifsLocalstorage[i].user}','${gifsLocalstorage[i].title}')"></div>
                              
               </div>
               <div class="gif_details">
                   <p class="gif_user">${gifsLocalstorage[i].user}</p>
                   <h5 class="gif_title">${gifsLocalstorage[i].title}</h5>                          
               </div>
            </div>`;

            $favGallery.appendChild(gifContainer);
        }
    }
};

const deleteFav = (url) => {
    for (let i = 0; i < arrFav.length; i++) {
        if (arrFav[i].url === url) {
            arrFav.splice(i, 1);
        }
    }
    localStorage.setItem("FavGifs", JSON.stringify(arrFav));
    populateFavGif();
};
populateFavGif();

// ** DOWNLOAD ** //

async function downloadGif(url, title) {
    let blob = await fetch(url).then((img) => img.blob());
    invokeSaveAsDialog(blob, title + ".gif");
}
