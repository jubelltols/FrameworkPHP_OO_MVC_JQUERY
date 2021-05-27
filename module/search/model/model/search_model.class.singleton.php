<?php
    
    class search_model {
        private $bll;
        static $_instance;
        
        function __construct() {
            $this -> bll = search_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_sexo() {
            return $this -> bll -> get_sexo_BLL();
        }

        public function get_categoria() {
            return $this -> bll -> get_categoria_BLL();
        }

        public function get_sexo_categoria($args) {
            return $this -> bll -> get_sexo_categoria_BLL($args);
        }

        public function get_auto_sexo($args) {
            return $this -> bll -> get_auto_sexo_BLL($args);
        }

        public function get_auto_categoria($args) {
            return $this -> bll -> get_auto_categoria_BLL($args);
        }

        public function get_auto_sexo_categoria($args) {
            return $this -> bll -> get_auto_sexo_categoria_BLL($args);
        }

        public function get_auto($args) {
            return $this -> bll -> get_auto_BLL($args);
        }

    }