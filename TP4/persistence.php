<?php

$sourceJson = file_get_contents('./media/users.json');
$data = json_decode($sourceJson, true);

echo($data);

//pour modif les données
$data[0]['nom'] = 'nom';

//pour sauv de nouveau dans le fichier json
$newData = json_encode($data);
file_put_contents('./media/users.json',$newData);