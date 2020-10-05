const $imgMax = document.querySelector(".img_max");
const $sectionMax = document.getElementById("max");
const $sectionHero = document.getElementById("hero");
const $closeMax = document.querySelector(".max__close");

// ** MAX GIF **//
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

// ** FAV **//

let arrFav = [];

const addFav = (url, user, title) => {
    let gifFav = {
        user: user,
        title: title,
        url: url,
    };

    arrFav.push(gifFav);

    console.log(gifFav);

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
                   <div class="icon iconDownload"></div>
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
    const favArr = JSON.parse(localStorage.getItem("FavGifs"));
    for (let i = 0; i < arrFav.length; i++) {
        if (arrFav[i].url === url) {
            arrFav.splice(i, 1);
            localStorage.setItem("FavGifs", JSON.stringify(arrFav));
            populateFavGif();
        }
    }
};
populateFavGif();
