<?php
    class controller_shop {

        function view() {
            common::load_view('top_page_shop.php', VIEW_PATH_SHOP . 'shop.html');
        }

        function filters() {
            echo json_encode(common::load_model('shop_model', 'get_filters'));
        }

        function list_products() {
            echo json_encode(common::load_model('shop_model', 'get_list_products', [$_POST['items_page'], $_POST['total_prod']]));
        }

        function list_filters_products() {
            echo json_encode(common::load_model('shop_model', 'get_list_filters_products', [$_POST['items_page'], $_POST['total_prod'], $_POST['filters']]));
        }

        function pagination() {
            echo json_encode(common::load_model('shop_model', 'get_pagination'));
        }

        function pagination_filters() {
            echo json_encode(common::load_model('shop_model', 'get_pagination_filters', $_POST['filters']));
        }

        function details() {
            echo json_encode(common::load_model('shop_model', 'get_details', $_GET['id']));
        }

        function most_visit() {
            echo json_encode(common::load_model('shop_model', 'get_most_visit', $_POST['id']));
        }

        function load_like() {
            echo json_encode(common::load_model('shop_model', 'get_load_like', $_GET['user']));
        }

        function click_like() {
            echo json_encode(common::load_model('shop_model', 'get_click_like', [$_GET['id'], $_GET['user']]));
        }

        function insert_cart() {
            echo json_encode(common::load_model('shop_model', 'get_insert_cart', [$_POST['user'], $_POST['id']]));
        }
    }
?>
