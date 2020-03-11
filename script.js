// API KEY
const apikey = 'b51c1e917ec47e74e150682c58822b2b';

// a function to get the value from when the user submits
function pullValue(){
$('#submitbox').on('click', event => {
  event.preventDefault();
let genValue = $('#selectList').val();
console.log(` id: ${genValue} `);

// possibly a page incremenet for more results. 
queryPull(genValue);
 })
} 

// a function to que the string to call 
function queryPull(a) {
  console.log(a);
  console.log('queryPull is running');
    let urlGenre = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${a}`;
  //console.log(urlGenre);
  loadJson(urlGenre);
}

// a function to make the call using fetch and submitting the key
// consolidated function to perform random method to pull a random movie
function loadJson(url){
  console.log('loadJson is running');
  $('#map').toggle();
 
$('#displayResults').removeClass('resultsHide');
let arr = [];




while(arr.length < 3){
    let r = Math.floor(Math.random() * 20);
    if(arr.indexOf(r) === -1) arr.push(r);
}
 console.log(arr);

  fetch(url)
  .then(response => {
    if(response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => resultsJson(responseJson, arr))
  .catch(err => {
    $('#errorHandle').text(`Something went wrong: ${err.message}`);
  });
}


// a function to display the results 
function resultsJson(responseJson, randomArr) {
  console.log(responseJson.results.length);
$('#map').empty();
$('#displayResults').empty();
$('#titleResults').empty();
  $('#displayResults').removeClass('hidden').empty().css({"margin-top": "500px"});

  $('#displayResults').prepend(`

  <ul id="listUL">

  <div class="container 1">
  <li>
  <div class="image-results"><img src="https://image.tmdb.org/t/p/w500/${responseJson.results[randomArr[0]].poster_path}"></div><h3 id="h3One">${responseJson.results[randomArr[0]].title}</h3></br><p>${responseJson.results[randomArr[0]].overview}</li></div>

  <div class="container 2">
  <li>
  <div class="image-results"><img src="https://image.tmdb.org/t/p/w500/${responseJson.results[randomArr[1]].poster_path}"></div>
  <h3 id="h3Two">${responseJson.results[randomArr[1]].title}</h3></br><p>${responseJson.results[randomArr[1]].overview}</li></div>


  <div class="container 3">
  <li>
  <div class="image-results"><img src="https://image.tmdb.org/t/p/w500/${responseJson.results[randomArr[2]].poster_path}"></div><h3 id="h3Three">${responseJson.results[randomArr[2]].title}</h3></br><p>${responseJson.results[randomArr[2]].overview}</li></div></ul>`);

  //$('#heading-1').append(`<a href="#listUL"> <i class="fa fa-arrow-circle-down" id="arrow" style="font-size:55px;color:pink"></i></a>`);

  //arrowDown();

}


// function for making the arrow scroll down
function arrowDown() {
  $('#arrow').on('click', event => {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $("#listUL").offset().top
    }, 2000);
  })
  console.log('test is running');
}



// function for handling the value input - movie search
function searchMovieVal(){
  $('#searchMovieButton').on('click', event => {
    event.preventDefault();
    let searchQuery = $('#searchInput').val();
    console.log(searchQuery);
    movieJsonSearch(searchQuery);
  })
}

$(searchMovieVal);

// function to handle the call to the API for the movie search
function movieJsonSearch(query){
  let queryUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en-US&query=${query}&page=1&include_adult=false`; 
  console.log(queryUrl);

  fetch(queryUrl)
  .then(response => {
    if(response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => searchResults(responseJson))
  .catch(err => {
    $('#errorHandle').text(`Something went wrong: ${err.message}`);
  });
}

// need help with this one
// function for handling the json from the search 
function searchResults(jsonResults) {
console.log(jsonResults);
$('#map').empty();
$('#displayResults').empty();
$('#titleResults').empty();
$('#titleResults').css({"margin-top": "200px"});

  $('#titleResults').prepend(`

  <div class="container 1">
  <div class="image-results"><img src="https://image.tmdb.org/t/p/w500/${jsonResults.results[0].backdrop_path}"></div><h3>${jsonResults.results[0].title}</h3></br><p>${jsonResults.results[0].overview}</div>
  
  <div class="container 2">
    <div class="image-results"><img src="https://image.tmdb.org/t/p/w500/${jsonResults.results[1].backdrop_path}"></div><h3>${jsonResults.results[1].title}</h3></br><p>${jsonResults.results[1].overview}</div>


  <div class="container 3">
  <div class="image-results"><img src="https://image.tmdb.org/t/p/w500/${jsonResults.results[2].backdrop_path}"></div><h3>${jsonResults.results[2].title}</h3></br><p>${jsonResults.results[2].overview}</div>`);
  

};

// function for burger menu showing and hiding
function burgerMenu() {
 $('#hamburgerIcon').on('hover', event => {
   $('#hot-links').toggle();
 })
  
}



function renderFunc() {
  pullValue();
  burgerMenu();
}
$(renderFunc);


