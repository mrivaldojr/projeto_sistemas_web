// precisa agora jogar as informações de cidade/estado/país para uma pesquisa no eventful



var testeCoordenadas = {lat: -12.973040099999999, lng: -38.502303999999995};

var errorBox = document.getElementById("errorBox");
var userLatLon , userLatLonS;
var mapa,street,city,state,country;
var mapsApiKey = "AIzaSyC768eb2jHhTHjmkZp5i1B24CoIX9sqt0U";
var conteudoAqui = '<h2>Você está aqui</h2>';

function renderMap(){
	var mapProp = new google.maps.Map(document.getElementById('map-container'), {
		zoom: 14,
		center: userLatLon
	});
	var map=new google.maps.Map(document.getElementById("map-container"),mapProp);
	mapa = map;
	console.log(map);
	addMarker(userLatLon);
	
	mapsRequest();
	eventFulRequest();
}

function initMap(){
	getLocation();
} 

function addMarker(latlng){
	//var pos = {lat: latlng[0], lng:latlng[1]};

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

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var jsonParse = JSON.parse(this.response);
			document.getElementById("results2").innerHTML = xhttp.responseText;
		}

	};
	
	xhttp.open("GET", "http://localhost/web/php/eventful.php?latlon="+userLatLonS, true);
	xhttp.send();
}