<?php
	class search_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = search_dao::getInstance();
			$this->db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_sexo_BLL() {
			return $this -> dao -> select_sexo($this->db);
		}

		public function get_categoria_BLL() {
			return $this -> dao -> select_categoria($this->db);
		}

        public function get_sexo_categoria_BLL($args) {
			return $this -> dao -> select_sexo_categoria($this->db, $args[0], $args[1]);
		}

		public function get_auto_sexo_BLL($args) {
			return $this -> dao -> select_auto_sexo($this->db, $args[0], $args[1]);
		}

        public function get_auto_categoria_BLL($args) {
			return $this -> dao -> select_auto_categoria($this->db, $args[0], $args[1]);
		}

        public function get_auto_sexo_categoria_BLL($args) {
			return $this -> dao -> select_auto_sexo_categoria($this->db, $args[0], $args[1], $args[2]);
		}

        public function get_auto_BLL($args) {
			return $this -> dao -> select_auto($this->db, $args);
		}
		
	}
?>