<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class orderService extends CI_Controller {

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
    public function orderService()
    {
        header('Access-Control-Allow-Origin: *');
        $job=$this->input->post('job');
        $state=$this->input->post('State');
        $district=$this->input->post('District');
        $taluk=$this->input->post('Taluk');

        $sql = "SELECT * FROM `service_add` where job_type like ? and taluk like ? and district like ? and state like ? limit 10";
        $query = $this->db->query($sql, array("'%$job%'","'%$taluk%'","'%$district%'","'%$state%'"));
        echo json_encode($query->result());


        //$query = $this->db->query($sql, array($this->input->post('name',$this->input->post('email'),$this->input->post('password'),$this->input->post('pincode'),$this->input->post('mob_no'),$this->input->post('gender'))));
    }
}
