function initialize() {
     var address = (document.getElementById('input_busca_local'));
     var autocomplete = new google.maps.places.Autocomplete(address);
     autocomplete.setTypes(['geocode']);
     google.maps.event.addListener(autocomplete, 'place_changed', function() {
         var place = autocomplete.getPlace();
         if (!place.geometry) {
             return;
         }

     var address = '';
     if (place.address_components) {
         address = [
             (place.address_components[0] && place.address_components[0].short_name || ''),
             (place.address_components[1] && place.address_components[1].short_name || ''),
             (place.address_components[2] && place.address_components[2].short_name || '')
             ].join(' ');
     }
   });
}

var bt_submit = document.querySelector("#submit_busca_local")

bt_submit.addEventListener("click", function(){
     geocoder = new google.maps.Geocoder();
     var address = document.getElementById("input_busca_local").value;
     geocoder.geocode( { 'address': address}, function(results, status) {
       if (status == google.maps.GeocoderStatus.OK) {
          var latLong = results[0].geometry.location.lat()+","+results[0].geometry.location.lng();
          eventFulRequest(latLong, "busca");
       } 
    
       else {
         alert("Geocode Falhou com o seguinte Status: " + status);
       }
     });
});

function populaLista(jsonParse){

     var tabela=document.querySelector("#tabela_eventos");

     while(tabela.rows.length > 0) {
          tabela.deleteRow(0);
     }

     var dadosEvento = {
          nome:"",
          local:"",
          imagem:"", 
          descricao:""
     }
     
     for(var i=0; i<jsonParse.events.event.length;i++){
          montaLinha(jsonParse.events.event[i]);
     }

     alert(JSON.stringify(jsonParse));
}

function montaLinha(dadosEvento){
         var tabela=document.querySelector("#tabela_corpo");

         var linha = document.createElement("tr");
         
         var img = document.createElement("img");

         var nome = document.createElement("p");
         var local = document.createElement("p");
     
         nome.textContent = dadosEvento.title;
         local.textContent = dadosEvento.venue_name;

         //if(dadosEvento)
         //img.setAttribute("src", )
     
         linha.appendChild(nome);
         linha.appendChild(local);

         tabela.appendChild(linha);
     
     }
     
     function exibeErros(erros){
     
         var ul = document.getElementById("mensagens-erro");
     
         ul.innerHTML = '';
     
         erros.forEach(function(element) {
             var listItem = document.createElement("li");
             listItem.textContent = element;
             ul.appendChild(listItem);
         }, this);
     
         
     }