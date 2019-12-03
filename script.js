// api key and base url
//const baseUrl = "https://api.themoviedb.org/3/discover/movie?api_key";
//const apiKey = "b51c1e917ec47e74e150682c58822b2b";
//https://image.tmdb.org/t/p/w500/r5WnfZPYAVhBA9FuZGn6THWaGHD.jpg
//https://api.themoviedb.org/3/discover/movie?api_key=b51c1e917ec47e74e150682c58822b2b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=35

// a function to get the value from when the user submits
let pageCount = 1;

function pullValue(count){
$('#submitbox').on('click', event => {
  event.preventDefault();
let genValue = $('#genreList').val();
console.log(` id: ${genValue} `);
queryPull(genValue, pageCount);
 })
} 

// a function to que the string to call 
function queryPull(a, b) {
  console.log(b);
  console.log('queryPull is running');
    let urlGenre = `https://api.themoviedb.org/3/discover/movie?api_key=b51c1e917ec47e74e150682c58822b2b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${b}&with_genres=${a}`;
  //console.log(urlGenre);
  loadJson(urlGenre);
}

// a function to make the call using fetch and submitting the key
function loadJson(url){
  console.log('loadJson is running');
  fetch(url)
  .then(response => {
    if(response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => resultsJson(responseJson))
  .catch(err => {
    $('#errorHandle').text(`Something went wrong: ${err.message}`);
  });
}

// a function to display the results 
function resultsJson(responseJson) {
  console.log(responseJson);
  $('#displayResults').removeClass('hidden').empty()
  $('#displayResults').append('<button type="button" value="next-page" id="next-button">next page</button>')
  nextPagePull();
  for (let i = 0; i < responseJson.results.length; ++i) {
  $('#displayResults').prepend(`<h3>${responseJson.results[i].title}</h3></br>
  <img src="https://image.tmdb.org/t/p/w500/${responseJson.results[i].poster_path}"><p>${responseJson.results[i].overview}`);
  }
}


// function for handling the next page pulls 
function nextPagePull() {
  $('#next-button').on('click', event => {
    pageCount ++;
    console.log(pageCount);
    console.log('nextPagePull runs');
    queryPull(pageCount);
  });
}



// a function to render functions 
function renderFunctions() {
pullValue();
nextPagePull();
}
renderFunctions();
