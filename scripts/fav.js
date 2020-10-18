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

const populateFavGif = () => {
    const gifsLocalstorage = JSON.parse(localStorage.getItem("FavGifs"));
    $favGallery.innerHTML = "";
    if (gifsLocalstorage == null || gifsLocalstorage.length == 0) {
        $favGallery.innerHTML = `
        <div class ="error-container">
        <img class="error-img"  src="assets/icon-fav-sin-contenido.svg" alt="Sin resultados de busqueda" >
        <h4 class="error-text">¡Guarda tu primer GIFO en Favoritos para que se muestre aqui!</h4>
        </div> `;
    } else {
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
