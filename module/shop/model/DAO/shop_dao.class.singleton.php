<?php
    class shop_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function select_filters($db) {
            $array_filters = array('talla' , 'color', 'categoria');
            $array_return = array();
            foreach ($array_filters as $row) {
                $sql = 'SELECT DISTINCT ' . $row . ' FROM producto';
                $stmt = $db->ejecutar($sql);
                if (mysqli_num_rows($stmt) > 0) {
                    while ($row_inner[] = mysqli_fetch_assoc($stmt)) {
                        $array_return[$row] = $row_inner;
                    }
                    unset($row_inner);
                }
            }
            return $array_return;
        }

        public function sql_query($filters){
            $continue = "";
            $count = 0;
            $count1 = 0;
            $count3 = 0;
            $where = ' WHERE ';
            foreach ($filters as $key => $row) {
                foreach ( $row as $key => $row_inner) {
                    if ($count == 0) {
                            foreach ( $row_inner as $value) {
                                if ($count1 == 0) {
                                    $continue = $key . ' IN ("'. $value . '"';
                                }else {
                                    $continue = $continue  . ', "' . $value . '"';
                                }
                                $count1++;
                            }
                            $continue = $continue . ')';
                    }else {
                            foreach ($row_inner as $value)  {
                                if ($count2 == 0) {
                                    $continue = ' AND ' . $key . ' IN ("' . $value . '"';
                                }else {
                                    $continue = $continue . ', "' . $value . '"';
                                }
                                $count2++;
                            }
                            $continue = $continue . ')';
                        
                    }
                }
                $count++;
                $count2 = 0;
                $where = $where . $continue;
            }
            return $where;
        }

        public function select_list_products($db, $items_page, $total_prod) {
            $sql = "SELECT codigo_producto, nombre, precio, images FROM producto ORDER BY likes DESC LIMIT $total_prod, $items_page ";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_list_filters_products($db, $items_page, $total_prod, $query) {
            $filters = self::sql_query($query);
            $sql = "SELECT codigo_producto, nombre, precio, images FROM producto $filters ORDER BY likes DESC LIMIT $total_prod, $items_page ";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_pagination($db){
            $sql = "SELECT COUNT(*) AS n_prod FROM producto";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_pagination_filters($db, $query){
            $filters = self::sql_query($query);
            $sql = "SELECT COUNT(*) AS n_prod FROM producto $filters";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_filters_pagination($db, $filters){
            $sql = "SELECT COUNT(*) AS n_prod FROM producto $filters";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_details($db, $id){
            $sql = "SELECT codigo_producto, nombre, precio, talla, color, descripcion, images FROM `producto` WHERE codigo_producto = '$id'";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function update_most_visit($db, $id){
            $sql = "UPDATE producto SET likes = likes + 1 WHERE codigo_producto = '$id'";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_load_likes($db, $user){
            $sql = "SELECT codigo_producto FROM `likes` WHERE user='$user'";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_likes($db, $id, $user){
            $sql = "SELECT user, codigo_producto FROM `likes` WHERE user='$user' AND codigo_producto='$id'";
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function insert_likes($db, $id, $user){
            $sql = "INSERT INTO likes (user, codigo_producto) VALUES ('$user','$id')";
            $stmt = $db->ejecutar($sql);
            return "like";
        }

        function delete_likes($db, $id, $user){
            $sql = "DELETE FROM `likes` WHERE user='$user' AND codigo_producto='$id'";
            $stmt = $db->ejecutar($sql);
            return "unlike";
        }
    }

