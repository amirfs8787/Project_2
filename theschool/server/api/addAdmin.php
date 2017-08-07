<?php

require '../connection/connection.php';

if(isset($_POST['name']) && isset($_POST['phone']) && isset($_POST['email']) && isset($_POST['role']) && isset($_POST['image']) && isset($_POST['password'])){    
    session_start();
    $password = md5($_POST['password']);
    $columns = ['name','role', 'email', 'phone', 'image', 'password'];
    $values = [$_POST['name'],$_POST['role'],$_POST['email'],$_POST['phone'],$_POST['image'], $password];
    $amirdb->insert('administrators',$columns,$values);
    
    $query = "SELECT * from administrators ORDER BY ID DESC LIMIT 1";
    $newAdminDisp = $amirdb->select($query);
    
    $id = $newAdminDisp[0]['ID'];
//    $_SESSION['currentCourse'] = $id;    
    
    $aQuery = "SELECT COUNT(*) from administrators";
    $totAdmin = $amirdb->select($aQuery);
    $adminNotAssoc = array_values($totAdmin[0]);
    
    $sNameQuery = "SELECT * from administrators where ID = '$id'";
    $studName = $amirdb->select($sNameQuery);
    
//    if($_SESSION['role'] == 'sales'){
//      $sales = 'yes';
//    }
//    else{
//        $sales = 'no';
//    }
    
    $addAdminDetails = ['allInfo'=>$newAdminDisp, 'adminNum'=>$adminNotAssoc];

    header('Content-Type: application/json');
    echo json_encode($addAdminDetails);
    
}

else{
    
    
    
    $msg = ['msg'=>'Could not get info'];
    header('Content-Type: application/json');
    echo json_encode($msg);
}



?>