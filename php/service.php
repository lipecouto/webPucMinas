<?php
	require_once('config.php');

	//verifica se uma ação foi solicitada.

	

	if(!empty($_GET['acao'];)){

		//Guardando a ação solicitada
		$acao = $_GET['acao'];


		//Chaveando para qual regra de negocio vou atuar
		switch ($acao) {
			case 'inserir':
				insertUser();
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

	function insertUser(){

				$nome = (isset($_POST['nome']))? $_POST['nome']: '';
				$cpf = (isset($_POST['cpf']))? $_POST['cpf']: '';
				$login = (isset($_POST['login']))? $_POST['login']: '';
				$senha = (isset($_POST['senha']))? $_POST['senha']; '';
				$email = (isset($_POST['email']))? $_POST['email']: '';
				$telefone = (isset($_POST['telefone']))? $_POST['telefone']: '';
				$tipoUsuario = (isset($_POST['tipoUsuario']))? $_POST['tipoUsuario']: '';
				$telefone = (isset($_POST['telefone']))? $_POST['telefone']: '';
				$dtnasc   = (isset($_POST['dtnasc']))? $_POST['dtnasc']: '';
				$idcondminio = (isset($_POST['idcondominio']))? $_POST['idcondominio']: '';
				$idapto      = (isset($_POST['idapto']))? $_POST['idapto']: '';

				$senhacode = base64_encode($senha);

			 	if (empty($nome) || empty($email) || empty($assunto) || empty($msg)):
        			$array  = array('tipo' => 'alert alert-danger', 'mensagem' => 'Preencher todo os campos obrigatórios(*)!');
        			echo json_encode($array);
    			else:	
					$pdo = conectar();
					$querysql = "insert into USUARIO(nome, cpf, login, senha, email, tipoUsuario, 
												 telefone, datanasc, id_condominio, id_apartamento)
							 values(?,?,?,?,?,?,?,?,?,?)";
					$stm = $pdo->prepare($sql);
					$stm->bindValue(1, $nome, PDO::PARAM_STR, 100);
        			$stm->bindValue(2, $cpf, PDO::PARAM_INT);
        			$stm->bindValue(3, $login, PDO::PARAM_STR, 100);
        			$stm->bindValue(4, $senhacode, PDO::PARAM_STR, 100);
        			$stm->bindValue(5, $email, PDO::PARAM_STR, 100);
        			$stm->bindValue(6, $tipoUsuario, PDO::PARAM_INT);
        			$stm->bindValue(7, $telefone, PDO::PARAM_INT);
        			$stm->bindValue(8, $dtnasc);
        			$stm->bindValue(9, $idcondominio, PDO::PARAM_INT);
        			$stm->bindValue(10, $idapto, PDO::PARAM_INT);
    				$stm->execute();
    			endif;


	}

?>