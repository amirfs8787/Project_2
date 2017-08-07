<?php

require '../connection/connection.php';

    session_start();
    $str = $_SESSION['currentAdmin'];
    $id = ltrim($str, 'a');

if(isset($_POST['name']) && isset($_POST['phone']) && isset($_POST['email']) && isset($_POST['role']) && isset($_POST['image'])){
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $role = $_POST['role'];
    
    if(isset($_POST['image']) && !empty($_POST['password'])){
        $image = $_POST['image'];
        $password = md5($_POST['password']);
        $setCol = ['name','phone','email','role', 'image', 'password'];
        $setVal = [$name, $phone, $email, $role, $image, $password];
    }
    else if(isset($_POST['image']) && empty($_POST['password'])){
        $image = $_POST['image'];
        $setCol = ['name','phone','email','role', 'image'];
        $setVal = [$name, $phone, $email, $role, $image];
    }
    else if (!isset($_POST['image']) && isset($_POST['password'])){
        $password = md5($_POST['password']);
        $setCol = ['name','phone','email','role', 'password'];
        $setVal = [$name, $phone, $email, $role, $password];
    }
    else{
        $setCol = ['name','phone','email','role'];
        $setVal = [$name, $phone, $email, $role];
    }
    
    $conCol = 'ID';
    $conVal = $id;

    $amirdb->update('administrators', $setCol, $setVal, $conCol, $conVal);
    
    //**********************************
    //********************************
    //CHECK BELOW IF IT'S NEEDED.  WHATS ABOVE HAS BEEN CHANGED TO APPLY TO ADMINEDIT ON SAVE
    
    $query = "SELECT * from administrators WHERE ID = '$id'";
    $newAdminDisp = $amirdb->select($query);
    
    $sQuery = "SELECT COUNT(*) from administrators";
    $totAdmin = $amirdb->select($sQuery);
    $adNotAssoc = array_values($totAdmin[0]);

    
//    if($_SESSION['role'] == 'sales'){
//      $sales = 'yes';
//    }
//    else{
//        $sales = 'no';
//    }
    
    
    $addAdminDetails = ['allInfo'=>$newAdminDisp, 'adminNum'=>$adNotAssoc];
   
    header('Content-Type: application/json');
    echo json_encode($addAdminDetails);
   
}

else{

    $editQuery = "Select * from administrators where ID = '$id'";
    $editAdminInfo = $amirdb->select($editQuery);
    

    $adminInfo = ['allInfo'=>$editAdminInfo];
    
    header('Content-Type: application/json');
    echo json_encode($adminInfo);
}









?>