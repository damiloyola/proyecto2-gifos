const searchUrl =
    "https://api.giphy.com/v1/gifs/search?api_key=eDyIdYyGYjGzyjzBCvahgfJE97JU6hYJ&q=";
const recomendUrl =
    "https://api.giphy.com/v1/gifs/search/tags?api_key=eDyIdYyGYjGzyjzBCvahgfJE97JU6hYJ&q=";

let searchWord = "";
let offsetSearch = 0;
let searchGifos = [];

//! FUNCIONES SEARCH

//funcion principal que busca la palabra que se pasa por parametro y muestra en galeria
const search = async (word, offset) => {
    searchWord = word;
    hideRecomended();

    $resultTitle.innerHTML = word;
    if (offset === 0) {
        searchGifos = [];
    }
    //se hace fetch con busqueda del parametro
    const res = await fetch(
        searchUrl + word + "&limit=12" + "&offset=" + offset
    );
    const datos = await res.json();

    datos.data.forEach((i) => {
        searchGifos.push(i);
    });
    populateGallery(searchGifos);
};

//funcion para obtener resultados recomendados segun texto pasado por parametro
const autocompleteSearch = async (text) => {
    //muestra o esconde estilos de recomendados
    if (text === "") {
        hideRecomended();
    } else {
        $searchUlRecomend.classList.remove("hide");
        $searchUlRecomend.innerHTML = "";
        $searchInput.classList.add("searching");
        if (localStorage.getItem("mode") === "dark") {
            $searchIcon.src = "assets/close-modo-noct.svg";
        } else {
            $searchIcon.src = "assets/close.svg";
        }
    }
    //se realiza el fetch y se guardan los datos en array results
    const response = await fetch(recomendUrl + text + "&limit=4");
    const results = await response.json();

    //se recorre el array y se van mostrando los resultados como recomendados
    results.data.forEach((i) => {
        const li = document.createElement("li");
        li.classList.add("recomend__result");
        li.innerHTML = `<button onclick="search('${i.name}', ${offsetSearch})">${i.name}</button>`;
        $searchUlRecomend.appendChild(li);
    });
};

//funcion que va colocando los gifs del array pasado por parametro dentro de la galeria
const populateGallery = (arr) => {
    $verMasBtn.style.display = "block";
    if (offsetSearch === 0) {
        document.querySelector(".search__result").classList.remove("hide");
        window.scrollTo({ top: 650, behavior: "smooth" });
    }
    console.log(arr);
    $resultGallery.innerHTML = "";
    console.log(arr);
    if (arr.length < 12) {
        $verMasBtn.style.display = "none";
    }
    if (arr.length === 0) {
        $resultGallery.innerHTML = `
        <div class ="error-container">
        <img class="error-img"  src="assets/icon-busqueda-sin-resultado.svg" alt="Sin resultados de busqueda" >
        <h4 class="error-text">Intenta con otra búsqueda.</h4>
        </div> `;
    } else {
        for (let i = 0; i < arr.length; i++) {
            const div = document.createElement("div");
            div.classList.add("result_container");
            div.innerHTML = `<img class="gif_result" onclick="showMax('${false}','${
                arr[i].images.original.url
            }','${arr[i].username}','${arr[i].title}')" src="${
                arr[i].images.original.url
            }" alt="${arr[i].title}"></img>
                             <div class="gif_hover hide">
                                <div class="gif_icons">
                                    <div class="icon iconFav" onclick="addFav('${
                                        arr[i].images.original.url
                                    }','${arr[i].username}','${
                arr[i].title
            }')"></div>
                                    <div class="icon iconDownload" onclick="downloadGif('${
                                        arr[i].images.original.url
                                    }','${arr[i].title}')" ></div>
                                    <div class="icon iconBig" onclick="showMax('${false}','${
                arr[i].images.original.url
            }','${arr[i].username}','${arr[i].title}')"></div>
                                               
                                </div>
                                <div class="gif_details">
                                    <p class="gif_user">${arr[i].username}</p>
                                    <h5 class="gif_title">${
                                        arr[i].title
                                    }</h5>                          
                                </div>
                             </div>`;
            $resultGallery.appendChild(div);
            offsetSearch += 1;
        }
        // addHovers();
    }
};

//funcion que muestra mas o menos gifs cuando se presiona el boton ver mas/menos
const verMas = (e) => {
    e.preventDefault();

    search(searchWord, offsetSearch);
};

//funcion para ocultar recomendaciones de barra de busqueda
const hideRecomended = () => {
    $searchUlRecomend.classList.add("hide");
    $searchInput.classList.remove("searching");

    $searchInput.value = "";
    if (localStorage.getItem("mode") === "dark") {
        $searchIcon.src = "assets/icon-search-mod-noc.svg";
    } else {
        $searchIcon.src = "assets/icon-search.svg";
    }
};

const addHovers = () => {
    const $gifHover = document.querySelectorAll(".gif_hover");
    const $gifResult = document.querySelectorAll(".gif_result");
    for (let i = 0; i < $gifResult.length; i++) {
        $gifResult[i].addEventListener("mouseover", () =>
            $gifHover[i].classList.remove("hide")
        );
        $gifResult[i].addEventListener("mouseout", () =>
            $gifHover[i].classList.remove("hide")
        );
    }
};

//! SEARCH LISTENERS

//listener que borra busqueda cuando se presiona la cruz
$searchIcon.addEventListener("click", hideRecomended);
//listener para realizar busqueda cuando se presiona enter
$searchInput.addEventListener("keypress", (e) => {
    if (e.charCode === 13) {
        searchWord = "";
        offsetSearch = 0;
        search($searchInput.value, offsetSearch);

        hideRecomended();
    }
});
$headerSearchInput.addEventListener("keypress", (e) => {
    if (e.charCode === 13) {
        searchWord = "";
        offsetSearch = 0;
        search($headerSearchInput.value, offsetSearch);

        hideRecomended();
    }
});
$headerSearchIcon.addEventListener("click", () => {
    search($headerSearchInput.value, offsetSearch);
});
//listeners que muestran resultados recomendados cada vez qeu se presiona una tecla en la barra de busqueda
// $searchInput.addEventListener("focus", () =>
//   autocompleteSearch($searchInput.value)
// );
$searchInput.addEventListener("input", () =>
    autocompleteSearch($searchInput.value)
);
//listener que muestra mas o menos gifs en la galeria
$verMasBtn.addEventListener("click", verMas);
