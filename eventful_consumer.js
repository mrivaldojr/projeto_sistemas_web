
function carregaMarkers(){
	var xhr = new XMLHttpRequest();

	var resposta;

	xhr.addEventListener("load", function(){
		if(xhr.status==200){
			var jsonParse = JSON.parse(this.response);

			alert(jsonParse);

			jsonParse.forEach(function(element) {
        		var response = element.latlng;
				addMarker(element.latlng);
		}, this);
		}
		else{
			alert("Erro na chamada da api eventful");
		}


	});


	xhr.open("GET","https://restcountries.eu/rest/v2/regionalbloc/eu", true);
	xhr.send();

}