<?php

require '../connection/connection.php';


    
    
    session_start();
    
    $str = $_SESSION['currentCourse'];
    $id = ltrim($str, 'c');

    $amirdb->delete('courses','ID',$id);
    
    $courseQuery = "SELECT * FROM `courses`";
    $courseArray = $amirdb->select($courseQuery);
    $studentQuery = "SELECT * FROM `students`";
    $studentArray = $amirdb->select($studentQuery);
    
    $courseToDel = ['ID'=>$id, 'courses'=>$courseArray, 'students'=>$studentArray];

    header('Content-Type: application/json');
    echo json_encode($courseToDel);
    




?>