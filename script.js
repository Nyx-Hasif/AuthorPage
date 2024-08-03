const authorContainer = document.getElementById("author-container");
const loadMoreBtn = document.getElementById("load-more-btn");

let startingIndex = 0;
let endingIndex = 8;
let authorDataArr = [];

//The Fetch API is a built-in JavaScript interface to make network requests to a server. It has a fetch() method you can use to make GET, POST, PUT, or PATCH requests.
// [1] The fetch() method sends a GET request to a URL for a JSON file with information about authors on freeCodeCamp News.
// fetch("https://cdn.freecodecamp.org/curriculum/news-author-page/authors.json");

//The fetch() method returns a Promise, which is a placeholder object that will either be fulfilled if your request is successful, or rejected if your request is unsuccessful.

// [2] The .then() method is used to handle the response from the fetch() method.
//chain .then() to the fetch() method:

fetch("https://cdn.freecodecamp.org/curriculum/news-author-page/authors.json")
  .then((res) => res.json()) //////To make the data usable, you can use the .json() method on the Response object to parse it into JSON.
  .then((data) => {
    authorDataArr = data;
    displayAuthors(authorDataArr.slice(startingIndex, endingIndex));
  })
  .catch((err) => {
    // //.catch() method is another asynchronous JavaScript method you can use to handle errors.
    authorContainer.innerHTML =
      '<p class="error-msg">There was an error loading the authors</p>';
  });

const fetchMoreAuthors = () => {
  startingIndex += 8;
  endingIndex += 8;

  displayAuthors(authorDataArr.slice(startingIndex, endingIndex));
  if (authorDataArr.length <= endingIndex) {
    loadMoreBtn.disabled = true;
    loadMoreBtn.style.cursor = "not-allowed";

    loadMoreBtn.textContent = "No more data to load";
  }
};

const displayAuthors = (authors) => {
  authors.forEach(({ author, image, url, bio }, index) => {
    authorContainer.innerHTML += `
    <div id="${index}" class="user-card">
      <h2 class="author-name">${author}</h2>
      <img class="user-img" src="${image}" alt="${author} avatar">
      <div class="purple-divider"></div>
      <p class="bio">${bio.length > 50 ? bio.slice(0, 50) + "..." : bio}</p> 
      <a class="author-link" href="${url}" target="_blank">${author} author page</a>
    </div>
  `;
  });
};

loadMoreBtn.addEventListener("click", fetchMoreAuthors);
