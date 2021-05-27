function load_filters() {

/*     var expanded = true;

    $(document).on('click','.selectBox',function () {
      
        var checkboxes = document.getElementById("checkboxes");
          if (!expanded) {
            checkboxes.style.display = "block";
            expanded = true;
          } else {
            checkboxes.style.display = "none";
            expanded = false;
          }

    });   */

    $.ajax({
        type: "POST",
        dataType: "json",
        url: friendlyURL("?page=shop&op=filters")
    })
    .done(function( data ) {
        if(data.length==0){
            $(".shop__details").empty();
            $(".filters__container").append('<div><h3>Su búsqueda no dió resultados.</h3></div>');
        }else{
            $(".shop__details").empty();
            for (row in data) {
                $('<label></label>').attr({'class': 'filters__title'}).appendTo('.filters__content')
                .html(row.toUpperCase());
                for (row_inner in data[row]) {
                    $('<div></div>').attr({'class': 'filters__input'}).appendTo('.filters__content')
                    .html("<input class='check' type='checkbox' id="+ row +" name="+ data[row][row_inner][row] +" value='"+ data[row][row_inner][row] +"'/>" +
                    "<label for='talla' value='"+ data[row][row_inner][row] +"'>"+ data[row][row_inner][row] +"</label>");                  
                }
            }
            $(".filters__container").append(
                "<div class='filters__input'><input class='but  ton' name='Submit' type='button' id='filter' value='Filtrar' onclick='filters()'/></div>"+
                "</div></form>"
            ) 
        }
        load_list_products();
    })
    .fail(function( textStatus ) {
        if ( console && console.log ) {
            console.log( "La solicitud ha fallado: " +  textStatus);
        }
    });    

}

function filters(){

    var talla = [];
    var color = [];
    var categoria = [];
    var filters = [];
    
    localStorage.removeItem('filters');
    
    $.each($("input[id='talla']:checked"), function(){            
        talla.push($(this).val());
    });
    if(talla.length != 0){
        filters.push({"talla":talla});
    }

    $.each($("input[id='color']:checked"), function(){            
        color.push($(this).val());
    });
    if(color.length != 0){
        filters.push({"color":color});
    }

    $.each($("input[id='categoria']:checked"), function(){            
        categoria.push($(this).val());
    });
    
    if(categoria.length != 0){
        filters.push({"categoria":categoria});
    }

    if(filters.length != 0){
        localStorage.setItem('filters', JSON.stringify(filters));
    }

    document.filter.submit();
    document.filter.action=friendlyURL("?page=shop&op=view");
}

function load_list_products(items_page = 12, total_prod = 0) {
    
    var filters = localStorage.getItem('filters') || false;
   
    if (filters != false) {
        var url = friendlyURL("?page=shop&op=list_filters_products");
        if ($('#remove-filters').length == 0) {
            $('<button></button>').attr({'class':'button', 'id': 'remove-filters'}).appendTo('.filter-content').html('Remove filters');
        }
    }else {
        $('#remove-filters').remove();
        var url = friendlyURL("?page=shop&op=list_products");
    }

    $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: {items_page: items_page, total_prod: total_prod, filters: filters}
    })
    .done(function( data ) {
        console.log(data);
        if(data.length==0){
            $('#list_product').empty();
            $(".shop__details").empty();
            $("#list_product").append('<div><h3>Su búsqueda no dió resultados.</h3></div>');
        }else{
            $('#list_product').empty();
            $(".shop__details").empty();
            for (row in data) {
                $("#list_product").append(
                    "<div class='list__product' id='"+ data[row].codigo_producto +"'> <div class='list__heart' id='"+ data[row].codigo_producto +"'> <i id='like' class='bx bx-heart'> </i> </div>"+
                    "<div class='list__imges' id='"+ data[row].codigo_producto +"'> <img class='list__img' src='http://localhost/FrameworkPHP_OO_MVC_JQUERY/"+ data[row].images +"'> </div>" +
                    "<div class='list__data' id='#'> <div class='list__brand'> <div>"+ data[row].nombre +"</div>" +
                    "<div class='list__price'>"+ data[row].precio +"</div> </div>" +
                    "<div class='list__descriptionc'> <div>"+ data[row].codigo_producto +"</div> </div> </div> </div>"
                )   
            }
        }  
        load_like();
        click_like();
    })
    .fail(function( textStatus, data ) {
        console.log(data);
        if ( console && console.log ) {
            console.log( "La solicitud ha fallado: " +  textStatus);
        }
    });    
}

function load_pagination(){

    var filters = localStorage.getItem('filters') || false;

    if (localStorage.getItem('filters')) {
        var url = friendlyURL("?page=shop&op=pagination_filters");
    }else {
        var url = friendlyURL("?page=shop&op=pagination");
    }

    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        data: {filters: filters}
    }).done(function(data) {
        var total_pages = 0;
        var total_prod = data[0].n_prod;

        if(total_prod >= 12){
            total_pages = total_prod % 12;
        }else{
            total_pages = 1;
        }

        $('#pagination').bootpag({
            total: total_pages,
            page: 1,
            maxVisible: total_pages
        }).on('page', function(event, num){
            total_prod = 12 * (num - 1);
            load_list_products(12, total_prod);
            $('html, body').animate({scrollTop: $(".list__content")});
        });

    }).fail(function() {
        console.log('Fail count');
    }); 

}

function click_details() {
    $(document).on('click','.list__imges',function () {
        console.log(this.getAttribute('id'));
        localStorage.setItem('details', true);
        localStorage.setItem('codigo_producto',  $(this).attr('id'))
        location.reload();
    });
}

function load_details() {

    ajaxPromise(friendlyURL("?page=shop&op=details"), 'GET', 'JSON', {id: localStorage.getItem('codigo_producto')})
    .then(function(data) { 
        $.ajax({
            type: "POST",
            data: {id: data[0].codigo_producto},
            url: friendlyURL("?page=shop&op=most_visit")
        })
        .done(function( ) {
            console.log("Views updated");
        })
        .fail(function( ) {
            console.log('Error views updated');
        });    

        $('.list__content').empty();
        $('.filters__container').empty();
        $(".shop__details").append(
            "<div class='container py-xl-5 py-lg-3'> <div class='row'> <div class='col-lg-6 left-wthree-img text-right'> <img src='http://localhost/website/" + data[0].images +
            "' alt='' class='img-fluid mt-5'/> <div class='list__heart' id='"+ data[0].codigo_producto +"'> <i id='like' class='bx bx-heart'> </i> </div> </div> <div class='col-lg-6 about-right-faq'> </br> </br> </br> </br> <h3 class='text-da'>" + data[0].nombre +
            "</h3> <ul class='w3l-right-book mt-4'> <li>Codigo producto: " + data[0].codigo_producto + " </li> <li>Nombre: " + data[0].nombre + " </li> <li>Precio: " + data[0].precio +
            " </li> <li>Talla: " + data[0].talla + " </li> <li>Color: " + data[0].color + " </li> <li>Descripcion: " + data[0].descripcion +
            " </li> </ul>  <button id='"+ data[0].codigo_producto +"' class='button' onclick='add_cart()'>Add To Cart</button>" + 
            " <a href='index.php?page=shop&op=view' class='btn button-style button-style-2 mt-sm-5 mt-4'>Volver</a> </div> </div> </div>"
        ); 
        load_api();
    }).catch(function() {
        //window.location.href = 'index.php?page=error503'
    });  

}

function load_like(){
    if(localStorage.getItem('token') == null){
        var local = localStorage.getItem('likes');
        if(local != null){
            var like = JSON.parse(local);
        }else{
            var like = [];
        }
        like.forEach(load);
        function load(item, index){
            if($("div.list__heart#"+item).children("i").hasClass("bx-heart")){
                $("div.list__heart#"+item).children("i").removeClass("bx-heart").addClass("bxs-heart");
                console.log("item");
            }
        }
    }else{  
        ajaxPromise(friendlyURL("?page=shop&op=load_like"), 'GET', 'JSON', {user: localStorage.getItem('token')})
        .then(function(data) { 
            console.log(data);
            for (row in data) {
                if($("div.list__heart#"+data[row].codigo_producto).children("i").hasClass("bx-heart")){
                        $("div.list__heart#"+data[row].codigo_producto).children("i").removeClass("bx-heart").addClass("bxs-heart");
                }
            }
        }).catch(function() {
            //window.location.href = 'index.php?page=error503'
        });   
    }
}

function click_like(){
    $(document).on('click','.list__heart',function () {
        if(localStorage.getItem('token') == undefined){
            if($(this).children("i").hasClass("bx-heart")){
                $(this).children("i").removeClass("bx-heart").addClass("bxs-heart");
                like_storage(this.getAttribute('id'), like);
            }else{
                $(this).children("i").removeClass("bxs-heart").addClass("bx-heart");
                like_storage(this.getAttribute('id'), like);
            }
        }else{
            ajaxPromise(friendlyURL("?page=shop&op=click_like"), 'GET', 'JSON', {id: this.getAttribute('id'), user: localStorage.getItem('token')})
            .then(function(data) { 
                console.log(data);
            }).catch(function(data) {
                console.log(data);
                //window.location.href = 'index.php?page=error503'
            });  

            if($(this).children("i").hasClass("bx-heart")){
                $(this).children("i").removeClass("bx-heart").addClass("bxs-heart");
            }else{
                $(this).children("i").removeClass("bxs-heart").addClass("bx-heart");
            }
        }
    });
}

function like_storage(id){

    var local = localStorage.getItem('likes');
    if(local != null){
        var like = JSON.parse(local);
    }else{
        var like = [];
    }

    if(like.indexOf(id) === -1){
        like.push(id);
    }else if(like.indexOf(id) !== -1){
        like.splice(like.indexOf(id),1);
    } 
   
    localStorage.setItem('likes', JSON.stringify(like));
    console.log(localStorage.getItem('likes'));

}

function load_api() {
    var cont = 0;
    var url = "https://www.googleapis.com/books/v1/volumes?q=subject:sneakers";
    
    ajaxPromise(url, 'GET', 'JSON')
    .then(function(result){
        $('<div></div>').attr('class',"book__title").appendTo(".shop__details").html("<h3>Libros remondados: </h3>");
        $('<div></div>').attr('class',"cat").appendTo(".shop__details");
            for (row in result.items) {
                if(cont < 5){
                    $('<div></div>').attr('class',"services__content").appendTo(".cat").html( 
                        "<img src='"+ result.items[row].volumeInfo.imageLinks.smallThumbnail +"' alt='' class='services__img' id='"+ result.items[row].volumeInfo.title +"'>"+        
                        "<h3 class='services__title'>"+ result.items[row].volumeInfo.title +"</h3>"
                    )
                }
                cont++;
            }
    })
    .catch(function(result){
        console.log("error api");
    });   
}

function loadContent(){ 
    if (localStorage.getItem('details') == "true") {
        localStorage.setItem('details', "false");
        load_details(); 
    }else {
        load_filters();
        load_pagination();
        click_details();
    }
}

$(document).ready(function() {
    loadContent();
});
