var music_marker = 'http://localhost/web/img/concert_marker.png'

var markers = [];

var options = {
	imagePath: 'http://localhost/web/img/m'
};

var errorBox = document.getElementById("errorBox");
var userLatLon , userLatLonS;
var mapa,street,city,state,country;
var mapsApiKey = "AIzaSyC768eb2jHhTHjmkZp5i1B24CoIX9sqt0U";

function renderMap(){
	var mapProp = new google.maps.Map(document.getElementById('map-container'), {
		zoom: 14,
		center: userLatLon
	});
	var map=new google.maps.Map(document.getElementById("map-container"),mapProp);
	mapa = map;
	console.log(map);

	mapsRequest();
	eventFulRequest();
}

function initMap(){
	getLocation();
} 

function addMarker(latlng){
	var infowindow = new google.maps.InfoWindow({
          content: conteudoAqui
    });

	var marker = new google.maps.Marker({
          position: latlng,
		  map: mapa,
		  title: "Você está aqui"
		});
		
	marker.addListener('click', function() {
	  infowindow.open(mapa, marker);
	});	
}

function addMarkerEvento(latlng, title){
	var infowindow = new google.maps.InfoWindow({
          content: title
	});

	var marker = new google.maps.Marker({
          position: latlng,
		  map: mapa,
		  icon: music_marker
		});
		
	marker.addListener('click', function() {
	  infowindow.open(mapa, marker);
	});

	return marker;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        errorBox.innerHTML = "Geolocation não é suportado por este browser.";
    }
}

function showPosition(position) {
    userLatLon = {lat: position.coords.latitude, lng: position.coords.longitude};
    userLatLonS = position.coords.latitude+","+position.coords.longitude;
	
	renderMap();
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            errorBox.innerHTML = "Usuário negou acesso a localização."
            break;
        case error.POSITION_UNAVAILABLE:
            errorBox.innerHTML = "Informação sobre a localização indisponível."
            break;
        case error.TIMEOUT:
            errorBox.innerHTML = "Excedeu tempo limite."
            break;
        case error.UNKNOWN_ERROR:
            errorBox.innerHTML = "Erro desconhecido."
            break;
    }
}

function mapsRequest(){

	var xhr = new XMLHttpRequest();

	var resposta;

	xhr.addEventListener("load", function(){
		if(xhr.status==200){
			var jsonParse = JSON.parse(this.response);

			for (var i = 0; i < 1; i++) {
				var result = jsonParse.results[i];				
				street = result.address_components[1].long_name;
				city = result.address_components[4].long_name;
				state = result.address_components[5].long_name;
				country = result.address_components[6].long_name;
				
				document.getElementById("results").innerHTML = "<h2>Endereco atual: "+city+" , "+state+" , "+country+"</h2>";
			}
		}
		else{
			alert("Erro na chamada da API");
		}


	});

	xhr.open("GET","https://maps.googleapis.com/maps/api/geocode/json?latlng="+userLatLonS+"&key="+mapsApiKey, true);
	xhr.send();
}

function eventFulRequest(){

	var markers = [];
	var titulos = [];
	var pos = [];

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var jsonParse = JSON.parse(this.response);

			for(var i=0; i<jsonParse.events.event.length;i++){
				var lat = parseFloat(jsonParse.events.event[i].latitude);
				var lng = parseFloat(jsonParse.events.event[i].longitude);
				var latLong = {lat:lat, lng:lng}
				var titulo = "<strong>Atração: </strong>"+jsonParse.events.event[i].title+
				"<br><strong>Data: </strong>"+
				jsonParse.events.event[i].start_time+"<br><a target=\"_blank\" href=\""+
				jsonParse.events.event[i].url+
				"\">Comprar Ingressos </a><br>";

				if(pos!=[]){
					for(var j=0;j<pos.length;j++){
						if( (latLong.lat == pos[j].lat) && (latLong.lng == pos[j].lng) ){
							titulo = titulo+"<br>"+"<strong>Atração: </strong>"+
							jsonParse.events.event[j].title+"<br><strong>Data: </strong>"+
							jsonParse.events.event[j].start_time+"<br><a target=\"_blank\" href=\""+
							jsonParse.events.event[j].url+
							" \">Comprar Ingressos </a><br>";
						}
					}
				}

				
				pos.push(latLong);
				addMarkerEvento(latLong, titulo);
			}
			document.getElementById("results2").innerHTML = xhttp.responseText;

			//var markerCluster = new MarkerClusterer(mapa, markers, options);
		}

	};
	
	xhttp.open("GET", "http://localhost/web/php/eventful.php?latlon="+userLatLonS, true);
	xhttp.send();
}