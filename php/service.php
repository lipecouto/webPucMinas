<?php
	require_once('config.php');


	

	if(!empty($_GET['acao'])){

		//Guardando a ação solicitada
		$acao = $_GET['acao'];


		//Chaveando para qual regra de negocio vou atuar
		switch ($acao) {
			case 'inserir':
				//busca todas as variáveis;
				$n = (isset($_GET['nome']))? $_GET['nome']: '';
				$c = (isset($_GET['cpf']))? $_GET['cpf']: '';
				$l = (isset($_GET['login']))? $_GET['login']: '';
				$s = (isset($_GET['senha']))? $_GET['senha']: '';
				$e = (isset($_GET['email']))? $_GET['email']: '';
				$tel = (isset($_GET['telefone']))? $_GET['telefone']: '';
				$tu = (isset($_GET['tipoUsuario']))? $_GET['tipoUsuario']: '';
				$dt   = (isset($_GET['dtnasc']))? $_GET['dtnasc']: '';
				$cond = (isset($_GET['idcondominio']))? $_GET['idcondominio']: '';
				$ap      = (isset($_GET['idapto']))? $_GET['idapto']: '';
				//chama a função inserir usuário
				echo(insertUser($n, $c, $l, $s, $e, $tel, $tu, $dt, $cond, $ap));
				break;
			
			case 'consultaCondominio':
				//$resultado = $pdo->select("SELECT * FROM CONDOMINIO WHERE RAZAOSOCIAL LIKE '$parametro%' ORDER BY RAZAOSOCIAL ASC");
			    echo (getCondominio());
				break;

			case 'consultaAp':
				$cond = (isset($_GET['idcondominio']))? $_GET['idcondominio']: '';
				echo (getApto($cond));   
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
		
		if (empty($nome) || empty($cpf) || empty($senha) || empty($email)):
        	return "falha, campos pendentes";
    	else:	
			$pdo = conectar();
			$insertsql = "insert into USUARIO(nome, cpf, login, senha, email, tipoUsuario, 
												 telefone, datanasc, id_condominio, id_apartamento)
							 values(?,?,?,?,?,?,?,?,?,?)";
			$stm = $pdo->prepare($insertsql);
			$stm->bindValue(1, $nome);
        	$stm->bindValue(2, $cpf);
        	$stm->bindValue(3, $login);
        	$stm->bindValue(4, $senhacode);
        	$stm->bindValue(5, $email);
        	$stm->bindValue(6, $tipoUsuario);
        	$stm->bindValue(7, $telefone);
        	$stm->bindValue(8, $dtnasc);
        	$stm->bindValue(9, $idcondominio);
        	$stm->bindValue(10, $idapto);
    		$stm->execute();
    		return "ok";
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
		$pdo = Conectar();
    	$querysql = "SELECT id_apartamento, id_bloco FROM CONDOMINIODETALHE WHERE id_condominio = ?";
    	$exe = $pdo->prepare($querysql);
    	$exe->bindValue(1, $condominio);
    	$exe->execute();
    	sleep(1);
    	$linha = $exe->fetchALL(PDO::FETCH_ASSOC);
    	$json = json_encode($linha);
    	echo ($json);
    	$pdo = null;
	}
?>