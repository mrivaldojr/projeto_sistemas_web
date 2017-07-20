var uluru = {lat: 47.33333333, lng: 13.33333333};
var mapa;
function initMap(){
        var mapProp = new google.maps.Map(document.getElementById('map-container'), {
          zoom: 4,
          center: uluru
        });
        var map=new google.maps.Map(document.getElementById("map-container"),mapProp);
        mapa = map;
        carregaMarkers();
} 




function addMarker(latlng){

        var pos = {lat: latlng[0], lng:latlng[1]};

	var marker = new google.maps.Marker({
          position: pos,
          map: mapa
        });
}
