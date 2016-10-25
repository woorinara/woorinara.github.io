var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,

	scrollwheel: false,
    center: {lat: 37.4775778, lng: 127.12499830000002}
});

 var marker = new google.maps.Marker({
    map: map,
    icon: "images/map-marker.png",
    // Define the place with a location, and a query string.
    place: {
      location: {lat: 37.4775778, lng: 127.12499830000002},
      query: 'Google, Sydney, Australia'

    },
    // Attributions help users find your site again.
    attribution: {
      source: 'Google Maps JavaScript API',
      webUrl: 'https://developers.google.com/maps/'
    }
});

// Construct a new InfoWindow.
var infoWindow = new google.maps.InfoWindow({
    content: 'Artico St, New York NY 453018'
});

// Opens the InfoWindow when marker is clicked.
marker.addListener('click', function() {
    infoWindow.open(map, marker);
});
