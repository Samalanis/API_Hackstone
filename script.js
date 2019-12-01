// api key and base url
const baseUrl = "https://api.themoviedb.org/3/discover/movie?api_key";
const apiKey = "b51c1e917ec47e74e150682c58822b2b";

//https://api.themoviedb.org/3/discover/movie?api_key=b51c1e917ec47e74e150682c58822b2b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=35

// a function to get the value from when the user submits
function pullValue(){
$('#submitbox').on('click', event => {
  event.preventDefault();
let genValue = $('#genreList').val();
console.log(` id: ${genValue} `);
$(queryPull(genValue));
 })
} 

// a function to que the string to call 
function queryPull(genValue) {
  let urlGenre = `https://api.themoviedb.org/3/discover/movie?api_key=b51c1e917ec47e74e150682c58822b2b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genValue}`;
  //console.log(urlGenre);
  $(loadJson(urlGenre));
}

// a function to make the call using fetch and submitting the key
function loadJson(urlGenre){
  console.log('loadJson running');
  fetch(urlGenre)
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
  for (let i = 0; i < responseJson.results.length; ++i) {

  $('#displayResults').removeClass('hidden').empty().append('<button type="button" value="next-page" id="next-button">next page</button>')
  $('#displayResults').prepend(`<h3>${responseJson.results[i].title}</h3></br><p>${responseJson.results[i].overview}`);
  }
}




// a function to render functions 
function renderFunctions() {
$(pullValue)
}
$(renderFunctions);
