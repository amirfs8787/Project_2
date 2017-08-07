<?php

require '../connection/connection.php';

if(isset($_POST['name']) && isset($_POST['email']) && isset($_POST['phone']) && isset($_POST['courses'])){
    
    
    session_start();
    
    $query = "SELECT ID from students ORDER BY ID DESC LIMIT 1";
    $newStudDisp = $amirdb->select($query);
    
    $id = $newStudDisp[0]['ID']+1;
    $_SESSION['currentStudent'] = $id;
    
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $courseArr = $_POST['courses'];
    $image = $_POST['image'];
    
    for($i=0; $i<count($courseArr); $i++){
        $columns = ['ID', 'course_id', 'name', 'phone','email','image'];
        $values = [$id, $courseArr[$i], $name, $phone, $email, $image];
        $amirdb->insert('students',$columns,$values); 
    }
    
    $courseArrToSendBack = [];
    for($i = 0; $i<count($courseArr); $i++){
        $cnQuery = "SELECT name, image from courses where ID = $courseArr[$i]";
        $cName = $amirdb->select($cnQuery);
        array_push($courseArrToSendBack,$cName);
    }
 

    $studQuery = "SELECT * FROM students where ID = '$id'";
    $studArray = $amirdb->select($studQuery);
    
    $studentInfQuery = "SELECT name,phone,image FROM `students`";
    $studentInfArray = $amirdb->select($studentInfQuery);
    
    if($_SESSION['role'] == 'sales'){
      $sales = 'yes';
    }
    else{
        $sales = 'no';
    }
    
    $addStudDetails = ['allStudInfo'=>$studArray, 'courseNameList'=>$courseArrToSendBack, 'studToList'=>$studentInfArray, 'sales'=>$sales];

    header('Content-Type: application/json');
    echo json_encode($addStudDetails);
    
}



?>