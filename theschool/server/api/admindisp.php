<?php

require '../connection/connection.php';

if(isset($_POST['id'])){
    
    session_start();
    $_SESSION['currentAdmin'] = $_POST['id'];
    $str = $_POST['id'];
    $id = ltrim($str, 'a');
    $aQuery = "Select * from administrators where ID = '$id'";
    $adminInfo = $amirdb->select($aQuery);
//    $sQuery = "SELECT COUNT(course_id) from students where course_id = '$id'";
//    $totStudents = $amirdb->select($sQuery);
//    $studNotAssoc = array_values($totStudents[0]);
//    $sNameQuery = "SELECT DISTINCT students.name, students.image from students inner join courses where course_id = '$id'";
//    $studName = $amirdb->select($sNameQuery);
//    $studNum = $studNotAssoc[0];
//    $studInt = $courseInfo['COUNT(course_id)'];
    
//    if($_SESSION['role'] == 'sales'){
//      $sales = 'yes';
//    }
//    else{
//        $sales = 'no';
//    }
    $allAdminInfo = ['allInfo'=>$adminInfo];
//    , 'studentNum'=>$studNotAssoc, 'studNames'=> $studName, 'sales'=>$sales];
    
    header('Content-Type: application/json');
    echo json_encode($allAdminInfo);
}

?>