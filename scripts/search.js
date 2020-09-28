const urlSearch =
  "https://api.giphy.com/v1/gifs/search?api_key=eDyIdYyGYjGzyjzBCvahgfJE97JU6hYJ&q=";

//! ELEMENTOS DEL DOM

const searchInput = document.getElementById("searchInput");
const headerSearchInput = document.getElementById("header_searchInput");
const ulSearch = document.querySelector(".search__recomend");
const searchIcon = document.querySelector(".search__icon");
const headerSearchIcon = document.querySelector(".header_search__icon");
const result__gallery = document.querySelector(".result__gallery");
const result__title = document.querySelector(".result__title");
const vermas = document.querySelector(".vermas");
let searchWord = "";
let offsetSearch = 0;
let searchGifos = [];

//! FUNCIONES SEARCH

//funcion principal que busca la palabra que se pasa por parametro y muestra en galeria
const search = async (word, offset) => {
  searchWord = word;
  hideRecomended();
  let limit = 6;
  result__title.innerHTML = word;
  if (offset === 0) {
    searchGifos = [];
    limit = 12;
  }
  //se hace fetch con busqueda del parametro
  const res = await fetch(
    urlSearch + word + "&limit=" + limit + "&offset=" + offset
  );
  const datos = await res.json();

  datos.data.forEach((i) => {
    let img = i.images.original.url;
    searchGifos.push(img);
  });
  populateGallery(searchGifos);
};

//funcion para obtener resultados recomendados segun texto pasado por parametro
const autocompleteSearch = async (text) => {
  //muestra o esconde estilos de recomendados
  if (text === "") {
    hideRecomended();
  } else {
    ulSearch.classList.remove("hide");
    ulSearch.innerHTML = "";
    searchInput.classList.add("searching");
    searchIcon.src = "assets/close.svg";
  }
  //se realiza el fetch y se guardan los datos en array results
  const response = await fetch(urlSearch + text + "&limit=4");
  const results = await response.json();
  //se recorre el array y se van mostrando los resultados como recomendados
  results.data.forEach((i) => {
    const li = document.createElement("li");
    li.classList.add("recomend__result");
    li.innerHTML = `<button onclick="search('${i.title}', ${offsetSearch})">${i.title}</button>`;
    ulSearch.appendChild(li);
  });
};

//funcion que va colocando los gifs del array pasado por parametro dentro de la galeria
const populateGallery = (arr) => {
  if (offsetSearch === 0) {
    document.querySelector(".search__result").classList.remove("hide");
    window.scrollTo({ top: 600, behavior: "smooth" });
  }

  result__gallery.innerHTML = "";
  console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    const div = document.createElement("div");
    const img = document.createElement("img");
    img.src = arr[i];
    div.appendChild(img);
    result__gallery.appendChild(div);
    offsetSearch += 1;
  }
};

//funcion que muestra mas o menos gifs cuando se presiona el boton ver mas/menos
const vermasBtn = (e) => {
  e.preventDefault();
  if (vermas.innerHTML === "Ver Mas") {
    search(searchWord, offsetSearch);
    if (offsetSearch > 24) {
      vermas.innerHTML = "Ver Menos";
    }
  } else {
    offsetSearch = 0;
    search(searchWord, offsetSearch);
    vermas.innerHTML = "Ver Mas";
  }
};

//funcion para ocultar recomendaciones de barra de busqueda
const hideRecomended = () => {
  ulSearch.classList.add("hide");
  searchInput.classList.remove("searching");

  searchInput.value = "";
  searchIcon.src = "assets/icon-search.svg";
};

//! SEARCH LISTENERS

//listener que borra busqueda cuando se presiona la cruz
searchIcon.addEventListener("click", hideRecomended);
//listener para realizar busqueda cuando se presiona enter
searchInput.addEventListener("keypress", (e) => {
  if (e.charCode === 13) {
    searchWord = "";
    offsetSearch = 0;
    search(searchInput.value, offsetSearch);

    hideRecomended();
  }
});
headerSearchInput.addEventListener("keypress", (e) => {
  if (e.charCode === 13) {
    searchWord = "";
    offsetSearch = 0;
    search(headerSearchInput.value, offsetSearch);

    hideRecomended();
  }
});
headerSearchIcon.addEventListener("click", () => {
  search(headerSearchInput.value, offsetSearch);
});
//listeners que muestran resultados recomendados cada vez qeu se presiona una tecla en la barra de busqueda
// searchInput.addEventListener("focus", () =>
//   autocompleteSearch(searchInput.value)
// );
searchInput.addEventListener("input", () =>
  autocompleteSearch(searchInput.value)
);
//listener que muestra mas o menos gifs en la galeria
vermas.addEventListener("click", vermasBtn);
