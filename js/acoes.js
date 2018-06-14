//javaScript Document

$(document).ready(function(){

    $("#listUsers").click(function(){       
        $("#lowbody").load("Usuarios-min.html", function(){});
        });
     //esconde botao alerta
    $("#alertOK").css('display', 'none');

      //Agora carrega os dados do apartamento selecionado
    $("#getCondominio").on("change", function(event){
        var id_cond = $("#getCondominio").val();
        alert(id_cond);
        $.getJSON('/php/service.php?acao=consultaAp&idcondomio='+id_cond, function (data){
            preencheSelectAp(data);
        });
     });



     //Ações quando abrir o menu lateral
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

              //carrega  os dados dos condominios depois do load

              $.getJSON('/php/service.php?acao=consultaCondominio', function(data){
                    preencheSelectCondminio(data);
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

        $("#newSindico").click(function(){
             $("#lowbody").load("CriarVotacao-min.html", function(event){
               closeNav();
               //listaUsers();
             });    
         });

        $("#votar").click(function(){
             $("#lowbody").load("Votacao-min.html", function(event){
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

    //Ações quando fecha o menu lateral
    $("#closeNav").on("click", function (event) {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
        document.getElementById("main").style.zIndex = "-1";
        document.body.style.backgroundColor = "white";
        document.getElementById("fullbody").style.backgroundColor = "rgba(0,0,0,0)";
        document.getElementById("lowbody").style.backgroundColor = "rgba(0,0,0,0)";
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

function preencheSelectCondminio(data){
    $.each(data, function(i, item){
        $('<option>').val(item.id_condominio).text(item.razaosocial).appendTo('#getCondominio'); 
    });
    
}

function preencheSelectAp(data){
    $.each(data, function(i, item){
        $('<option>').val(item.id_condomio+"/"+item.id_bloco+"/"+item.id_apartamento).text("Bloco"+item.id_bloco+" Apto"+item.id_apartamento).appendTo('#getApartamento'); 
    });
    
}

function passAtivo(password, passValidate){

        if(password != passValidate){
            alert("As senhas não conferem favor verificar");
            $("#alerta").css("display","true");        
        }
        else {
            $("#alerta").css("display", "none"); 
        }
    }  
});