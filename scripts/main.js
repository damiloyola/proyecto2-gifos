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
