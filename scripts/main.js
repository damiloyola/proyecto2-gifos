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

const displayTrendGifs = async (limit, offset) => {
    const $trendGifs = document.querySelector(".trend__imgs");
    $trendGifs.innerHTML = "";
    const arr = await trending(
        trendingGifURL + "&limit=" + limit + "&offset=" + offset
    );
    console.log(arr.data[0].images.original.url);
    arr.data.forEach((i) => {
        const div = document.createElement("div");
        div.classList.add("result_container");
        div.innerHTML = `<img class="gif_result" src="${i.images.original.url}" alt="${i.title}"></img>
                       <div class="gif_hover hide">
                          <div class="gif_icons">
                              <div class="icon iconFav"></div>
                              <div class="icon iconDownload"></div>
                              <div class="icon iconBig"  onclick="showMax('${i.images.original.url}','${i.username}','${i.title}')"></div>
                                         
                          </div>
                          <div class="gif_details">
                              <p class="gif_user">${i.username}</p>
                              <h5 class="gif_title">${i.title}</h5>                          
                          </div>
                       </div>`;

        $trendGifs.appendChild(div);

        const $gifHover = document.querySelector(".gif_hover");
        div.addEventListener("mouseenter", (e) => {
            $gifHover.classList.remove("hide");
        });
        div.addEventListener("mouseout", (e) => {
            $gifHover.classList.add("hide");
        });
    });
};

displayTrendGifs(3, 0);
offsetTrend = 0;
const rightArrowTrend = () => {
    offsetTrend += 1;
    displayTrendGifs(3, offsetTrend);
};

const leftArrowTrend = () => {
    if (offsetTrend > 0) {
        offsetTrend -= 1;
        displayTrendGifs(3, offsetTrend);
    }
};
