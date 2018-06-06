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
                         closeNav();
                         $("#alerta").css("display", "none"); 
                         $("#userPass2").change(function(event){
                            var passVal = $("#userPass2").val()
                            var pass = $("#userPass").val()
                            passAtivo(pass, passVal);
                         });
                    });
                    
                });

                $("#newOrder").click(function(){
                    $("#lowbody").load("CadastrarContaPagar-min.html");
                    closeNav();
                });

                $("#postMsg").click(function(){
                    $("#lowbody").load("CadastrarPostagens-min.html");
                    closeNav();
                });

                $("#posts").click(function(){
                    $("#lowbody").load("Postagens-min.html");
                    closeNav();
                });

                $("#users").click(function(){
                    $("#lowbody").load("Usuarios-min.html", function(event){
                       closeNav();
                       listaUsers();
                    });    
                });

                $("#listUsers").click(function(){
                     alert("entrou na funcao do botao");
                    $("#lowbody").load("Usuarios-min.html", function(event){
                       alert("tudo certo");
                    });
                });
                //aboutus
                $("#aboutus").click(function(){
                    $("#lowbody").load("Sobre.html");
                    closeNav();
                });
            });


            $("#closeNav").on("click", function (event) {
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
        var emailUsu = $("#userEmail").val();
        var telefone = $("#userTel").val();

        usuario = {
            Nome: $("#fullname").val(),
            CPF:  $("#personid").val(),
            Login: $("#userLogin").val(),
            Senha: $("#userPass").val(),
            Email:  $("#userEmail").val(),
            Telefone: $("#userTel").val() 
        }; 
        enviar(usuario);
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
function enviar(user){
        $.ajax({
            type: "POST",
            url: "http://apicondominio.azurewebsites.net/api/usuario/PostUsuario",
            dataType: "json",
            success: function(data){
                alert(data.msg+"msg teste 1");
            }, 
            data: user          
        }) 
} 

function listaUsers(){
    $.ajax({
        type: "GET",
        url: "http://apicondominio.azurewebsites.net/api/usuario",
        contentType: "application/json; charset=utf-8",
        data: "{}",
        dataType: "json",
        success: function(data) { SucessCallback(data.d); },
        error: function(data) { FailureCallBack(data); }
    });
}

function SucessCallback(result) {
            alert('Resultado: ' + result.Message + ' <br /> Descrição: ' + result.Description);
        }

function passAtivo(password, passValidate){

    if(password != passValidate){
        alert("As senhas não conferem favor verificar");
        $("#alerta").css("display","true"); 
        $("#btncadastrar").css("display","none");
    }
    else {
       $("#btncadastrar").css("display","true"); 
       $("#alerta").css("display", "none"); 
    }

}