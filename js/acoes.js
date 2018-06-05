//javaScript Document

$(document).ready(function(){
    
    //Enviar Dados

    var passValidate =  document.getElementbyId("userPass2");
    var password     = document.getElementbyId("userPass");

    password.onchange = validatePassword(password.value, validate.value);
    passValidate.onkeyup = validatePassword(password.value, validate.value);


    $("#btncadastrar").on("click", function(event){ //event pega todas as ações do objeto que é passado no caso #btnEnviar

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

function validatePassword(Pass, Validade){

    if(Pass != Validate){
       document.getElementbyId("alerta").style.display = "true"; 
    }
}

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