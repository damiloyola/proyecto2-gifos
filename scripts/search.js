const urlSearch =
    "https://api.giphy.com/v1/gifs/search?api_key=eDyIdYyGYjGzyjzBCvahgfJE97JU6hYJ&q=";

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
        urlSearch + word + "&limit=12" + "&offset=" + offset
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
        $searchIcon.src = "assets/close.svg";
    }
    //se realiza el fetch y se guardan los datos en array results
    const response = await fetch(urlSearch + text + "&limit=4");
    const results = await response.json();

    //se recorre el array y se van mostrando los resultados como recomendados
    results.data.forEach((i) => {
        const li = document.createElement("li");
        li.classList.add("recomend__result");
        li.innerHTML = `<button onclick="search('${i.title}', ${offsetSearch})">${i.title}</button>`;
        $searchUlRecomend.appendChild(li);
    });
};

//funcion que va colocando los gifs del array pasado por parametro dentro de la galeria
const populateGallery = (arr) => {
    $verMasBtn.style.display = "block";
    if (offsetSearch === 0) {
        document.querySelector(".search__result").classList.remove("hide");
        window.scrollTo({ top: 600, behavior: "smooth" });
    }

    $resultGallery.innerHTML = "";
    console.log(arr);
    if (arr.length < 12) {
        $verMasBtn.style.display = "none";
    }
    if (arr.length === 0) {
        $resultGallery.innerHTML = `
        <div class ="search_error-container">
        <img class="search_error-img"  src="assets/icon-busqueda-sin-resultado.svg" alt="Sin resultados de busqueda" >
        <h4 class="search_error-text">Intenta con otra búsqueda.</h4>
        </div> `;
    } else {
        for (let i = 0; i < arr.length; i++) {
            const div = document.createElement("div");

            div.innerHTML = `<img class="gif_result" src="${arr[i].images.original.url}" alt="${arr[i].title}"></img>
                             <div class="gif_hover">
                                <div class="gif_icons">
                                    <img class="fav_icon" src="/assets/icon-fav.svg" alt="" srcset="">
                                    <img class="download_icon" src="/assets/icon-download.svg" alt="">
                                    <img class="big_icon" src="/assets/icon-max-normal.svg" alt="">               
                                </div>
                                <div class="gif_details">
                                    <p class="gif_user">${arr[i].username}</p>
                                    <h4 class="gif_title">${arr[i].title}</h4>                          
                                </div>
                             </div>`;
            $resultGallery.appendChild(div);
            offsetSearch += 1;
        }
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
    $searchIcon.src = "assets/icon-search.svg";
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
