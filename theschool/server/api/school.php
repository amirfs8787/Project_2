<?php

session_start();


require('../connection/connection.php');

if(isset($_SESSION['user'])){
    $user = $_SESSION['user'];    
    $role = $_SESSION['role'];
    $show = $user. ', '. $role;
    $img = $_SESSION['img'];
    if($role == "Sales"){
        $sales = 'yes';
    }
    else{
        $sales = 'no';
    }
    
        
    $courseQuery = "SELECT * FROM `courses`";
    $courseArray = $amirdb->select($courseQuery);
    $studentQuery = "SELECT * FROM `students`";
    $studentArray = $amirdb->select($studentQuery);
    
    $userDetails = ['display'=>$show, 'img'=>$img, 'sales'=>$sales, 'courses'=>$courseArray, 'students'=>$studentArray];
//    $show = $user . ', '. $role;
//    $userDetails = ['display'=>$show];
//    $userDetails = ['display'=>$user];

    header('Content-Type: application/json');
    echo json_encode($userDetails);
}
else{
    $msg = ['sendTo'=>'login'];
    header('Content-Type: application/json');
    echo json_encode($msg);
}


?>