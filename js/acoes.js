//javaScript Document

$(document).ready(function(){
    
                $("#openNav").on("click", function(event) {
                    document.getElementById("mySidenav").style.width = "250px";
                    document.getElementById("main").style.marginLeft = "250px";
                    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
                    document.getElementById("fullbody").style.backgroundColor = "rgba(0,0,0,0.4)";
                    document.getElementById("lowbody").style.backgroundColor = "rgba(0,0,0,0.4)";

                $("#addUser").click(function(){
                    $("#lowbody").load("CadastroUsuario-min.html", function(event){
                            alert("Pagina carregada");
                            passAtivo();
                    
                    });
                    closeNav();
                });

                $("#newOrder").click(function(){
                    $("#fullbody").load("CadastrarContaPagar-min.html");
                    closeNav();
                });

                $("#postMsg").click(function(){
                    $("#fullbody").load("CadastrarPostagens-min.html");
                    closeNav();
                });

                $("#posts").click(function(){
                    $("#fullbody").load("Postagens-min.html");
                    closeNav();
                });

                $("#users").click(function(){
                    $("#fullbody").load("Usuarios-min.html");
                    closeNav();
                });
                //aboutus
                $("#aboutus").click(function(){
                    $("#fullbody").load("Sobre.html");
                    closeNav();
                });
            });


            $("closeNav").on("click", function (event) {
                document.getElementById("mySidenav").style.width = "0";
                document.getElementById("main").style.marginLeft= "0";
                document.getElementById("main").style.zIndex = "-1";
                document.body.style.backgroundColor = "white";
                document.getElementById("fullbody").style.backgroundColor = "rgba(0,0,0,0)";
                document.getElementById("lowbody").style.backgroundColor = "rgba(0,0,0,0)";
            
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

function closeNav() {
 
          document.getElementById("mySidenav").style.width = "0";
 
          document.getElementById("main").style.marginLeft= "0";
 
          document.getElementById("main").style.zIndex = "-1";
 
          document.body.style.backgroundColor = "white";
 
          document.getElementById("fullbody").style.backgroundColor = "rgba(0,0,0,0)";
 
          document.getElementById("lowbody").style.backgroundColor = "rgba(0,0,0,0)";
 
        
 
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

function passAtivo(){

     alert("Teste B com sucesso");

     var passValidate =  document.getElementById("userPass2");
     var password     = document.getElementById("userPass");

     password.onchange = validatePassword(password.value, validate.value);
     passValidate.onkeyup = validatePassword(password.value, validate.value);


    if(password.value != passValidate.value){
       document.getElementById("alerta").style.display = "true"; 
    }

}