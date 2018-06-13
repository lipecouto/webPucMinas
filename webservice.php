<?php

//Primeiro ver se um serviço foi requisitado
if(!empty($_GET['service'])){
	
	require("config.php");
	
	$service = $_GET['service'];
	
	//Tratamentos dos serviços
	switch ($service)
	{
	//Serviço para listar os dados da tabela
	case "listar":
		
		$sql = "SELECT * FROM livros ORDER BY nome";
		$query = mysqli_query($conn,$sql);
					
		$return = array();
			
		while($dados = mysqli_fetch_array($query)){
			array_push($return, array('id'=>$dados['id'],'nome'=>$dados['nome'],'resumo'=>$dados['resumo'],'FotoCapa'=>$dados['FotoCapa'],'ano'=>$dados['ano'],'editora'=>$dados['editora'],'StatusLeitura'=>$dados['StatusLeitura']));
		}
		http_response_code(200);
		echo json_encode(array('listagem'=>$return));

		break;
	
		//Caso a acao solicitada não exista
		default:
			echo "Serviço não existe";
	break;
    
	case 'inserir':
        
			
		if(!empty($_POST['user_name'])){

			if(!empty($_POST['user_id'])){
				$id = $_POST['user_id'];
			}else{
				$id = "";
			}

			$nome = $_POST['user_name'];
			$resumo = $_POST['user_resumo'];
			$foto = $_POST['user_img'];
			$ano = $_POST['user_ano'];
			$editora = $_POST['user_editora'];
			$status = $_POST['user_status'];

			if($id == ""){
				$sql_salvar = "INSERT INTO livros (nome, resumo, FotoCapa, ano, editora, StatusLeitura) VALUES ('".$nome."','".$resumo."','".$foto."','".$ano."','".$editora."','".$status."')";
			}else{
				$sql_salvar = "UPDATE livros SET nome='".$nome."', resumo='".$resumo."', FotoCapa='".$foto."',ano='".$ano."', editora='".$editora."', StatusLeitura='".$status."  WHERE id=".$id;	
			}

			$query_salvar = mysqli_query($conn, $sql_salvar);

			if($query_salvar){
				http_response_code(200);
				echo true;
			}else{
				http_response_code(500);
				echo "['error':'Erro ao processar a solicitação com BD']";
			}

		}

    break;

  //   case 'atualizar_leitura':

		// if(!empty($_POST['user_status'])){

		// 	$id = $_POST['user_id'];
		// 	$status = $_POST['user_status'];

		// 	if($status < 0 OR $status > 100){
		// 		$sql_salvar = "UPDATE livros SET StatusLeitura='".$status." WHERE id=".$id;	
		// 	}else{
		// 		echo "['erro':'Você deve colocar um valor maior que 0 e menor que 100']";	
		// 	}

		// 	$query_salvar = mysqli_query($conn, $sql_salvar);

		// 	if($query_salvar){
		// 		http_response_code(200);
		// 		echo true;
		// 	}else{
		// 		http_response_code(500);
		// 		echo "['error':'Erro ao processar a solicitação com BD']";
		// 	}

  //   break;
			
	default:
		http_response_code(501);
		echo "['error':'O serviço ".$service." solicitado não foi implementado']";			
	}
	
}else{
	http_response_code(501);
	echo "['error':'Serviço não especificado']";	
}

?>