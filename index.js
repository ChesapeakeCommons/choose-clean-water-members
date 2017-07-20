mapboxgl.accessToken = 'pk.eyJ1IjoicmRhd2VzMSIsImEiOiJ0OHNqNUFFIn0.KpaFJHMqmruQ9UFeg2ATeA'; // replace this with your access token


var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/rdawes1/cj52rvywt1l9u2rr74fw6hioc'// replace this with your style
   
});

map.on('click', function(e) {
    var features = map.queryRenderedFeatures(e.point, {
        layers: ['nrnn-members', 'regional-members', 'national-members', 'state-2h2qq0'] // replace this with the name of the layer
    });

    if (!features.length) {
        return;
    }

    var feature = features[0];

    var url = (feature.properties.website) ? feature.properties.website : "#",
        target = (url === "#") ? "_self" : "_blank";

    var popup = new mapboxgl.Popup({
            offset: [0, -15]
        })
        .setLngLat(feature.geometry.coordinates)
        .setHTML('<a class=\"popup-link\" href=\"' + url + '\" target=\"' + target + '\"><strong>' + feature.properties.organization + '</strong></a><p>' + feature.properties.region + '</p>' + 
            '</strong></a>' + '<strong>' + 'Members:  ' + '</strong>' + feature.properties.members)
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);
});



map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
}));

map.scrollZoom.disable();

map.addControl(new mapboxgl.NavigationControl());

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
    zoom: 6.1
});

flyHandler('ny', {
center: [-76.351, 42.384],
zoom: 8.1
});

flyHandler('pa', {
center: [-77.206, 41.022],
zoom: 7.5
});

flyHandler('md', {
center: [-77.401, 39.018],
zoom: 7.7
});

flyHandler('de', {
center: [-75.258, 38.938],
zoom: 8.7
});

flyHandler('dc', {
center: [-77.071, 38.886],
zoom: 10.5
});

flyHandler('va', {
center: [-78.086, 37.784],
zoom: 7.8
});

flyHandler('wv', {
center: [-79.816, 38.788],
zoom: 7.6
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


