/// <reference path="scripts/MapInitialiser.js"/>
/// <reference path="camera.js" />
/// <reference path="../kendo/js/jquery.min.js" />

(function () {
    var app;

    window.APP = {
        models: {
            map: {
                title: 'Map'
            },
            authors: {
                title: 'Authors',
                ds: new kendo.data.DataSource({
                    data: [
                        { id: 1, name: 'Georgis', email: 'georgis@abv.bg' },
                        { id: 2, name: 'Ianko', email: 'ianko@abv.bg' }
                    ]
                }),
                alert: function (e) {
                    alert('Send Mail to '+ e.data.name + '\n' + e.data.email);
                }
            }
        }
    };

    document.addEventListener('deviceready', function () {
        
        navigator.splashscreen.hide();

        setInterval(function(){

		   var networkState = navigator.connection.type;
		   var isConnected = checkConnnection(networkState);
		   
		    if (!isConnected) {

	    		alert('No Connection!');

	    	}

		}, 1000);

        app = new kendo.mobile.Application(document.body, { transition: 'slide', skin: 'flat', initial: 'views/map.html' });


    }, false);

    document.addEventListener("volumedownbutton", onVolumeDownKeyDown, false);

	function onVolumeDownKeyDown() {
    	app.map.zoom+=0.2;
	}

}());