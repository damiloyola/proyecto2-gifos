let arrMisGif;

const fetchIdMiGif = async (id) => {
    let res = await fetch(
        "https://api.giphy.com/v1/gifs?ids=" +
            id +
            "&api_key=eDyIdYyGYjGzyjzBCvahgfJE97JU6hYJ&q"
    );
    let migif = await res.json();
    console.log(migif);

    addMisGif(migif.data[0].images.downsized.url, "User", "Sin Titulo");
};

let arrGifsId;

if (localStorage.getItem("MisGifs") === null) {
    arrMisGif = [];
    localStorage.setItem("MisGifs", JSON.stringify(arrMisGif));
} else {
    arrMisGif = JSON.parse(localStorage.getItem("MisGifs"));
}

const addMisGif = (url, user, title) => {
    let miGif = {
        user: user,
        title: title,
        url: url,
    };

    arrMisGif.push(miGif);

    console.log(arrMisGif);

    localStorage.setItem("MisGifs", JSON.stringify(arrMisGif));
    populateMisGif();
};

const deleteMisGif = (url) => {
    for (let i = 0; i < arrMisGif.length; i++) {
        if (arrMisGif[i].url === url) {
            arrMisGif.splice(i, 1);
        }
    }
    localStorage.setItem("MisGifs", JSON.stringify(arrMisGif));
    populateMisGif();
};

const populateMisGif = () => {
    const misGifLocalStorage = JSON.parse(localStorage.getItem("MisGifs"));
    $misGifGallery.innerHTML = "";
    if (misGifLocalStorage.length == 0) {
        $misGifGallery.innerHTML = `
        <div class ="error-container">
        <img class="error-img"  src="assets/icon-mis-gifos-sin-contenido.svg" alt="Sin resultados de busqueda" >
        <h4 class="error-text">¡Animate a crear tu primer GIFO!</h4>
        </div> `;
    } else {
        for (let i = 0; i < misGifLocalStorage.length; i++) {
            const gifContainer = document.createElement("div");
            gifContainer.classList.add("result_container_misGif");
            gifContainer.innerHTML = `<img class="gif_result" src="${misGifLocalStorage[i].url}" alt="${misGifLocalStorage[i].title}"></img>
            <div class="gif_hover hide">
               <div class="gif_icons">
                   <div class="icon iconTrash" onclick="deleteMisGif('${misGifLocalStorage[i].url}')"></div>
                   <div class="icon iconDownload" onclick="downloadGif('${misGifLocalStorage[i].url}','${misGifLocalStorage[i].title}')"></div>
                   <div class="icon iconBig" onclick="showMax('${misGifLocalStorage[i].url}','${misGifLocalStorage[i].user}','${misGifLocalStorage[i].title}')"></div>
                              
               </div>
               <div class="gif_details">
                   <p class="gif_user">${misGifLocalStorage[i].user}</p>
                   <h5 class="gif_title">${misGifLocalStorage[i].title}</h5>                          
               </div>
            </div>`;

            $misGifGallery.appendChild(gifContainer);
        }
    }
};

populateMisGif();
