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
				$cond = (isset($_GET['idcondominio'])) ? $_GET['idcondominio']: '';
			    echo(getApto($cond));   
				break;

			case 'login':
			//Pegando as variaveis que estao vindo via POST e salvando em variaveis PHP
				$email = $_POST['InputEmail'];
				$senha = $_POST['InputPassword'];
				$senhacode = base64_encode($senha);
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
    	
    	echo($nome.'/'.$cpf.'/'.$login.'/'.$senha.'/'.$email.'/'.$telefone.'/'.$tipoUsuario.'/'.$dtnasc.'/'.$idcondminio.'/'.$idapto);
    	
    	$senhacode = base64_encode($senha);
	    
	    if (empty($nome) || empty($cpf) || empty($senha) || empty($email)):
	          return "falha, campos pendentes";
	      else:
	        try{  
		        $pdo = conectar();
		        $insertsql = "INSERT INTO USUARIO(nome, cpf, login, senha, email, tipoUsuario, 
		                           telefone, datanasc, id_condominio, id_apartamento)
		                 VALUES(?,?,?,?,?,?,?,?,?,?)";
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
	          	echo 'Sucesso';
	        }
	        catch(Exception $e){
	          	echo 'Error'.$e->getMessage();
	        	return null;
	    	}
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