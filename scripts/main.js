//API KEY : eDyIdYyGYjGzyjzBCvahgfJE97JU6hYJ

//SEARCH BAR
const urlSearch =
  "https://api.giphy.com/v1/gifs/search?api_key=eDyIdYyGYjGzyjzBCvahgfJE97JU6hYJ&q=";
const searchInput = document.getElementById("searchInput");
const ulSearch = document.querySelector(".search__recomend");
const searchIcon = document.querySelector(".search__icon");

const search = async (text) => {
  if (text === "") {
    ulSearch.classList.add("hide");
    searchInput.classList.remove("searching");
    searchIcon.src = "assets/icon-search.svg";
  } else {
    ulSearch.classList.remove("hide");
    ulSearch.innerHTML = "";
    searchInput.classList.add("searching");
    searchIcon.src = "assets/close.svg";
  }

  const response = await fetch(urlSearch + text + "&limit=4");
  const results = await response.json();
  results.data.forEach((i) => {
    const li = document.createElement("li");
    li.classList.add("recomend__result");
    li.innerHTML = i.title;
    ulSearch.appendChild(li);
  });
};
searchIcon.addEventListener("click", () => {
  searchInput.value = "";
  searchIcon.src = "assets/icon-search.svg";
});
searchInput.addEventListener("focusout", () => {
  ulSearch.classList.add("hide");
  searchInput.classList.remove("searching");
});
searchInput.addEventListener("focus", () => search(searchInput.value));
searchInput.addEventListener("input", () => search(searchInput.value));

//MENU BURGER
const btnBurger = document.querySelector(".menu__burguer");
const ulMenu = document.querySelector(".menu__ul");
const burgerToggle = () => {
  if (ulMenu.classList.contains("hide")) {
    ulMenu.classList.remove("hide");
    btnBurger.src = "assets/close.svg";
  } else {
    ulMenu.classList.add("hide");
    btnBurger.src = "assets/burger.svg";
  }
};

btnBurger.addEventListener("click", burgerToggle);
