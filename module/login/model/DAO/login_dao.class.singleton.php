<?php

    class login_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function insert_user($db, $username, $email, $password, $avatar, $token){
            $sql ="INSERT INTO `users`(`nombre`, `email`, `password`, `type`, `avatar`, `token_email`, `activate`, `id`)     
                               VALUES ('$username','$email','$password','client', '$avatar','$token', 0, '')";
            return $stmt = $db->ejecutar($sql);
        }
       
        public function select_user($db, $username){
			$sql = "SELECT `id`, `nombre`, `email`, `password`, `type`, `avatar`, `token_email`, `activate` FROM `users` WHERE nombre='$username'";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_social_login($db, $id){
			$sql = "SELECT * FROM `users` WHERE id='$id'";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function insert_social_login($db, $id, $username, $email, $avatar){
            $sql ="INSERT INTO `users`(`nombre`, `email`, `password`, `type`, `avatar`, `token_email`, `activate`, `id`)     
                               VALUES ('$username','$email','','client', '$avatar','', 1, '$id')";
            return $stmt = $db->ejecutar($sql);
        }

        public function update_token_jwt($db, $token, $email){
            $sql = "UPDATE `users` SET `id`= '$token' WHERE `email` = '$email'";
            $stmt = $db->ejecutar($sql);
            return "update";
        }

        public function select_verify_email($db, $token){
			$sql = "SELECT `token_email` FROM `users` WHERE `token_email` = '$token'";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        } 

        public function update_verify_email($db, $token){
            $sql = "UPDATE `users` SET `activate`= 1, `token_email`= '' WHERE `token_email` = '$token'";
            $stmt = $db->ejecutar($sql);
            return "update";
        }

        public function select_recover_password($db, $email){
			$sql = "SELECT `email` FROM `users` WHERE email='$email'";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function update_recover_password($db, $email, $token){
			$sql = "UPDATE `users` SET `token_email`= '$token' WHERE `email` = '$email'";
            $stmt = $db->ejecutar($sql);
            return "ok";
        }

        public function update_new_passwoord($db, $token, $password){
            $sql = "UPDATE `users` SET `password`= '$password', `token_email`= '' WHERE `token_email` = '$token'";
            $stmt = $db->ejecutar($sql);
            return "ok";
        }

        public function select_data_user($db, $token){
			$sql = "SELECT `id`, `nombre`, `email`, `password`, `type`, `avatar`, `token_email`, `activate` FROM `users` WHERE id=$token";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

    }

?>