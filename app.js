"use strict";

// Scroll Event
window.addEventListener("scroll", () => {
  const category = document.querySelector(".category");
  const scrollY = window.scrollY;
  if (scrollY >= 100) {
    category.classList.add("scroll");
  } else {
    category.classList.remove("scroll");
  }
});

function makeCard(imgPath, city, date) {
  const cityName = city ? city.slice(0, 13) : "서울 한국";

  return `
  <button class="card_heart">
    <i class="fa-regular fa-heart"></i>
  </button>
  <div class="card_img">
    <img src=${imgPath} alt="card_image" loading="lazy"/>
    <div class="card_dots">
      <span class="card_dot_circle circle_select"></span>
      <span class="card_dot_circle"></span>
      <span class="card_dot_circle"></span>
      <span class="card_dot_circle"></span>
      <span class="card_dot_circle"></span>
    </div>
  </div>
  <div class="card_content">
    <h3 class="card_title">${cityName}</h3>
    <div class="card_star"><i class="fa-solid fa-star"></i> 4.5</div>
    <p class="card_desc">
      125Km 거리<br />
      ${date}<br />
    </p>
    <p class="card_amount"><strong>₩181,714</strong>/ 박</p>
  </div>
        `;
}

function printCardList(data) {
  const cardBox = document.querySelector(".card-container");

  data.forEach((item) => {
    const city = item.location.name;
    const imgPath = item.urls.small;
    const date = item.created_at.split("T")[0].replace(/-/g, "/");
    const li = document.createElement("li");
    li.classList.add("card");
    li.innerHTML = makeCard(imgPath, city, date);
    cardBox.appendChild(li);
  });
}

// Get images - unsplash API
const getImgData = async () => {
  let data;
  const accessKey = "6IrhqT0gfrZKjzbQcomAW-hOUciJchXSXsThXZLkeCw";
  const page = "30";

  const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${page}`;
  await fetch(apiUrl)
    .then((res) => res.json())
    .then((json) => (data = json))
    .catch((error) => console.log(error));

  printCardList(data);
};

getImgData();
