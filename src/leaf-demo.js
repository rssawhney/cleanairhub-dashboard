'use strict';
var map = L.map( 'map', {
    center: [0.0, 0.0],
    minZoom: 2,
    zoom: 2
});

L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
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

fetch('https://api.openaq.org/v1/locations?limit=10000&has_geo=true')
    .then(function(response) {
        return response.json()
    }).then(function(json) {
    console.log('parsed json', json)
    var responseJson = json;
    for ( var i = 0; i < responseJson.results.length; ++i )
    {
        var popup = responseJson.results[i].location +
            '<br/><b>City:</b>' + responseJson.results[i].city +
            '<br/><b>Country:</b> ' + responseJson.results[i].country +
            '<br/><b>Source Name:</b> ' + responseJson.results[i].sourceName +
            '<br/><b>Count:</b> ' + responseJson.results[i].count +
            '<br/><b>Last Updated:</b> ' + responseJson.results[i].lastUpdated +
            '<br/><b>First Updated:</b> ' + responseJson.results[i].firstUpdated;

        var m = L.marker( [responseJson.results[i].coordinates.latitude, responseJson.results[i].coordinates.longitude], {icon: myIcon} )
            .bindPopup( popup );

        markerClusters.addLayer( m );
    }
}).catch(function(ex) {
    console.log('parsing failed', ex)
})


map.addLayer( markerClusters );