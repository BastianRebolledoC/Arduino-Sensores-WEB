<?php
$data = array();

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
$query = $db->query("SELECT * FROM testing_1");

if ($query->num_rows > 0) {

  $userData = array();

  while ($row = $query->fetch_assoc()) {
    $new_data = array(
      $row['id'],
      $row['autor'],
      $row['dato']
    );
    array_push($userData, $new_data);
  }

  $data['status'] = 'ok';
  $data['result'] = $userData;
} else {
  $data['status'] = 'err';
  $data['result'] = 'NO DATA';
}

//returns data as JSON format
echo json_encode($data);
