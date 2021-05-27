<?php
	class cart_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = cart_dao::getInstance();
			$this->db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_insert_cart_BLL($args) {
			$jwt = jwt_process::decode($args[0]);
			$jwt = json_decode($jwt, TRUE);
			if($this -> dao -> select_product($this->db, $jwt['name'], $args[1])){
				return $this -> dao -> update_product($this->db, $jwt['name'], $args[1]);
			}else{
				return $this -> dao -> insert_product($this->db, $jwt['name'], $args[1]);
			}
		}

		public function get_load_cart_BLL($args) {
			$jwt = jwt_process::decode($args);
			$jwt = json_decode($jwt, TRUE);
			return $this -> dao -> select_user_cart($this->db, $jwt['name']);
		}

		public function get_delete_cart_BLL($args) {
			$jwt = jwt_process::decode($args[0]);
			$jwt = json_decode($jwt, TRUE);
			return $this -> dao -> delete_cart($this->db, $jwt['name'], $args[1]);
		}

		public function get_update_qty_BLL($args) {
			$jwt = jwt_process::decode($args[0]);
			$jwt = json_decode($jwt, TRUE);
			return $this -> dao -> update_qty($this->db, $jwt['name'], $args[1], $args[2]);
		}

		public function get_checkout_BLL($args) {
			$jwt = jwt_process::decode($args);
			$jwt = json_decode($jwt, TRUE);
			$data = $this -> dao -> select_user_cart($this->db, $jwt['name']);
			return $this -> dao -> checkout($this->db, $data, $jwt['name']);
		}
	}
?>