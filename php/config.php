<?php

$conn = mysqli_connect("mysql472.umbler.com", "sup", "tecsis123", "db_condominio");

if(!$conn){
	echo "Fail connect";
	exit();
}
?>