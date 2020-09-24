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

//! FUNCIONES SEARCH

//funcion principal que busca la palabra que se pasa por parametro y muestra en galeria
const search = async (word) => {
  hideRecomended();
  window.scrollTo({ top: 750, behavior: "smooth" });
  result__title.innerHTML = word;

  //se hace fetch con busqueda del parametro
  const res = await fetch(urlSearch + word + "&limit=18");
  const data = await res.json();
  populateGallery(data);
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
    li.innerHTML = `<button onclick="search('${i.title}')">${i.title}</button>`;
    ulSearch.appendChild(li);
  });
};

//funcion que va colocando los gifs del array pasado por parametro dentro de la galeria
const populateGallery = (arr) => {
  document.querySelector(".search__result").classList.remove("hide");
  result__gallery.innerHTML = "";
  vermas.innerHTML = "Ver Mas";
  for (let i = 0; i < 18; i++) {
    if (i < 12) {
      const div = document.createElement("div");
      const img = document.createElement("img");
      img.src = arr.data[i].images.original.url;
      div.appendChild(img);
      result__gallery.appendChild(div);
    } else {
      const div = document.createElement("div");
      const img = document.createElement("img");
      img.src = arr.data[i].images.original.url;
      div.classList.add("hide");
      div.classList.add("hiddenDiv");
      div.appendChild(img);
      result__gallery.appendChild(div);
    }
  }
};

//funcion que muestra mas o menos gifs cuando se presiona el boton ver mas/menos
const vermasBtn = (e) => {
  e.preventDefault();
  const hiddenDivs = document.querySelectorAll(".result__gallery .hiddenDiv");

  if (vermas.innerHTML === "Ver Mas") {
    hiddenDivs.forEach((i) => i.classList.remove("hide"));
    vermas.innerHTML = "Ver Menos";
  } else {
    console.log(hiddenDivs);
    hiddenDivs.forEach((i) => i.classList.add("hide"));
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
    search(searchInput.value);
    hideRecomended();
  }
});
headerSearchInput.addEventListener("keypress", (e) => {
  if (e.charCode === 13) {
    search(headerSearchInput.value);
    hideRecomended();
  }
});
headerSearchIcon.addEventListener("click", () =>
  search(headerSearchInput.value)
);
//listeners que muestran resultados recomendados cada vez qeu se presiona una tecla en la barra de busqueda
searchInput.addEventListener("focus", () =>
  autocompleteSearch(searchInput.value)
);
searchInput.addEventListener("input", () =>
  autocompleteSearch(searchInput.value)
);
//listener que muestra mas o menos gifs en la galeria
vermas.addEventListener("click", vermasBtn);
