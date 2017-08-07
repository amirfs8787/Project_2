<?php


session_start();
session_destroy();
$msg = ['sendTo'=>'login'];
header('Content-Type: application/json');
echo json_encode($msg);







?>




