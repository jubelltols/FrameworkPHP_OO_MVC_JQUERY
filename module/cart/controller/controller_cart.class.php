<?php

    class controller_cart {

        function view() {
            common::load_view('top_page_cart.php', VIEW_PATH_CART . 'cart.html');
        }

        function insert_cart() {
            echo json_encode(common::load_model('cart_model', 'get_insert_cart', [$_GET['user'], $_GET['id']]));
        }

        function load_cart() {
            echo json_encode(common::load_model('cart_model', 'get_load_cart', $_GET['user']));
        }

        function delete_cart() {
            echo json_encode(common::load_model('cart_model', 'get_delete_cart',[$_GET['user'], $_GET['id']]));
        }

        function update_qty() {
            echo json_encode(common::load_model('cart_model', 'get_update_qty', [$_GET['user'], $_GET['id'],$_GET['qty']]));
        }

        function checkout() {
            echo json_encode(common::load_model('cart_model', 'get_checkout', $_GET['user']));
        }

    }
    
?>
