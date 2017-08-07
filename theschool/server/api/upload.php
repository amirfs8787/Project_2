<?php
	if ( 0 < $_FILES['file']['error'] ) {
	    echo json_encode(['status' => $_FILES['file']['error']]);
	}
	else {
	    move_uploaded_file($_FILES['file']['tmp_name'], '../../uploads/' . $_FILES['file']['name']);
	    echo json_encode(['status' => 'success', 'fileName' => $_FILES['file']['name']]);
	}
?>



