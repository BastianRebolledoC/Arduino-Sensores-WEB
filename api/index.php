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

//funcion
function string_a_array_valores($texto)
{
  $horas_y_valores = explode("-", $texto);
  $valores = array();

  foreach ($horas_y_valores as $bloque) {
    array_push($valores, explode(":", $bloque)[1]);
  }
  return $valores;
}

function obtener_horas($texto)
{
  $horas_y_valores = explode("-", $texto);
  $horas = array();

  foreach ($horas_y_valores as $bloque) {
    array_push($horas, explode(":", $bloque)[0]);
  }
  return $horas;
}

$data = array();
if ($query->num_rows > 0) {

  $userData = array();

  while ($row = $query->fetch_assoc()) {

    $hora_y_valores = array();
    $horas = obtener_horas($row["dato_ldr"]);
    $dato_ldr = string_a_array_valores($row["dato_ldr"]);
    $dato_temperatura = string_a_array_valores($row["dato_temperatura"]);
    $dato_humedad = string_a_array_valores($row["dato_humedad"]);

    for ($i = 0; $i < sizeof($horas); $i++) {
      $valores = array("hora" => $horas[$i], "ldr" => $dato_ldr[$i], "temperatura" => $dato_temperatura[$i], "humedad" => $dato_humedad[$i]);
      array_push($hora_y_valores, $valores);
    }

    // insertar data en array
    $new_data = array(
      "id" => $row['id'],
      "dia" => $row['dia'],
      "hora_y_valores" => $hora_y_valores
    );
    array_push($userData, $new_data);
  }

  $data = $userData;
} else {
  $data = array();
}

//returns data as JSON format
echo json_encode($data);
