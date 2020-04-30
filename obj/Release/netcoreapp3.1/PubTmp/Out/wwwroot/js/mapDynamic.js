// Dependent on: site.js and index.js.

//For marker removal;
var markers = new Array();
//For info windows opening and closing together
var infoWindowsWithWords = new Array();
var allInfoWindows = new Array();

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: { lat: 52.37, lng: 9.72 },
        mapTypeId: 'roadmap'
    });

    var geocoder = new google.maps.Geocoder;

    google.maps.event.addListener(map, 'click', function (event) {
        var latitude = event.latLng.lat();
        var longitude = event.latLng.lng();
        var ll = latitude + ', ' + longitude;
        getPlace(geocoder, map, ll);
    });

    //draw markers for all the languages
    for (var i = 0; i < langList.length; i++) {
        drawMarker(langList[i], 'red', "");
    }
}

function drawMarkersForCognateList() {
    //Clear all markers and info windows
    markers = new Array();
    infoWindowsWithWords = new Array();
    allInfoWindows = new Array();
    /*
    for (var i = 0; i < markers.length; i++) {
        markers[i] = null;
    }
    for (var i = 0; i < allInfoWindows.length; i++) {
        allInfoWindows[i] = null;
    }
    */

    //draw markers for all the languages
    for (var i = 0; i < langList.length; i++) {
        drawMarker(langList[i], 'red', "");
    }

    //draw markers for the languages in cognateList
    for (var i = 0; i < cognateList.length; i++) {
        var langListItem = searchWithLangNameInLangList(cognateList[i].languageName);
        //take the first word
        var string = cognateList[i].wordsAndRemarks.trim();
        var index = string.search(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/);
        var firstWord = string.slice(0, index);
        var wordString = " : " + firstWord;
        console.log(langListItem);
        if (langListItem != null) {
            drawMarker(langListItem, 'green', wordString);
        }
    }

    //Open all info windows with words
    openCloseInfoWindows(infoWindowsWithWords, "open");
}


//Draws the marker with the given langList object listed in site.js and the specified colour
function drawMarker(langListItem, colour, wordString) {
    var marker = new google.maps.Marker({
        position: { lat: langListItem.lat, lng: langListItem.lng },
        map: map,
        title: langListItem.Name,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 5,
            strokeColor: colour
        }
    });

    var infowindow = new google.maps.InfoWindow({
        content: langListItem.Name + wordString,
        position: { lat: langListItem.lat, lng: langListItem.lng }
    });

    // push the info windows with words into the respective array then push all info windows into the all-containing array
    if (wordString != "") {
        infoWindowsWithWords.push(infowindow);
    }
    allInfoWindows.push(infowindow);

    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });

    //push the marker into the array
    markers.push(marker);

    marker.setMap(map);
}

function openInfoWindowsWithWords() {
    openCloseInfoWindows(infoWindowsWithWords, "open");
}

function closeInfoWindowsWithWords() {
    openCloseInfoWindows(infoWindowsWithWords, "close");
}

function openAllInfoWindows() {
    openCloseInfoWindows(allInfoWindows, "open");
}

function closeAllInfoWindows() {
    openCloseInfoWindows(allInfoWindows, "close");
}


function openCloseInfoWindows(array, openOrClose) {
    if (openOrClose == "open") {
        for (var i = 0; i < array.length; i++) {
            array[i].open(map);
        }
    }
    else {
        for (var i = 0; i < array.length; i++) {
            array[i].close();
        }
    }
}

//Returns the langList object that matches the given language name
function searchWithLangNameInLangList(langName) {
    for (var i = 0; i < langList.length; i++) {
        if (langName == langList[i].Name) {
            return langList[i];
        }
    }
    return null;
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