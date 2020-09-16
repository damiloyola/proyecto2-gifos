//API KEY : eDyIdYyGYjGzyjzBCvahgfJE97JU6hYJ

//SEARCH BAR
const urlSearch =
  "https://api.giphy.com/v1/gifs/search?api_key=eDyIdYyGYjGzyjzBCvahgfJE97JU6hYJ&q=";
const searchInput = document.getElementById("searchInput");

const search = async (text) => {
  const response = await fetch(urlSearch + text + "&limit=4");
  const results = await response.json();
  results.data.forEach((i) => {
    console.log(i.title);
  });
};
searchInput.addEventListener("input", () => search(searchInput.value));

//MENU BURGER
const btnBurger = document.querySelector(".menu__burguer");
const ul = document.querySelector(".menu__ul");
const burgerToggle = () => {
  if (ul.classList.contains("hide")) {
    ul.classList.remove("hide");
    btnBurger.src = "assets/close.svg";
  } else {
    ul.classList.add("hide");
    btnBurger.src = "assets/burger.svg";
  }
};

btnBurger.addEventListener("click", burgerToggle);
