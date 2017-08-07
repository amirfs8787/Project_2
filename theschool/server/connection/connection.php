<?php


class Database {
	private $conn;
	private static $_instance; 
	private $host = "127.0.0.1";
	private $username = "root";
	private $pass = "";
	private $_db = "school";
	
	public static function getInstance() {
		if(!self::$_instance) { 
			self::$_instance = new self();
		}
		return self::$_instance;
	}//-------------end function-----

	private function __construct() {
		$this->conn = mysqli_connect($this->host, $this->username, $this->pass, $this->_db);
	
		if(mysqli_connect_error()) {
			trigger_error("Failed to conencto to MySQL: " . mysql_connect_error(),
				 E_USER_ERROR);
		}
	}//-------------end function-----
	private function __clone() { }
	//-------------end function-----
	public function getConn() {
		return $this->conn;
	}//-------------end function-----

	public function close(){
		unset($connection);
	}//-------------end function-----

    
    public function select($query){
            $sendBack = [];
            $myConn = self::getConn();
            $result = mysqli_query($myConn, $query);
            $row = mysqli_fetch_assoc($result);
            while(isset($row)){
                    array_push($sendBack,$row);
                    $row = mysqli_fetch_assoc($result);
                }
            if(count($sendBack) == 0){
                $sendBack = ['status'=>'invalid'];
                return $sendBack;
            }
            else{
                return $sendBack;
            }            
    }
    
    public function login($query, $email, $pass){
        
        $sendBack = [];
        $myConn = self::getConn();
        $stmt = mysqli_prepare($myConn, $query);
        mysqli_stmt_bind_param($stmt, "ss", $email, $pass);
        mysqli_stmt_execute($stmt);    
        $result = mysqli_stmt_get_result($stmt);        
        $row = mysqli_fetch_assoc($result);
        while(isset($row)){
            array_push($sendBack,$row);
            $row = mysqli_fetch_assoc($result);
        }
        

        if(count($sendBack) == 0){
            $sendBack = ['status'=>'invalid'];
            return $sendBack;
        }
        else{
            return $sendBack;
        }
    }
    
    public function insert($table, $columnArray, $valueArray){
        
        $myConn = self::getConn();
        $columnString = '';
        for ($i=0; $i<count($columnArray); $i++){
            if($i==0){
                $columnString = $columnArray[$i];
            }
            else{
                $columnString = $columnString. ', '. $columnArray[$i];
            }
        }
        
        $valString = '';
        for ($i=0; $i<count($valueArray); $i++){
            if($i==0){
                $valString = "'". $valueArray[$i]."'";
            }
            else{
                $valString = $valString. ", '". $valueArray[$i]. "'";
            }
        }
        $query = "INSERT INTO $table ($columnString) VALUES ($valString)";
        mysqli_query($myConn, $query);
        
    }
    
    public function update($table, $setCol, $setValues, $conditionCol, $conditionVal){
        $myConn = self::getConn();
        $updateStr = '';
        for ($i=0; $i<count($setCol); $i++){
            if($i == 0){
                $updateStr = "$setCol[$i] = '$setValues[$i]'";
            }
            else{
                $updateStr = $updateStr. ", ". $setCol[$i]. "= '$setValues[$i]'";
            }
        }
        $query = "UPDATE $table SET $updateStr WHERE $conditionCol = '$conditionVal'";
        mysqli_query($myConn, $query);
        
    }
    
    public function delete($table, $conditionCol, $conditionVal){
        $myConn = self::getConn();
        $query = "DELETE FROM $table WHERE $conditionCol = '$conditionVal'";
        mysqli_query($myConn, $query);

    }

    public function deleteMultConditions($table, $conditions){
        $myConn = self::getConn();
        $query = "DELETE FROM $table WHERE $conditions";
        mysqli_query($myConn, $query);
    }

}

$amirdb = Database::getInstance();

?>