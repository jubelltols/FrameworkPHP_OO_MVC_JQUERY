<?php
    class shop_model {
        private $bll;
        static $_instance;

        function __construct() {
            $this -> bll = shop_bll::getInstance();
        }

        public static function getInstance() {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function get_filters() {
            return $this -> bll -> get_filters_BLL();
        }

        public function get_list_products($args) {
            return $this -> bll -> get_list_products_BLL($args);
        }

        public function get_list_filters_products($args) {
            return $this -> bll -> get_list_filters_products_BLL($args);
        }

        public function get_pagination() {
            return $this -> bll -> get_pagination_BLL();
        }

        public function get_pagination_filters($args) {
            return $this -> bll -> get_pagination_filters_BLL($args);
        }

        public function get_details($args) {
            return $this -> bll -> get_details_BLL($args);
        }

        public function get_most_visit($args) {
            return $this -> bll -> get_most_visit_BLL($args);
        }

        public function get_load_like($args) {
            return $this -> bll -> get_load_like_BLL($args);
        }

        public function get_click_like($args) {
            return $this -> bll -> get_click_like_BLL($args);
        }
    }
?>
