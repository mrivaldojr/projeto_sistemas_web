function eventFulRequest(){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var jsonParse = JSON.parse(this.response);
	
				for(var i=0; i<jsonParse.events.event.length;i++){
					var lat = parseFloat(jsonParse.events.event[i].latitude);
					var lng = parseFloat(jsonParse.events.event[i].longitude);
					var latLong = {lat:lat, lng:lng}
					
					addMarkerEvento(latLong);
				}
	
			}
	
		};
		
		xhttp.open("GET", "http://localhost/web/php/eventful.php?latlon="+userLatLonS, true);
		xhttp.send();
	}