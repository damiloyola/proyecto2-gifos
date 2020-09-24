//! MENU BURGER
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

//! STICKY HEADER

window.onscroll = function () {
  headerScroll();
};

const headerScroll = () => {
  let header = document.getElementById("header");
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    header.style.padding = "1.5% 6%";
    header.style.boxShadow = "0 2px 4px 1px rgba(156,175,195,0.55)";
    if (window.innerWidth > 1080) {
      document.querySelector(".header__search").classList.remove("hide");
    } else {
      document.querySelector(".header__search").classList.add("hide");
    }
  } else {
    header.style.padding = "2% 10%";
    header.style.boxShadow = "none";
    document.querySelector(".header__search").classList.add("hide");
  }
};

//! TRENDING

const trending = async () => {
  url =
    "https://api.giphy.com/v1/gifs/trending?api_key=eDyIdYyGYjGzyjzBCvahgfJE97JU6hYJ";

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
};

const displayTrend = async () => {
  const arr = await trending();
  console.log(arr);
  const trends = document.querySelectorAll(".trends");

  for (let i = 0; i < trends.length; i++) {
    trends[i].innerHTML = arr.data[i].username + ", ";
    trends[i].setAttribute("onclick", "search('" + arr.data[i].username + "')");
  }
};

displayTrend();
