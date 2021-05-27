function load_sexo(){
    $.ajax({
        url: friendlyURL('?page=search&op=sexo'),
        type: 'POST',
        dataType: 'JSON'
    }).done(function(data) {
        console.log(data);
        for (row in data) {
            $('#sexo').append('<option value = "' + data[row].color + '">' + data[row].color + '</option>');
        }
    }).fail(function() {
        console.log("Fail load sexo");
    });
}

function load_categoria(data = undefined){
    $.ajax({
        url: friendlyURL("?page=search&op=categoria"),
        type: "POST",
        dataType: "json",
        data: data
    }).done(function(data) {
        $('#categoria').empty();
        $('#categoria').append('<option value = "0">Categoria</option>');
        for (row in data) {
            $('#categoria').append('<option value = "' + data[row].categoria + '">' + data[row].categoria + '</option>');
        }
    }).fail(function() {
        console.log('Fail load categoria');
    }); 
}

function launch_search() {
    load_sexo();
    load_categoria();
    $('#sexo').on('change', function(){
        let color = $(this).val();
        if (color === 0) {
            load_categoria();
        }else {
            load_categoria({sexo: color});
        }
    });
}

function autocomplete(){

    $("#autocom").on("keyup", function () {
    
        let sdata = {complete: $(this).val()};
        if (($('#sexo').val() != 0)){
            sdata.sexo = $('#sexo').val();
            if(($('#sexo').val() != 0) && ($('#categoria').val() != 0)){
                sdata.categoria = $('#categoria').val();
             }
        }
        if(($('#sexo').val() == 0) && ($('#categoria').val() != 0)){ 
            sdata.categoria = $('#categoria').val();
        }
            
        $.ajax({
            url: friendlyURL('?page=search&op=autocomplete'),
            type: 'POST',
            data: sdata,
            dataType: 'JSON'
        }).done(function(data) {
            $('#searchAuto').empty();
            $('#searchAuto').fadeIn(10000000);
                for (row in data) {
                    $('<div></div>').appendTo('#search_auto').html(data[row].nombre).attr({'class': 'searchElement', 'id': data[row].nombre});
                }
            $(document).on('click', '.searchElement', function() {
                $('#autocom').val(this.getAttribute('id'));
                $('#search_auto').fadeOut(1000);
            });
            $(document).on('click scroll', function(event) {
                if (event.target.id !== 'autocom') {
                    $('#search_auto').fadeOut(1000);
                }
            });
        }).fail(function() {
            $('#search_auto').fadeOut(500);
        });
        
    });

}

function btn_search() {
    $('#search-btn').on('click', function() {
           
        var search = [];

        if(($('#sexo').val() == 0) && ($('#categoria').val() == 0)){
            if($('#autocom').val() != ""){
                search.push({"nombre":[$('#autocom').val()]});
            }
        }else if(($('#sexo').val() != 0) && ($('#categoria').val() == 0)){
            if($('#autocom').val() != ""){
                search.push({"nombre":[$('#autocom').val()]});
            }
            search.push({"color":[$('#sexo').val()]});
        }else if(($('#sexo').val() == 0) && ($('#categoria').val() != 0)){
            if($('#autocom').val() != ""){
                search.push({"nombre":[$('#autocom').val()]});
            }
            search.push({"categoria":[$('#categoria').val()]});
        }else{
            if($('#autocom').val() != ""){
                search.push({"nombre":[$('#autocom').val()]});
            }
            search.push({"color":[$('#sexo').val()]});
            search.push({"categoria":[$('#categoria').val()]});
        }
        
        //console.log(search);
        localStorage.removeItem('filters');
        if(search.length != 0){
            localStorage.setItem('filters', JSON.stringify(search));
        }
        window.location.href = friendlyURL('?page=shop&op=view');

    });
}

$(document).ready(function() {
    launch_search();
    autocomplete();
    btn_search();
});