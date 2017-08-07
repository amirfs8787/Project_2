<?php

require '../connection/connection.php';


    $query = "Select name,ID from courses";
    $courseNames = $amirdb->select($query);

    $courseList = ['allCourses'=>$courseNames];
    
    header('Content-Type: application/json');
    echo json_encode($courseList);






?>