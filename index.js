mapboxgl.accessToken = 'pk.eyJ1IjoicmRhd2VzMSIsImEiOiJ0OHNqNUFFIn0.KpaFJHMqmruQ9UFeg2ATeA'; // replace this with your access token
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/rdawes1/cj3ynl0ou16452qpgqa9phb32' // replace this with your style
});

map.on('click', function(e) {
    var features = map.queryRenderedFeatures(e.point, {
        layers: ['ccwc-members'] // replace this with the name of the layer
    });

    if (!features.length) {
        return;
    }

    var feature = features[0];

    var url = (feature.properties.web) ? feature.properties.web : "#",
        target = (url === "#") ? "_self" : "_blank";

    var popup = new mapboxgl.Popup({
            offset: [0, -15]
        })
        .setLngLat(feature.geometry.coordinates)
        .setHTML('<a class=\"popup-link\" href=\"' + url + '\" target=\"' + target + '\"><strong>' + feature.properties.company + '</strong></a><p>' + feature.properties.locality + '</p>')
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);
});



map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
}));

function flyHandler(id, options) {
  var button = document.getElementById(id);
  if(!button) return;
  button.addEventListener('click', function() {
    map.flyTo({
      center: options.center,
      zoom: options.zoom || 5
    });
    if (options.startDay) {
      console.log('Play from day', options.startDay);
      play(options.startDay);
    }
    if (options.speed) {
      setSpeed(options.speed);
    }
  });
}

flyHandler('baystates', {
    center: [-79.072, 39.988],
    zoom: 6.0
});

flyHandler('pa', {
center: [-77.328, 40.814],
zoom: 7.9
});


function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}