<?php
    class controller_search {
        function sexo() {
            echo json_encode("hola");
        }
        function categoria() {
            if(empty($_POST['sexo'])){
                echo json_encode(common::load_model('search_model', 'get_categoria'));
            }else{
                echo json_encode(common::load_model('search_model', 'get_sexo_categoria', [$_POST['sexo'], $_POST['categoria']}));
            }
        }
        function autocomplete() {
            if (!empty($_POST['sexo']) && empty($_POST['categoria'])){
                echo json_encode(common::load_model('search_model', 'get_auto_sexo', [$_POST['sexo'], $_POST['complete']]));
            }else if(empty($_POST['sexo']) && !empty($_POST['categoria'])){
                echo json_encode(common::load_model('search_model', 'get_auto_categoria', [$_POST['categoria'], $_POST['complete']]));
            }else if(!empty($_POST['sexo']) && !empty($_POST['categoria'])){
                echo json_encode(common::load_model('search_model', 'get_auto_sexo_categoria', [$_POST['sexo'], $_POST['categoria'], $_POST['complete']]));
            }else {
                echo json_encode(common::load_model('search_model', 'get_auto', $_POST['complete']));
            }
        }
    }
?>
                      