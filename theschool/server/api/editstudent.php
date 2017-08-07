<?php

require '../connection/connection.php';

    session_start();
    $str = $_SESSION['currentStudent'];
    $id = ltrim($str, 's');
//THIS IS WHAT HAPPENS WHEN YOU SAVE THE NEW EDITS.  BELOW IS WHAT HAPPENS WHEN YOU JUST CLICK ON 'EDIT' TO BEGIN THE EDITING
if(isset($_POST['name']) && isset($_POST['phone']) && isset($_POST['email']) && isset($_POST['courses'])){
    
    


    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $coursesArrFromClient = $_POST['courses'];

    
    $query = "SELECT * from students WHERE ID = '$id'";
    $newStudDisp = $amirdb->select($query);
    
    $queryCID = "SELECT course_id from students WHERE ID = '$id'";
    $studCourses = $amirdb->select($queryCID);
    
    $coursesToAdd = [];

    for($i = 0; $i<count($studCourses); $i++){
        array_push($coursesToAdd,$studCourses[$i]['course_id']);
    }

    $coursesToRemove = [];
    $courseToAddIDS = [];
    
    
for($i = 0; $i<count($newStudDisp);$i++){
    if (!in_array($newStudDisp[$i]['course_id'], $coursesArrFromClient)) {
        array_push($coursesToRemove, $newStudDisp[$i]['course_id']);
    }
}
    
for($i = 0; $i<count($coursesArrFromClient);$i++){
    if (!in_array($coursesArrFromClient[$i], $coursesToAdd)) {
        array_push($courseToAddIDS, $coursesArrFromClient[$i]);
    }
}
    
for($i = 0; $i<count($coursesToRemove);$i++){
    $conditionsToDel = "course_id = '$coursesToRemove[$i]' AND ID = '$id'";
    $amirdb->deleteMultConditions('students',$conditionsToDel);
}
    
if(isset($_POST['image'])){
   $image = $_POST['image'];  
 }
else{
    $image = $newStudDisp[0]['image'];
}

if(count($courseToAddIDS)>0){
    $columns = ['ID', 'course_id', 'name','phone', 'email','image'];
    for($i = 0; $i<count($courseToAddIDS); $i++){
        $values = [$id, $courseToAddIDS[$i], $name, $phone, $email,$image];
        $amirdb->insert('students',$columns, $values);
    }
}
    
    $sQuery = "SELECT COUNT(name) from students where ID = '$id'";
    $totCourses = $amirdb->select($sQuery);
    $amountOfCourses = array_values($totCourses[0]); 
    
    
if($name != $newStudDisp[0]['name'] || $email != $newStudDisp[0]['email'] || $phone != $newStudDisp[0]['phone'] || $image != $newStudDisp[0]['image']){
    
    for($i = 0; $i<$amountOfCourses[0]; $i++){
        $setCol1 = ['name','phone', 'email', 'image'];
        $setVal1 = [$name, $phone, $email, $image];
        $conCol = 'ID';
        $conVal = $id;
        $amirdb->update('students', $setCol1, $setVal1, $conCol, $conVal);
    }
 
}
    
    
    $editSQuery = "Select * from students where ID = '$id'";
    $editStudentInfo = $amirdb->select($editSQuery);
    
    
    
    $cStudNameQuery = "SELECT courses.name, courses.image from students inner join courses where courses.ID = students.course_id AND students.ID = '$id'";    
    $courseOfStudNames = $amirdb->select($cStudNameQuery);
    
    $studDispAfterEdit = ['allInfo'=>$editStudentInfo, 'studCourses'=>$courseOfStudNames];
    
    header('Content-Type: application/json');
    echo json_encode($studDispAfterEdit);
}

else{


    $editSQuery = "Select * from students where ID = '$id'";
    $editStudentInfo = $amirdb->select($editSQuery);
    
    
    
    $cStudNameQuery = "SELECT courses.name, courses.ID from students inner join courses where courses.ID = students.course_id AND students.ID = '$id'";    
    $courseOfStudNames = $amirdb->select($cStudNameQuery);
    
    $allCourseQ = "SELECT name, ID from courses";
    $allCourseNames = $amirdb->select($allCourseQ);
    

    $courseInfo = ['allStudInfo'=>$editStudentInfo, 'courseOfStudNames'=>$courseOfStudNames, 'allCourseNames'=>$allCourseNames];
    
    header('Content-Type: application/json');
    echo json_encode($courseInfo);
}











?>