//! MENU BURGER

const burgerToggle = () => {
    if ($burgerMenuUl.classList.contains("hide")) {
        $burgerMenuUl.classList.remove("hide");
        $burgerBtn.src = "assets/close.svg";
    } else {
        $burgerMenuUl.classList.add("hide");
        $burgerBtn.src = "assets/burger.svg";
    }
};

$burgerBtn.addEventListener("click", burgerToggle);

//! STICKY HEADER

window.onscroll = function () {
    headerScroll();
};

const headerScroll = () => {
    let header = document.getElementById("header");
    if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
    ) {
        header.style.padding = "1% 6%";
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

let trendingTagsURL =
    "https://api.giphy.com/v1/trending/searches?api_key=eDyIdYyGYjGzyjzBCvahgfJE97JU6hYJ";
let trendingGifURL =
    "https://api.giphy.com/v1/gifs/trending?api_key=eDyIdYyGYjGzyjzBCvahgfJE97JU6hYJ";

const trending = async (url) => {
    const response = await fetch(url);
    const data = await response.json();

    return data;
};

const displayTrendTags = async () => {
    const arr = await trending(trendingTagsURL);

    const trends = document.querySelectorAll(".trends");

    for (let i = 0; i < trends.length; i++) {
        trends[i].innerHTML = arr.data[i] + ", ";
        trends[i].setAttribute("onclick", "search('" + arr.data[i] + "', 0 )");
    }
};

displayTrendTags();
