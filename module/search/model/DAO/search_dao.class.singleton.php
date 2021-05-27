<?php

    class search_dao{
        static $_instance;

        private function __construct() {
        }
    
        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }
        
        function select_sexo($db){
			$sql = "SELECT DISTINCT color FROM producto";
			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_categoria($db){
            $sql = "SELECT DISTINCT categoria FROM `producto`";
			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_sexo_categoria($db, $sexo){
            $sql = "SELECT DISTINCT categoria FROM `producto` WHERE color='$sexo'";
			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_auto_sexo($db, $auto, $sexo){
            $sql = "SELECT nombre FROM `producto` WHERE color='$sexo' AND nombre LIKE '$auto%'";
			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_auto_sexo_categoria($db, $auto, $sexo, $categoria){
            $sql = "SELECT nombre FROM `producto` WHERE color='$sexo' AND categoria='$categoria' AND nombre LIKE '$auto%'";
			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_auto_categoria($db, $auto, $categoria){
            $sql = "SELECT nombre FROM `producto` WHERE categoria='$categoria' AND nombre LIKE '$auto%'";
			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_auto($db, $auto){
            $sql = "SELECT nombre FROM `producto` WHERE nombre LIKE '$auto%'";
			$stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }
        
    }

?>