<?php

session_start();

require '../connection/connection.php';

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
    
    $adminQuerry = "SELECT * from administrators";
    $adminArray = $amirdb->select($adminQuerry);
    
    
    $oQuery = "SELECT COUNT(role) from administrators where role = 'owner'";
    $totOwners = $amirdb->select($oQuery);
    $ownNotAssoc = array_values($totOwners[0]);
    
    $userDetails = ['display'=>$show, 'img'=>$img, 'sales'=>$sales, 'role'=>$role, 'admins'=>$adminArray, 'ownerNum'=>$ownNotAssoc];
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