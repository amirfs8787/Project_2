<?php

require '../connection/connection.php';

session_start();


if(isset($_POST['username']) && !isset($_POST['password'])){

$userN = $_POST['username'];

$query = "SELECT name FROM `administrators` WHERE email = '$userN'";
    
$userMsgArray = $amirdb->select($query);

    header('Content-Type: application/json');
    echo json_encode($userMsgArray);
    


}


else if(isset($_POST['username']) && isset($_POST['password'])){

$email = $_POST['username'];
$pass = md5($_POST['password']);
$query = "SELECT * FROM `administrators` WHERE email=? AND password=?";

    
$loginArray = $amirdb->login($query, $email, $pass);
    if (array_key_exists("status",$loginArray)){
        header('Content-Type: application/json');
        echo json_encode($loginArray);
    }

    else{

        $_SESSION['user'] = $loginArray[0]['name'];
        $_SESSION['role'] = $loginArray[0]['role'];
        $_SESSION['img'] = $loginArray[0]['image'];
        header('Content-Type: application/json');
        echo json_encode($loginArray);
    }


}

else{
    if(isset($_SESSION['user'])){

    $sendSchool = ['sendToSchool'=>'yes'];
    header('Content-Type: application/json');
    echo json_encode($sendSchool);
    }
    else{
    $sendSchool = ['sendToSchool'=>'no'];
    header('Content-Type: application/json');
    echo json_encode($sendSchool);   
    }
}





?>