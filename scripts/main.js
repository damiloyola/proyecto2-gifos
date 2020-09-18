//API KEY : eDyIdYyGYjGzyjzBCvahgfJE97JU6hYJ

//SEARCH BAR
const urlSearch =
  "https://api.giphy.com/v1/gifs/search?api_key=eDyIdYyGYjGzyjzBCvahgfJE97JU6hYJ&q=";
const searchInput = document.getElementById("searchInput");
const ulSearch = document.querySelector(".search__recomend");
const searchIcon = document.querySelector(".search__icon");

const searchBar = async (text) => {
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
    li.innerHTML = `<a href=#>${i.title}</a>`;
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
searchInput.addEventListener("focus", () => searchBar(searchInput.value));
searchInput.addEventListener("input", () => searchBar(searchInput.value));

//SEARCH RESULT

const search = async (word) => {
  const res = await fetch(urlSearch + word + "&limit=12");
  const data = await res.json();
  console.log(data);
};

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
