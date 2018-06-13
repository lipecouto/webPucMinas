//javaScript Document

$(document).ready(function(){

     $("#listUsers").click(function(){       
        $("#lowbody").load("Usuarios-min.html", function(){});
        });
     //esconde botao alerta
     $("#alertOK").css('display', 'none');

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

                //carrega  os dados dos condominios
                  $.getJSON('/php/service.php?acao=consultaCondominio', function (dados){
                   
                    if (dados.length > 0){    
                    var selectbox = $('#getCondominio');
                    selectbox.find('option').remove();
                    $.each(dados, function(i, obj){
                       $('<option').val(dados.id_condominio).text(dados.razaosocial).appendTo(options);
                        })
                    }else{
                        alert("erro");
                        Reset();
                    }
                });

                 $("#alerta").css("display", "none"); 
                 $("#userPass2").change(function(event){
                    var passVal = $("#userPass2").val()
                    var pass = $("#userPass").val()
                    passAtivo(pass, passVal);
                 });

           
            //Agora carrega os dados do apartamento selecionado
                $('#getCondominio option:selected').each(function(event){
                    var id_cond = $(this).val();
                    $.getJSON('/php/service.php?acao=consultaAp&idcondomio='+id_cond, function (dados){
                        if (dados.length > 0){    
                            var option = '<option>Selecione um Ap de acordo com seu Bloco</option>';
                            $.each(dados, function(i, obj){
                                option += '<option value="'+obj.id_apartamento+'/'+obj.id_bloco+'"> Bloco: '+obj.id_bloco+'  Apto:'+obj.id_apartamento+'</option>';
                            })
                        $('#getApartamento').html(option).show();
                     
                        }else{
                            Reset();
                            $('#alerta').html().show();
                            $('#alerta').html('<span class="mensagem">Erro!</span>');
                        }
                    });
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