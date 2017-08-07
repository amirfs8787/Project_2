<?php

require '../connection/connection.php';

if(isset($_POST['email'])){
    
    $email = $_POST['email'];
    

    $aQuery = "SELECT COUNT(*) from administrators where email = '$email'";
    $totAdmin = $amirdb->select($aQuery);
    $adminNotAssoc = array_values($totAdmin[0]);

    if($adminNotAssoc[0] == 0){
        $exists = 'no';
    }
    else{
        $exists = 'yes';        
    }

    $adminExists = ['exists'=>$exists];
    
    header('Content-Type: application/json');
    echo json_encode($adminExists);
}





?>