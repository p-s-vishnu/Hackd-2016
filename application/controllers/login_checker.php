<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class login_checker extends CI_Controller {

    /**
     * Index Page for this controller.
     *
     * Maps to the following URL
     * 		http://example.com/index.php/welcome
     *	- or -
     * 		http://example.com/index.php/welcome/index
     *	- or -
     * Since this controller is set as the default controller in
     * config/routes.php, it's displayed at http://example.com/
     *
     * So any other public methods not prefixed with an underscore will
     * map to /index.php/welcome/<method_name>
     * @see https://codeigniter.com/user_guide/general/urls.html
     */
    public function index()
    {
        echo "Welcome to login page";
    }
    public function signup()
    {
        header('Access-Control-Allow-Origin: *');
        $name=$this->input->post('fulname');
        $email=$this->input->post('email');
        $password=$this->input->post('password');
        $pincode=$this->input->post('pincode');
        $mob_no=$this->input->post('phno');
        $gender=$this->input->post('gender');
        $dob=$this->input->post('dob');

        $sql = "INSERT INTO `prof_details` (`id`, `name`, `dob`, `email`, `password`, `pincode`, `mobile_no`, `gender`, `date`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, now())";
        $query = $this->db->query($sql, array($name,$dob,$email,$password,$pincode,$mob_no,$gender));
        if($this->db->insert_id()!=null) {
            $sql = "insert into  prof_cookie_cache VALUES(?,?,now())";
            $rnd=rand(90000,999999);
            $query = $this->db->query($sql, array($this->db->insert_id(), $rnd));
            echo json_encode($rnd);
        }else{
            echo json_encode("");
        }

        //$query = $this->db->query($sql, array($this->input->post('name',$this->input->post('email'),$this->input->post('password'),$this->input->post('pincode'),$this->input->post('mob_no'),$this->input->post('gender'))));
    }
    public function login($email,$password)
    {
        header('Access-Control-Allow-Origin: *');
        $sql = "SELECT * FROM prof_details WHERE email= ? and password= ?";
        $query = $this->db->query($sql, array($email,$password));


        $sql = "insert into  prof_details ('',?,?,?,?,?,?,now())";
        $query = $this->db->query($sql, array($name,$email,$password,$pincode,$mob_no,$gender));
        echo json_encode($query->result());
    }
}
