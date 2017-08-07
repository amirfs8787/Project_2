<?php

require '../connection/connection.php';

    session_start();
    $str = $_SESSION['currentCourse'];
    $id = ltrim($str, 'c');

if(isset($_POST['name']) && isset($_POST['description'])){
    $name = $_POST['name'];
    $desc = $_POST['description'];
    
    if(isset($_POST['image'])){
        $image = $_POST['image'];
        $setCol = ['name','description','image'];
        $setVal = [$name, $desc, $image];
    }
    else{
        $setCol = ['name','description'];
        $setVal = [$name, $desc];
    }
    
    $conCol = 'ID';
    $conVal = $id;

    $amirdb->update('courses', $setCol, $setVal, $conCol, $conVal);
    
    $query = "SELECT * from courses WHERE ID = '$id'";
    $newCourseDisp = $amirdb->select($query);
    
    $sQuery = "SELECT COUNT(course_id) from students where course_id = '$id'";
    $totStudents = $amirdb->select($sQuery);
    $studNotAssoc = array_values($totStudents[0]);
    
    $sNameQuery = "SELECT DISTINCT students.name, students.image from students inner join courses where course_id = '$id'";
    $studName = $amirdb->select($sNameQuery);

    $courseQuery = "SELECT name,image FROM courses";
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

else{

    $editQuery = "Select * from courses where ID = '$id'";
    $editCourseInfo = $amirdb->select($editQuery);
    
    $sQuery = "SELECT COUNT(course_id) from students where course_id = '$id'";
    $totStudents = $amirdb->select($sQuery);
    $studNotAssoc = array_values($totStudents[0]);

    $courseInfo = ['allInfo'=>$editCourseInfo, 'studentNum'=>$studNotAssoc];
    
    header('Content-Type: application/json');
    echo json_encode($courseInfo);
}









?>