<?php

require '../connection/connection.php';

if(isset($_POST['email'])){
    
    $email = $_POST['email'];
    

    $sQuery = "SELECT COUNT(*) from students where email = '$email'";
    $totStud = $amirdb->select($sQuery);
    $studNotAssoc = array_values($totStud[0]);

    if($studNotAssoc[0] == 0){
        $exists = 'no';
    }
    else{
        $exists = 'yes';        
    }

    $studExists = ['exists'=>$exists];
    
    header('Content-Type: application/json');
    echo json_encode($studExists);
}





?>