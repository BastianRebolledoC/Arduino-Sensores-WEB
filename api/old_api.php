<?php
header('Access-Control-Allow-Origin: *');

//database details
$servername = "";
$username = "";
$password = "";
$dbname = "";

//create connection and select DB
$db = new mysqli($servername, $username, $password, $dbname);

if ($db->connect_error) {
  die("Unable to connect database: " . $db->connect_error);
}

//get user data from the database
$query = $db->query("SELECT * FROM tabla_pagina_web");

$data = array();
if ($query->num_rows > 0) {

  $userData = array();

  while ($row = $query->fetch_assoc()) {

    // insertar data en array
    $new_data = array(
      "id" => $row['id'],
      "dia" => $row['dia'],
      "dato_ldr" => $row['dato_ldr'],
      "dato_temperatura" => $row['dato_temperatura'],
      "dato_humedad" => $row['dato_humedad']
    );
    array_push($userData, $new_data);
  }

  $data = $userData;
} else {
  $data = array();
}

//returns data as JSON format
echo json_encode($data);
