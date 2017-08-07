<?php

require '../connection/connection.php';

if(isset($_POST['name'])){


        $name = $_POST['name'];
        $query = "Select * from courses where name = '$name'";
        $courseArray = $amirdb->select($query);
        header('Content-Type: application/json');
        echo json_encode($courseArray);  
}

else if(isset($_POST['email'])){
    $email = $_POST['email'];
    $query = "Select * from students where email = '$email'";
    $studArray = $amirdb->select($query);
    header('Content-Type: application/json');
    echo json_encode($studArray);   
}



