const API_KEY = "18008405-01ed22c9e7a9c9ba46144ec1d";
const gallery = document.querySelector(".pixa-gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const loadMore = document.querySelector(".load-more");

let searchImageValue;
let fetchLink;
let currentSearch;
let page = 1;

searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchImageValue;
  searchImages(searchImageValue);
});
loadMore.addEventListener("click", loadMoreImages);

function updateInput(e) {
  searchImageValue = e.target.value;
}

async function fetchApi(url) {
  const dataFetch = await fetch(url);
  const data = await dataFetch.json();
  return data;
}

function generateImages(data) {
  data.hits.forEach((hit) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
        <div class="gallery-info">
        <p>${hit.user}</p>
        <a href=${hit.largeImageURL}>Download</a>
        </div>
        <img src=${hit.webformatURL} />`;
    gallery.appendChild(galleryImg);
  });
}

async function fetchImages() {
  fetchLink = `https://pixabay.com/api/?key=${API_KEY}&per_page=10&page=1`;
  const data = await fetchApi(fetchLink);
  generateImages(data);
}

async function searchImages(query) {
  clear();
  fetchLink = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&per_page=10`;
  const data = await fetchApi(fetchLink);
  generateImages(data);
}

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

async function loadMoreImages() {
  page++;

  if (currentSearch) {
    fetchLink = `https://pixabay.com/api/?key=${API_KEY}&q=${currentSearch}&per_page=5&image_type=photo&page=${page}`;
  } else {
    fetchLink = `https://pixabay.com/api/?key=${API_KEY}&per_page=5&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generateImages(data);
}

fetchImages();
