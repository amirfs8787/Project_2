<?php

require '../connection/connection.php';

if(isset($_POST['id'])){
    
    session_start();
    $_SESSION['currentStudent'] = $_POST['id'];
    $str = $_POST['id'];
    $id = ltrim($str, 's');
    $sQuery = "Select * from students where ID = '$id'";
    $studInfo = $amirdb->select($sQuery);

    $cNameQuery = "SELECT courses.name, courses.image from students inner join courses where courses.ID = students.course_id AND students.ID = '$id'";
    
    $courseNames = $amirdb->select($cNameQuery);
//    $studNum = $studNotAssoc[0];
//    $studInt = $courseInfo['COUNT(course_id)'];
    
    if($_SESSION['role'] == 'sales'){
      $sales = 'yes';
    }
    else{
        $sales = 'no';
    }
//    $courseInfo = ['allInfo'=>$courseInfo, 'studentNum'=>$studNotAssoc, 'studNames'=> $studName, 'sales'=>$sales];
    
    $studentInfo = ['allInfo'=>$studInfo, 'courseNames'=> $courseNames, 'sales'=>$sales];
    
    header('Content-Type: application/json');
    echo json_encode($studentInfo);
}





?>