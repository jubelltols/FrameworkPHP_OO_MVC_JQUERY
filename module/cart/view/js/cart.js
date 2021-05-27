function add_cart(){
    var codigo_producto = $('.button').attr("id");
    if(localStorage.getItem('token') == null){
        setTimeout(' window.location.href = "'+friendlyURL('?page=login&op=login_view')+'"; ',1000);
    }else{
        ajaxPromise(friendlyURL("?page=cart&op=insert_cart"), 'GET', 'JSON', {user: localStorage.getItem('token'), id: codigo_producto})
        .then(function(data) { 
            console.log(data);
        }).catch(function() {
           // window.location.href = 'index.php?page=error503'
        });   
    }
}

function load_cart(){
    console.log("cart");
   
    if(localStorage.getItem('token') == null){
        //setTimeout(' window.location.href = "'+friendlyURL('?page=login&op=login_view')+'"; ',1000);
    }else{
        ajaxPromise(friendlyURL("?page=cart&op=load_cart"), 'GET', 'JSON', {user: localStorage.getItem('token')})
        .then(function(data) { 
            var total_price = 0;
            for (row in data) {
                $(".cart__products").append(
                    '<div class="basket-product" id="'+ data[row].codigo_producto +'"><div class="item"><div class="product-image">'+
                    '<img src="http://localhost/FrameworkPHP_OO_MVC_JQUERY/'+data[row].images+'" alt="Placholder Image 2" class="product-frame"></div>'+
                    '<div class="product-details"><h1 class="title__cart"><strong><span class="item-quantity">1</span></strong> '+ data[row].nombre +'</h1>'+
                    '<p class="par"><strong>Navy, Size 10</strong></p><p class="par">Product Code - '+ data[row].codigo_producto +'</p></div></div>'+
                    '<div class="price">' + data[row].precio + '</div><div class="quantity"><input id="'+ data[row].codigo_producto +'" type="number" value="' + data[row].qty + '" min="1" class="quantity-field"></div>'+
                    '<div id="'+ data[row].codigo_producto +'" class="subtotal">' + (data[row].precio)*(data[row].qty) + '</div><div class="remove"><button class="button__remove" id="'+ data[row].codigo_producto +'">Remove</button></div></div></div>'
                )   
                var total_price = total_price + (data[row].precio)*(data[row].qty);
            }    
            $(".subtotal-value").append(total_price);
            $(".total-value").append(total_price);
            //$(".cart__products").append('<a href="index.php?page=shop&op=view" class="button">Seguir comprando</a>');
           
        }).catch(function() {
            //window.location.href = 'index.php?page=error503'
        });   
    }
}

function remove_cart(){
    $(document).on('click','.button__remove',function () {
        var codigo_producto = this.getAttribute('id');
        console.log(codigo_producto);
        if(localStorage.getItem('token') == null){
            setTimeout(' window.location.href = "'+friendlyURL('?page=login&op=login_view')+'"; ',1000);
        }else{
            ajaxPromise(friendlyURL("?page=cart&op=delete_cart"), 'GET', 'JSON', {user: localStorage.getItem('token'), id: codigo_producto})
            .then(function(data) { 
                console.log(data);
                $('div.basket-product#'+ codigo_producto).empty();
            }).catch(function() {
                //window.location.href = friendlyURL('index.php?page=error503');
            });   
        }
    });
}

function change_qty(){
    $(document).on('input','.quantity-field',function () {
        var codigo_producto =  this.getAttribute('id');
        var qty = $(".quantity-field").val();
        if(localStorage.getItem('token') == null){
            setTimeout(' window.location.href = "'+friendlyURL('?page=login&op=login_view')+'"; ',1000);
        }else{
            ajaxPromise(friendlyURL("page=cart&op=update_qty"), 'GET', 'JSON', {user: localStorage.getItem('token'), id: codigo_producto, qty: qty})
            .then(function() { 
                location.reload();
            }).catch(function() {
                //window.location.href = friendlyURL('index.php?page=error503');
            });   
        }
    });
}

function checkout(){
    $(document).on('click','.checkout-cta',function () {
        if(localStorage.getItem('token') == null){
            setTimeout(' window.location.href = "'+friendlyURL('?page=login&op=login_view')+'"; ',1000);
        }else{
            ajaxPromise(friendlyURL("page=cart&op=checkout"), 'GET', 'JSON', {user: localStorage.getItem('token')})
            .then(function(data) { 
                console.log(data);
                //window.location.href = friendlyURL('index.php??page=controller_home&op=homepage');
            }).catch(function() {
                //window.location.href = friendlyURL('index.php?page=error503');
            });   
        }
    });
}

$(document).ready(function(){
    load_cart();
    remove_cart();
    change_qty();
    checkout();
});