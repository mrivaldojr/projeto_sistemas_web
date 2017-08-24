<?php

	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: POST, GET, OPTIONS');

	$latlon = $_GET['latlon'];

	$url= 'https://api.eventful.com/json/events/search?app_key=cD7NKFXPPDzQR6qD&where='.$latlon.'&within=35';
	
	// essas opcoes fazem funcionar em localhost

	$result = file_get_contents($url);
	
	
	print_r($result);
	
	//$response = curl_exec($curl_h);
	//var_dump(($response));
	//$response = json_decode($response);

	//$response = var_dump(json_encode($response));

?>