var map;
var infowindow;
var currentPos;

var visited = false;
var inpuType;
var inputRadius;
var currentPlace;
var service;
var request = request || {};

function checkCurrentPlace(place){
    var result = window.localStorage.getItem(place.name);
    if (result) {
        return true;
    }

    return false;
}

function localStorageSave(place){
        window.localStorage.setItem(place.name, place.name);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {

            currentPlace = results[i];
            var condition = checkCurrentPlace(currentPlace);

            createMarker(results[i], condition);
        }
    }
}

function createMarker(place, isVisited) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
                                            map: map,
                                            position: place.geometry.location
                                        });

    if (isVisited) {
        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
    }else{
        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
    }

    google.maps.event.addListener(marker, 'click', function () {
        localStorageSave(place);
        navigator.vibrate(3);
        infowindow.setContent(place.name);
        alert("You've visited " + place.name);
        infowindow.open(map, this);
        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
      
    });

   
}



function onFail(message) {
    alert('Failed because: ' + message);
}

function onSuccess() {
    alert('Success');
}

var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {
    scope.map = kendo.observable({
        initialize: function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    //currentPos = new google.maps.LatLng(position.coords.latitude,
                    //                                    position.coords.longitude);

                    currentPos = new google.maps.LatLng(42.6509467, 23.37947029999998);

                    var mapElement = document.getElementById('map-canvas');

                    if (mapElement) {
                        map = new google.maps.Map(document.getElementById('map-canvas'), {
                            center: currentPos,
                            zoom: 11
                        });

                        var type = document.getElementById('place-type').value.toLowerCase();
                        var radius = parseInt(document.getElementById('radius').value);

                        if (type != null && radius != null) {

                            var request = {
                                location: currentPos,
                                types: [type],
                                radius: radius
                            };
                        }

                        debugger;
                        console.log(request);

                        infowindow = new google.maps.InfoWindow();
                        service = new google.maps.places.PlacesService(map);
                        service.nearbySearch(request, callback);

                    }
                });
            }
            else {
                alert('Cannot access navigator!');
            }

            //google.maps.event.addDomListener(window, 'load', initialize);
        },
        takeImage: function () {
            navigator.camera.getPicture(onSuccess, onFail, {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: true
            });

        },
        makeRequest: function () {

            this.initialize();

            //var type = document.getElementById('place-type').value.toLowerCase();
            //var radius = parseInt(document.getElementById('radius').value);

            //var currentRequest = {
            //    types: [type],
            //    radius: radius
            //};

            //service = new google.maps.places.PlacesService(map);
            //service.nearbySearch(currentRequest, callback);
        },
    });

}(app.viewmodels));
