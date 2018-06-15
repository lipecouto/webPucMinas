<?php

	$conn = new mysqli("mysql472.umbler.com", "sup", "tecsis123", "db_condominio");
	
	if($conn)
	{
		echo "Conexão realizada com sucesso!";
	}
	else
	{
		http_response_code(500);
		echo "['error':'Problema ao acesso a banco.']";
	}

?>

 