<?php
conectar();
function Conectar(){
    try{
        $opcoes = array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES UTF8');
        $con = new PDO("mysql:host=mysql472.umbler.com; dbname=db_condominio;", "sup", "tecsis123", $opcoes);
        echo "conectado com sucesso";
        return $con;

    } catch (Exception $e){
        echo 'Erro: '.$e->getMessage();
        return null;
    }
}



//$conn = mysqli_connect("mysql472.umbler.com", "sup", "tecsis123", "db_condominio");

//if(!$conn){
//	echo "Fail connect";
//	exit();
//}


?>

 