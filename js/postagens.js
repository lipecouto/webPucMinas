// JavaScript Document
$(document).ready(function()
{
    atualizarLista();
});

//Listagem da página
function atualizarLista(){
    
    //Coloca o GIF de carregando na pagina
    //$('#carregar').css('display','block');
    
    //Inicia uma requisição assíncrona
    $.ajax({
        //Tipo de dado que vai retornar
        dataType: 'json',
        //URL do serviço passando por GET no nome do serviço usado
        url: 'service.php?acao=listarpost',
        //Se retornar um código 200 de sucesso
        success: function success(data) {
            console.log("cccc");
            //Remover o carregamento
            //$('#carregar').css('display','none');
            
            //Limpar tabela
            $('#post_table').empty();               
            
            //Varrer a lista de dados que veio no json
            $.each(data.listagem, function (index, value) {

                //Colocar no HTML o dados usando o tempalte ITEMLISTA
                $('#post_table').append(itemLista(value.id_u,value.nome,value.raca));

            });
        }
    });
}

//Template de Listagem
function itemLista(id,nome,raca){
    //Formata o HTML de cada registro da tabela 
    return "<tr><td>"+id+"</td><td>"+nome+"</td><td>"+raca+"</td></tr>";
}