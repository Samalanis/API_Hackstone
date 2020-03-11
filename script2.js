// Google API Functions and JS
// api url key 
let key = 'AIzaSyDHp5LgUc_PfgXkM0mJlVXcp_Wfik-__BE';

// function to retrieve the zipcode
function getZip() {
  $("#zipSubmit").on('click', event => {
    event.preventDefault();
    let zipCode = $('#zipEnter').val();
    console.log(`THE ZIP CODE ENTERED IS: ${zipCode}`);

    let zipCodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${key}`;
    console.log(`ZIPCODE URL: ${zipCodeUrl}`);

    if (zipCode == "") {
    alert("Zipcode field is empty.");
    } else if (zipCode.length > 5) { 
    alert("Zipcode is invalid");
   } else {
        loadJsonZip(zipCodeUrl);
        $("#map").css("display", "block");
     }
    });
  }


// function for getting the geo location data
function loadJsonZip(zipUrl) {
console.log("LOADJSONZIP is running.");
$('#map').empty();
$('#displayResults').empty();
$('#titleResults').empty();

fetch(zipUrl)
.then(response => {
  if (response.ok) {
    return response.json();
  }
  throw new Error(response.statusText);
  //possible alert input here
})
.then(responseJson => resultsJsonZip(responseJson))
  .catch(err => {
    $('#errorHandle').text(`Something went wrong: ${err.message}`);
  })
}

// function to retrieve the results for Zipcode Json file
function resultsJsonZip(responseJson) {
  console.log(responseJson);
  //getting the specific results from the JSON file.
  let latitude = responseJson.results[0].geometry.location.lat;
  let longitude = responseJson.results[0].geometry.location.lng;
  console.log(longitude);
  console.log(latitude);
  initMap(latitude, longitude);
}


// function to pass the location details to
let infowindow;
let map;
function initMap(x, y) {
console.log("initMap is running");
let longitude = x;
let latitude = y;
let service;

console.log(longitude, latitude);

  let definedLoc = new google.maps.LatLng(longitude, latitude);

  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(
      document.getElementById('map'), {center: definedLoc, zoom: 12});

  let request = {
    location: definedLoc,
    type: ['movie_theater'],
    radius: 50000,
  };

  service = new google.maps.places.PlacesService(map);
service.nearbySearch(request, callback);

}
// function to get the results from the request
  function callback(results, status) {
    console.log(results);
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (let i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}
// function to create the marker on the map
     function createMarker(place) {
        let marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(`<div>${place.name}</div><div>${place.vicinity}</div>`);
          infowindow.open(map, this);
        });
      }











function renderFunct2(){
$(getZip);
}

renderFunct2();
