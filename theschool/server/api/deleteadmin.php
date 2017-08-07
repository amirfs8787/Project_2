<?php

require '../connection/connection.php';


    
    
    session_start();
    
    $str = $_SESSION['currentAdmin'];
    $id = ltrim($str, 'a');

    $amirdb->delete('administrators','ID',$id);
    
//    $courseQuery = "SELECT * FROM `courses`";
//    $courseArray = $amirdb->select($courseQuery);
//    $studentQuery = "SELECT * FROM `students`";
//    $studentArray = $amirdb->select($studentQuery);
    

    $aQuery = "SELECT COUNT(*) from administrators";
    $totAdmin = $amirdb->select($aQuery);
    $adNotAssoc = array_values($totAdmin[0]);

    $aId = "Select ID from administrators where ID = '$id'";
    $idToDel = $amirdb->select($aId);

    
//    if($_SESSION['role'] == 'sales'){
//      $sales = 'yes';
//    }
//    else{
//        $sales = 'no';
//    }
    
    
    $adminDetails = ['adminNum'=>$adNotAssoc, 'ID'=>$id];


    header('Content-Type: application/json');
    echo json_encode($adminDetails);
    




?>