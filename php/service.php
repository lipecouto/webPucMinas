<?php
	include("config.php");

	//verifica se uma ação foi solicitada.

	

	if(!empty($_GET['acao'];)){

		//Guardando a ação solicitada
		$acao = $_GET['acao'];


		//Chaveando para qual regra de negocio vou atuar
		switch ($acao) {
			case 'inserir':
				$nome = $_POST['nome'];
				$cpf = $_POST['cpf'];
				$login = $_POST['login'];
				$senha = $_POST['senha'];
				$email = $_POST['email'];
				$telefone = $_POST['telefone'];
				$tipoUsuario = $_POST['tipoUsuario'];
				$telefone = $_POST['telefone'];
				$dtnasc   = $_POST['dtnasc'];
				$idcondminio = $_POST['idcondominio'];
				$idapto      = $_POST['idapto'];

				$querysql = "insert into USUARIO(nome, cpf, login, senha, email, tipoUsuario, 
												 telefone, datanasc, id_condominio, id_apartamento)
							 values('Philipe Couto', 07349602609, 'couto', 'abc123', 'philipephwd@gmail.com', 1, 31991984503, '02/02/1986', 1, 101 );";
				
				if(!$_POST['nome'] = null or !$_POST['raca'] = null)
				{

					$execute = mysqli_query($conn, $querysql);
					if($query){
						echo "Sucesso";
					}else{
						echo "Error";
					}

				}else{
					echo "Os dados inválidos";
				}



				break;
			case 'consultaCondominio':
				//$resultado = $pdo->select("SELECT * FROM CONDOMINIO WHERE RAZAOSOCIAL LIKE '$parametro%' ORDER BY RAZAOSOCIAL ASC");
				break;

			case 'consultaAp':
				break;

			default:
				 echo "Serviço não existe";
				break;
		}
		}

	}else{

		echo "Sem ação definida!";
	}


?>