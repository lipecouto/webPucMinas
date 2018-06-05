//javaScript Document

$(document).ready(function(){
    
    alert("Teste A com sucesso");
    
    $("CadastroUsuario-min.html").ready(function(){
        passAtivo;
    });
    //Enviar Dados
    $("btncadastrar").on("click", function(event){ //event pega todas as ações do objeto que é passado no caso #btnEnviar

        var nomeUsu  = $("#fullname").val();
        var cpfUsu   = $("#personid").val();
        var loginUsu = $("#userLogin").val();
        var passUsu  = $("#userPass").val();
        var passUsuValidate = $("#userPass2").val();
        var emailUsu = $("userEmail").val();
        var telefone = $("#userTel").val();

         alert("Inserido com sucesso");

         
    
    });
});

//Enviar dados por requisição assincrona
function enviar(nomeUsuer, cpfUser, loginUser, passUser, emailUser, telefoneUser){
        $.ajax({
            method: "GET",
            //url: "service.php?acao=inserir",
            url: "http://apicondominio.azurewebsites.net/api/usuario",
            data: {nome: nomeUsuer, cpf: cpfUser, login: loginUser, pass: passUser, email: emailUser, tel: telefoneUser} 
        })
        .done(function(msg){
            if(msg == "ok"){
                alert("Inserido com sucesso");
            }else{
                alert("Erro ao processar sua solicitação");
            }
        });
} 

function passAtivo(){

     var passValidate =  document.getElementById("userPass2");
     var password     = document.getElementById("userPass");

     password.onchange = validatePassword(password.value, validate.value);
     passValidate.onkeyup = validatePassword(password.value, validate.value);


    if(password.value != passValidate.value){
       document.getElementById("alerta").style.display = "true"; 
    }

}