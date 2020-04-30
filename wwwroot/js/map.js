// This example requires the Visualization library. Include the libraries=visualization
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization">

var map, heatmap;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: { lat: 52.37, lng: 9.72 },
        mapTypeId: 'roadmap'
    });

    heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(),
        map: map
    });

    var geocoder = new google.maps.Geocoder;

    google.maps.event.addListener(map, 'click', function (event) {
        var latitude = event.latLng.lat();
        var longitude = event.latLng.lng();
        var ll = latitude + ', ' + longitude;
        getPlace(geocoder, map, ll);
    });

    //draw markers for the languages
    for (var i = 0; i < langList.length; i++) {
        drawMarker(langList[i]);
    }
}
function drawMarker(language) {
    var marker = new google.maps.Marker({
        position: { lat: language.lat, lng: language.lng },
        map: map,
        title: language.Name
    });

    var infowindow = new google.maps.InfoWindow({
        content: language.Name
    });
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });

    marker.setMap(map);
}


function getPlace(geocoder, map, str) {
    var coord = str.split(', ', 2);
    var latlng = { lat: parseFloat(coord[0]), lng: parseFloat(coord[1]) };
    geocoder.geocode({ 'location': latlng }, function (results, status) {
        if (status === 'OK') {
            if (results[0]) {
                for (let i = 0; i < results.length; i++) {
                    var adr = results[i].address_components;
                    if (adr[0]) {
                        for (let j = 0; j < adr.length; j++) {
                            var types = adr[j].types;
                            if (types[0] == 'administrative_area_level_2') {
                                //console.log(adr[i].long_name);
                                document.getElementById("latlong").innerHTML = adr[j].long_name;
                                return;
                            }
                        }
                    }
                }
                //console.log(results[0].address_components);
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });


}

function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
    var gradient = [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
    ]
    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
    heatmap.set('radius', heatmap.get('radius') ? null : 20);
}

function changeOpacity() {
    heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}

// Heatmap data: 500 Points
//center: { lat: 15.2000, lng: -86.2419 },
function getPoints() {
    return [
        new google.maps.LatLng(52.37, 9.72), //old saxon
        new google.maps.LatLng(53.35, 6.80), //old frisian
        new google.maps.LatLng(51.06, -1.31), //old english
        new google.maps.LatLng(48.65, 12.47), //german
        new google.maps.LatLng(53.22, -7.62), //irish
        new google.maps.LatLng(41.90, 12.45) //latin
    ];
}