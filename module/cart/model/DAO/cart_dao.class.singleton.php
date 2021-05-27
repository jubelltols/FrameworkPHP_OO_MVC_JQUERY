<?php
    class cart_dao{
        static $_instance;
        
        private function __construct() {
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function select_product($db, $user, $id){
            $sql = "SELECT * FROM cart WHERE user='$user' AND codigo_producto='$id'";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function insert_product($db, $user, $id){
            $sql = "INSERT INTO cart (user, codigo_producto, qty) VALUES ('$user','$id', '1')";
            $stmt = $db->ejecutar($sql);
            return "insert";
        }

        public function update_product($db, $user, $id){
            $sql = "UPDATE cart SET qty = qty+1 WHERE user='$user' AND codigo_producto='$id'";
            $stmt = $db->ejecutar($sql);
            return "update";
        }

        public function select_user_cart($db, $user){
            $sql = "SELECT p.codigo_producto, p.nombre, p.precio, p.images, p.talla, c.qty FROM cart c, producto p WHERE c.codigo_producto=p.codigo_producto AND user='$user'";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function delete_cart($db, $user, $id){
            $sql = "DELETE FROM cart WHERE user='$user' AND codigo_producto='$id'";
            $stmt = $db->ejecutar($sql);
            return "delete";
        }

        public function update_qty($db, $user, $id, $qty){
            $sql = "UPDATE cart SET qty = $qty WHERE user='$user' AND codigo_producto='$id'";
            $stmt = $db->ejecutar($sql);
            return "update_qty";
        }

        public function checkout($db, $data, $user){
            $name = md5($user);
            $date = date("Ymd");
            foreach($data as $fila){
                $cod_ped = $user;
                $cod_prod = $fila["codigo_producto"];
                $talla = $fila["talla"];
                $cantidad = $fila["qty"];
                $precio = $fila["precio"];
                $total_precio = $fila["precio"]*$fila["qty"];

                $sql = "INSERT INTO `pedidos`(`cod_ped`, `user`, `cod_prod`, `talla`, `cantidad`, `precio`, `total_precio`, `fecha`) 
                        VALUES ('$cod_ped','$user','$cod_prod','$talla','$cantidad','$precio','$total_precio','$date')";
                $stmt = $db->ejecutar($sql);
                    
            }
            return "checkout";
        }
    }
?>