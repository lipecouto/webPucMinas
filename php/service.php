<?php
	require_once('config.php');

	if(!empty($_GET['acao'])){

		//Guardando a ação solicitada
		$acao = $_GET['acao'];


		//Chaveando para qual regra de negocio vou atuar
		switch ($acao) {
			case 'inserir':
				//busca todas as variáveis;
				$n = (isset($_POST['nome']))? $_POST['nome']: '';
				$c = (isset($_POST['cpf']))? $_POST['cpf']: '';
				$l = (isset($_POST['login']))? $_POST['login']: '';
				$s = (isset($_POST['senha']))? $_POST['senha']: '';
				$e = (isset($_POST['email']))? $_POST['email']: '';
				$tel = (isset($_POST['telefone']))? $_POST['telefone']: '';
				$tu = (isset($_POST['tipoUsuario']))? $_POST['tipoUsuario']: '';
				$dt   = (isset($_POST['dtnasc']))? $_POST['dtnasc']: '';
				$cond = (isset($_POST['idcondominio']))? $_POST['idcondominio']: '';
				$ap      = (isset($_POST['idapto']))? $_POST['idapto']: '';
				//chama a função inserir usuário
				insertUser($n, $c, $l, $s, $e, $tel, $tu, $dt, $cond, $ap);
				break;
			
			case 'consultaCondominio':
				//$resultado = $pdo->select("SELECT * FROM CONDOMINIO WHERE RAZAOSOCIAL LIKE '$parametro%' ORDER BY RAZAOSOCIAL ASC");
			    echo (getCondominio());
				break;

			case 'consultaAp':
				$cond = (isset($_POST['idcondominio']))? $_POST['idcondominio']: '';
			    getApto($cond);   
				break;

			case 'login':
			//Pegando as variaveis que estao vindo via POST e salvando em variaveis PHP
				$email = $_POST['InputEmail'];
				$senha = $_POST['InputPassword'];

				$pdo = conectar();
				$sSQL = "SELECT * FROM  USUARIO WHERE email = '".$email."' AND senha = '".$senha."'";
				$stm = $pdo->prepare($sSQL);
				$stm->execute();
				//Checando se executou com sucesso
				if ($stm->fetchColumn() > 0)
				{
					echo "ok";
				}
				else
				{
					echo "erro";
				}
				break;

			default:
				 echo "Serviço não existe";
			break;
		}
	}
	else{

		echo "Sem ação definida!";
	}

	function insertUser($nome, $cpf, $login, $senha, $email, $telefone, $tipoUsuario, $dtnasc, $idcondminio, $idapto){


		$senhacode = base64_encode($senha);
		
		if (empty($nome) || empty($email) || empty($assunto) || empty($msg)):
        	$array  = array('tipo' => 'alert alert-danger', 'mensagem' => 'Preencher todo os campos obrigatórios(*)!');
        	echo json_encode($array);
    	else:	
			$pdo = conectar();
			$insertsql = "insert into USUARIO(nome, cpf, login, senha, email, tipoUsuario, 
												 telefone, datanasc, id_condominio, id_apartamento)
							 values(?,?,?,?,?,?,?,?,?,?)";
			$stm = $pdo->prepare($insertsql);
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
    	$pdo = null;
	}

	function getCondominio(){
		try{
			$pdo = Conectar();
	    	$querysql = "SELECT razaosocial, id_condominio FROM CONDOMINIO";
	    	$exe = $pdo->prepare($querysql);
	    	$exe->execute();
	    	sleep(1); 
	    	$linha = $exe->fetchAll(PDO::FETCH_ASSOC);
	    	$json = json_encode($linha);
	    	echo ($json);
	    }
	    catch (Exception $e){
        	echo 'Erro: '.$e->getMessage();
        	return null;
    	}

    	$pdo = null;
	}

	function getApto($condominio){
		sleep(2);
		$pdo = Conectar();
    	$querysql = "SELECT id_apartamento, id_bloco FROM condominiodetalhe WHERE id_condominio =".$condominio ;
    	$exe = $pdo->prepare($querysql);
    	$exe->bindValue(1, $nomecond);
    	$exe->execute();
    	sleep(1);
    	while ($linha = $exe->fetch(PDO::FETCH_ASSOC)) {
    		echo json_encode($linha);
    	}
    	$pdo = null;
	}


?>