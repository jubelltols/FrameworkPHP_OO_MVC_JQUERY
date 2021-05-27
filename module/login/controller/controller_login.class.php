<?php

    class controller_login {
         function view() {
            common::load_view('top_page_login.php', VIEW_PATH_LOGIN . 'login.html');
        }
    
        function login() {
            echo json_encode(common::load_model('login_model', 'get_login', [$_POST['username'], $_POST['password']]));
        }

        function social_login() {
            echo json_encode(common::load_model('login_model', 'get_social_login', $_POST['profile']));
        } 
    
        function register() {
            $result = json_encode(common::load_model('login_model', 'get_register', [$_POST['username'], $_POST['email'],  $_POST['password']]));
            if($result){
                $message = [ 'type' => 'validate', 
                                'token' => $result, 
                                'toEmail' => $_POST['email']];
                $email = json_decode(mail::send_email($message), true);
				if (!empty($email)) {
					echo json_encode($email); 
                    echo json_encode($result);
					return;  
				 }   
            }else{
                echo json_encode('fail');
                return;
            }
        }

        function verify_email() {
            $verify = json_encode(common::load_model('login_model', 'get_verify_email', $_POST['token']));
            if (!empty($verify)) {
                return;
            }
        }

        function send_recover_email() {
            $result = json_encode(common::load_model('login_model', 'get_recover_email', $_POST['email']));
            if($result){
                $message = ['type' => 'recover', 
                            'token' => $result, 
                            'toEmail' => $_POST['email']];
                $email = json_decode(mail::send_email($message), true);
				if (!empty($email)) {
					echo json_encode($email); 
                    echo json_encode($result);
					return;  
				}   
            }else{
                echo json_encode('fail');
                return;
            }
        }

        function verify_token() {
            $verify = json_encode(common::load_model('login_model', 'get_verify_token', $_POST['token']));
            if (!empty($verify)) {
                echo $verify;
                return;
            }
        }

        function new_password() {
            $password = json_encode(common::load_model('login_model', 'get_new_password', [$_POST['token'], $_POST['password']]));
            if (!empty($password)) {
                echo $password;
                return;
            }
        }  
    
        function logout() {
            echo json_encode('Done');
        } 

        function data_user() {
            echo json_encode(common::load_model('login_model', 'get_data_user', $_POST['token']));
        } 
    
    }
    
?>