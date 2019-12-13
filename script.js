
// a function to get the value from when the user submits
function pullValue(){
$('#submitbox').on('click', event => {
  event.preventDefault();
let genValue = $('#selectList').val();
console.log(` id: ${genValue} `);
queryPull(genValue);
 })
} 

// a function to que the string to call 
function queryPull(a) {
  console.log(a);
  console.log('queryPull is running');
    let urlGenre = `https://api.themoviedb.org/3/discover/movie?api_key=b51c1e917ec47e74e150682c58822b2b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${a}`;
  //console.log(urlGenre);
  loadJson(urlGenre);
}

// a function to make the call using fetch and submitting the key
// consolidated function to perform random method to pull a random movie
function loadJson(url){
  console.log('loadJson is running');

let arr = [];

while(arr.length < 3){
    var r = Math.floor(Math.random() * 20);
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
  $('#displayResults').removeClass('hidden').empty().css({"margin-top": "200px"});
  $('#heading-2').removeClass('hiddenClass');
  $('#displayResults').prepend(`
  <ul id="listUL">
  <li><h3>${responseJson.results[randomArr[0]].title}</h3></br>
  <div class="image-results"><img src="https://image.tmdb.org/t/p/w500/${responseJson.results[randomArr[0]].poster_path}"></div><p>${responseJson.results[randomArr[0]].overview}</li>

  <li><h3>${responseJson.results[randomArr[1]].title}</h3></br>
  <div class="image-results"><img src="https://image.tmdb.org/t/p/w500/${responseJson.results[randomArr[1]].poster_path}"></div><p>${responseJson.results[randomArr[1]].overview}</li>

  <li><h3>${responseJson.results[randomArr[2]].title}</h3></br>
  <div class="image-results"><img src="https://image.tmdb.org/t/p/w500/${responseJson.results[randomArr[2]].poster_path}"></div><p>${responseJson.results[randomArr[2]].overview}</li>`);


  

// testing();
}


/*function testing() {
  $('#submitbox').on('click', event => {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $("#listUL").offset().top
    }, 2000);
  })
  console.log('test is running');
}*/
/* HTML <input type="submit" value="test" id="test">*/


// a function to render functions 
function renderFunctions() {
pullValue();
}
renderFunctions();


