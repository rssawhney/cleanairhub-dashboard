// See post: http://asmaloney.com/2015/06/code/clustering-markers-on-leaflet-maps

var map = L.map( 'map', {
    center: [0.0, 0.0],
    minZoom: 2,
    zoom: 2
});

L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: ['a','b','c']
}).addTo( map );

var myURL = jQuery( 'script[src$="leaf-demo.js"]' ).attr( 'src' ).replace( 'leaf-demo.js', '' );

var myIcon = L.icon({
    iconUrl: myURL + 'images/pin24.png',
    iconRetinaUrl: myURL + 'images/pin48.png',
    iconSize: [29, 24],
    iconAnchor: [9, 21],
    popupAnchor: [0, -14]
});

var markerClusters = L.markerClusterGroup();

for ( var i = 0; i < markers.length; ++i )
{
    var popup = markers[i].location +
        '<br/>' + markers[i].city +
        '<br/><b>Country:</b> ' + markers[i].country +
        '<br/><b>SourceName:</b> ' + markers[i].sourceName;
        // '<br/><b>Altitude:</b> ' + Math.round( markers[i].alt * 0.3048 ) + ' m' +
        // '<br/><b>Timezone:</b> ' + markers[i].tz;

    var m = L.marker( [markers[i].coordinates.latitude, markers[i].coordinates.longitude], {icon: myIcon} )
        .bindPopup( popup );

    markerClusters.addLayer( m );
}

map.addLayer( markerClusters );