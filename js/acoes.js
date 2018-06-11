//javaScript Document

$(document).ready(function(){

     $("#listUsers").click(function(){       
        $("#lowbody").load("Usuarios-min.html", function(){});
        });
     
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
               //listaUsers();
             });    
         });

        $("#count").click(function(){
             $("#lowbody").load("Contas-min.html", function(event){
               closeNav();
               //listaUsers();
             });    
         });

        $("#fatura").click(function(){
             $("#lowbody").load("Faturas-min.html", function(event){
               closeNav();
               //listaUsers();
             });    
         });

        $("#newfatura").click(function(){
             $("#lowbody").load("CadastrarFatura-min.html", function(event){
               closeNav();
               //listaUsers();
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
    $("#btncadastrar").on("click", function(event){ //event pega todas as ações do objeto que é passado no caso #btnEnviar
       alert("Entrou na funcao enviar");
        usuario = {
            Nome: $("#fullname").val(),
            CPF:  $("#personid").val(),
            Login: $("#userLogin").val(),
            Senha: $("#userPass").val(),
            Email:  $("#userEmail").val(),
            Telefone: $("#userTel").val() 
        }; 
       alert("Agora returna "+usuario);
        $.ajax({
            type: "POST",
            url: "http://apicondominio.azurewebsites.net/api/usuario/PostUsuario",
            dataType: "json",
            data: usuario,     
            success: function(data){
                alert(data.msg+"msg teste 1");
            } 
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
    function listaUsers(){
        $.getJSON("http://apicondominio.azurewebsites.net/api/usuario/", function(data){
            console.log(data[1].Nome);
        });
    }

    function SucessCallback(result) {
        alert('Resultado: ' + result.Message + ' <br /> Descrição: ' + result.Description);
    }

    function FailureCallBack(result){
         alert(result.status + ' ' + result.statusText);
    } 

    function passAtivo(password, passValidate){

        if(password != passValidate){
            alert("As senhas não conferem favor verificar");
            $("#alerta").css("display","true"); 
            $("#btncadastrar").css("display","inline");
        }
        else {
            $("#btncadastrar").css("display","inline"); 
            $("#alerta").css("display", "none"); 
        }
    }  
});