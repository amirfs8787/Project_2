<?php

require '../connection/connection.php';

if(isset($_POST['name']) && isset($_POST['description'])){
    
    
    session_start();
    
    $columns = ['name','description','image'];
    $values = [$_POST['name'],$_POST['description'],$_POST['image']];
    $amirdb->insert('courses',$columns,$values);
    
    $query = "SELECT * from courses ORDER BY ID DESC LIMIT 1";
    $newCourseDisp = $amirdb->select($query);
    
    $id = $newCourseDisp[0]['ID'];
    $_SESSION['currentCourse'] = $id;
    
    $sQuery = "SELECT COUNT(course_id) from students where course_id = '$id'";
    $totStudents = $amirdb->select($sQuery);
    $studNotAssoc = array_values($totStudents[0]);
    
    $sNameQuery = "SELECT DISTINCT students.name, students.image from students inner join courses where course_id = '$id'";
    $studName = $amirdb->select($sNameQuery);

    $courseQuery = "SELECT name FROM courses";
    $courseArray = $amirdb->select($courseQuery);
    
    if($_SESSION['role'] == 'sales'){
      $sales = 'yes';
    }
    else{
        $sales = 'no';
    }
    
    $addCourseDetails = ['allInfo'=>$newCourseDisp, 'studentNum'=>$studNotAssoc, 'studNames'=> $studName,'courseList'=>$courseArray, 'sales'=>$sales];

    header('Content-Type: application/json');
    echo json_encode($addCourseDetails);
    
}



?>