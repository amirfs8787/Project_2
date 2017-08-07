<?php

require '../connection/connection.php';


    
    
    session_start();
    
    $str = $_SESSION['currentStudent'];
    $id = ltrim($str, 's');

    $amirdb->delete('students','ID',$id);
    
    $courseQuery = "SELECT * FROM `courses`";
    $courseArray = $amirdb->select($courseQuery);
    $studentQuery = "SELECT * FROM `students`";
    $studentArray = $amirdb->select($studentQuery);
    
    $studToDel = ['ID'=>$id, 'courses'=>$courseArray, 'students'=>$studentArray];

    header('Content-Type: application/json');
    echo json_encode($studToDel);
    




?>