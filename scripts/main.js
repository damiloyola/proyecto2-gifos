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
    li.innerHTML = `<button onclick="search('${i.title}')">${i.title}</button>`;
    ulSearch.appendChild(li);
  });
};

searchIcon.addEventListener("click", () => {
  searchInput.value = "";
  searchIcon.src = "assets/icon-search.svg";
});
searchInput.addEventListener("keypress", (e) => {
  if (e.charCode === 13) {
    search(searchInput.value);
    ulSearch.classList.add("hide");
    searchInput.classList.remove("searching");
    searchInput.value = "";
    searchIcon.src = "assets/icon-search.svg";
  }
});

searchInput.addEventListener("focus", () => searchBar(searchInput.value));
searchInput.addEventListener("input", () => searchBar(searchInput.value));

//SEARCH RESULT

const search = async (word) => {
  document.querySelector(".search__result").classList.remove("hide");
  ulSearch.classList.add("hide");
  searchInput.classList.remove("searching");
  window.scrollTo({ top: 750, behavior: "smooth" });
  const container = document.querySelector(".result__gallery");
  container.innerHTML = "";
  const res = await fetch(urlSearch + word + "&limit=18");
  const data = await res.json();
  title = document.querySelector(".result__title");
  title.innerHTML = word;

  for (let i = 0; i < 18; i++) {
    if (i < 12) {
      const div = document.createElement("div");
      const img = document.createElement("img");
      img.src = data.data[i].images.original.url;
      div.appendChild(img);
      container.appendChild(div);
    } else {
      const div = document.createElement("div");
      const img = document.createElement("img");
      img.src = data.data[i].images.original.url;
      div.classList.add("hide");
      div.appendChild(img);
      container.appendChild(div);
    }
  }
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

//STICKY HEADER

window.onscroll = function () {
  headerScroll();
};

const headerScroll = () => {
  let header = document.getElementById("header");
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    header.style.padding = "1.5% 6%";
    header.style.boxShadow = "0 2px 4px 1px rgba(156,175,195,0.55)";
  } else {
    header.style.padding = "2% 10%";
    header.style.boxShadow = "none";
  }
};
