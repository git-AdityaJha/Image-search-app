const accessKey = "XxHsZjQf45e5yr8vvaGcXFSsfzi3CIk6K1qBiNsV7Ew";

const formElement = document.querySelector("form");
const inputElement = document.querySelector("#search-input");
const btnElement = document.querySelector("#search-button");
let searchResultsElement = document.querySelector(".search-results");
const showMoreElement = document.querySelector(".show-more");

let inputData = "";
let page = 1;

async function searchImages(){
  inputData = inputElement.value;

  if(inputData === ""){ // checking if search section is empty
    alert("Search section cannot be empty !");
    return;
  }

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if(page === 1){
    searchResultsElement.innerHTML = "";
  }

  results.map((result) => {
    searchResultsElement.innerHTML += `
    <div class="search-result">
      <img src="${result.urls.small}" alt="${result.alt_description}">
      <a target="_blank" href="${result.links.html}">${result.alt_description}</a>
    </div>
    `
  })

  page++;

  if(page > 1){
    showMoreElement.style.display = "block";
  }
}

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
})

showMoreElement.addEventListener("click", () => {
  searchImages();
})