
/*==================== AJAX PROMISE ====================*/

function ajaxPromise(sUrl, sType, sTData, sData = undefined) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: sUrl,
            type: sType,
            dataType: sTData,
            data: sData
        }).done((data) => {
            resolve(data);
        }).fail((jqXHR, textStatus, errorThrow) => {
            reject(errorThrow);
        }); 
    });
}

/*==================== FRIENDLY URL ====================*/

function friendlyURL(url) {
    var link="";
    url = url.replace("?", "");
    url = url.split("&");
    cont = 0;
    for (var i=0; i<url.length; i++) {
    	cont++;
        var aux = url[i].split("=");
        if (cont == 2) {
        	link +=  "/"+aux[1]+"/";	
        }else{
        	link +=  "/"+aux[1];
        }
    }
    return "http://localhost/FrameworkPHP_OO_MVC_JQUERY" + link;
}

/*==================== LOAD MENU ====================*/

function load_menu() {
    $('<li></li>').attr({'class' : 'nav__item'}).html('<a href="' + friendlyURL("?page=home&op=view") + '" class="nav__link">Home</a>').appendTo('.nav__list');
    $('<li></li>').attr({'class' : 'nav__item'}).html('<a href="' + friendlyURL("?page=shop&op=view") + '" class="nav__link">Shop</a>').appendTo('.nav__list');
    $('<li></li>').attr({'class' : 'nav__item'}).html('<a href="' + friendlyURL("?page=contact&op=view") + '" class="nav__link">Contact us</a>').appendTo('.nav__list');
    
    ajaxPromise(friendlyURL('?page=login&op=data_user'), 'POST', 'JSON',{token: localStorage.getItem('token')})
    .then(function(data) {
        console.log(data);
        if (data[0].type === 'admin') {
            menu_admin();
        }else if (data[0].type === 'client') {
            menu_client();
        }
    }).catch(function() {
        $('<li></li>').attr({'class' : 'nav__item'}).html('<a href="' + friendlyURL("?page=login&op=view") + '" class="nav__link">Log in</a>').appendTo('.nav__list');
        $('<li></li>').attr({'class' : 'nav__item'}).html('<a href="' + friendlyURL("?page=cart&op=view") + '" class="nav__link">Cart</a>').appendTo('.nav__list');
    });
}

/*==================== MENUS ====================*/

function menu_admin() {
    $('<li></li>').attr({'class' : 'nav__item'}).html('<a href="' + friendlyURL("?page=crud&op=view") + '" class="nav__link">Crud</a>').appendTo('.nav__list');
    $('<li></li>').attr({'class' : 'nav__item'}).html('<a href="" id="logout" class="nav__link">Log out</a>').appendTo('.nav__list');
    $('<li></li>').attr({'class' : 'nav__item'}).html('<a href="' + friendlyURL("?page=cart&op=view") + '" class="nav__link">Cart</a>').appendTo('.nav__list');
}

function menu_client() {
    $('<li></li>').attr({'class' : 'nav__item'}).html('<a href="" id="logout" class="nav__link">Log out</a>').appendTo('.nav__list');
    $('<li></li>').attr({'class' : 'nav__item'}).html('<a href="' + friendlyURL("?page=cart&op=view") + '" class="nav__link">Cart</a>').appendTo('.nav__list');
}

/*==================== CLICK LOGOUT ====================*/

function click_logout() {
    $(document).on('click', '#logout', function() {
        logout();
    });
}

/*==================== LOGOUT ====================*/

function logout() {
    $.ajax({
        url: friendlyURL('?page=login&op=logout'),
        type: 'POST',
        dataType: 'JSON'
    }).done(function(data) {
        console.log(data);
        localStorage.removeItem('token');
        window.location.href = friendlyURL("?page=home&op=view");
    }).fail(function() {
        console.log('Something has occured');
    });
}

$(document).ready(function() {
    load_menu();
    click_logout();
});