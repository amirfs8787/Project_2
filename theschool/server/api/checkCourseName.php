<?php

require '../connection/connection.php';

if(isset($_POST['name'])){
    
    $name = $_POST['name'];
    

    $cQuery = "SELECT COUNT(*) from courses where name = '$name'";
    $totC = $amirdb->select($cQuery);
    $cNotAssoc = array_values($totC[0]);

    if($cNotAssoc[0] == 0){
        $exists = 'no';
    }
    else{
        $exists = 'yes';        
    }

    $courseExists = ['exists'=>$exists];
    
    header('Content-Type: application/json');
    echo json_encode($courseExists);
}





?>