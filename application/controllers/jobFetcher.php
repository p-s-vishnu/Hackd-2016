<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class jobFetcher extends CI_Controller {

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
    public function fetch()
    {
        header('Access-Control-Allow-Origin: *');


        $sql = "select * from job_type";
        $query = $this->db->query($sql);
        echo json_encode($query->result());

        //$query = $this->db->query($sql, array($this->input->post('name',$this->input->post('email'),$this->input->post('password'),$this->input->post('pincode'),$this->input->post('mob_no'),$this->input->post('gender'))));
    }
    public function fetchState()
    {
        header('Access-Control-Allow-Origin: *');


        $sql = "select DISTINCT state_name from pin where  state_name not like '%NA%' ORDER BY state_name";
        $query = $this->db->query($sql);
        echo json_encode($query->result());

        //$query = $this->db->query($sql, array($this->input->post('name',$this->input->post('email'),$this->input->post('password'),$this->input->post('pincode'),$this->input->post('mob_no'),$this->input->post('gender'))));
    }
    public function fetchDistrict($state)
    {
        header('Access-Control-Allow-Origin: *');


        $sql = "select DISTINCT district from pin where state_name= ?  ORDER BY district";
        $query = $this->db->query($sql, array($state));
        echo json_encode($query->result());

        //$query = $this->db->query($sql, array($this->input->post('name',$this->input->post('email'),$this->input->post('password'),$this->input->post('pincode'),$this->input->post('mob_no'),$this->input->post('gender'))));
    }
    public function fetchTaluk($state, $district)
    {
        header('Access-Control-Allow-Origin: *');


        $sql = "select DISTINCT taluk from pin where state_name= ? and district = ?  ORDER BY taluk";
        $query = $this->db->query($sql, array($state, $district));
        echo json_encode($query->result());

        //$query = $this->db->query($sql, array($this->input->post('name',$this->input->post('email'),$this->input->post('password'),$this->input->post('pincode'),$this->input->post('mob_no'),$this->input->post('gender'))));
    }
    public function addService()
    {
        header('Access-Control-Allow-Origin: *');
        $description=$this->input->post('description');
        $price=$this->input->post('price');
        $job=$this->input->post('job');
        $state=$this->input->post('State');
        $district=$this->input->post('District');
        $taluk=$this->input->post('Taluk');
        $cookieCatch=$this->input->post('cookieCatch_add_service');

        $profId = "";
        $query = $this->db->query("select * from prof_cookie_cache where rnd_no = '$cookieCatch'");
        foreach ($query->result_array() as $row)
        {
            $profId =  $row['prof_details_id'];
        }

        $sql = "INSERT INTO `service_add` (`id`, `prof_details_id`,`service_name`, `description`, `price`, `job_type`, `taluk`, `district`, `state`, `confirm`, `date`) VALUES (NULL, ?,'nurse', ?, ?, ?, ?, ?, ?, '0', now())";
        $query = $this->db->query($sql, array($profId,$description,$price,$job,$taluk,$district,$state));
        if($this->db->insert_id()!=null) {

            echo json_encode($this->db->insert_id());
        }else{
            echo json_encode("");
        }

        //$query = $this->db->query($sql, array($this->input->post('name',$this->input->post('email'),$this->input->post('password'),$this->input->post('pincode'),$this->input->post('mob_no'),$this->input->post('gender'))));
    }


    public function orderService()
    {
        header('Access-Control-Allow-Origin: *');
        $job=$this->input->post('job');
        $state=$this->input->post('State');
        $district=$this->input->post('District');
        $taluk=$this->input->post('Taluk');

        $sql = "SELECT * FROM `service_add` where job_type like ? and taluk like ? and district like ? and state like ? limit 10";
        $query = $this->db->query($sql, array($job,$taluk,$district,$state));
        echo json_encode($query->result());


        //$query = $this->db->query($sql, array($this->input->post('name',$this->input->post('email'),$this->input->post('password'),$this->input->post('pincode'),$this->input->post('mob_no'),$this->input->post('gender'))));
    }
public function profileFetcher_($id){
    header('Access-Control-Allow-Origin: *');

    $sql = "SELECT * FROM `prof_details` where id = ? limit 10";
    $query = $this->db->query($sql, array($id));
    echo json_encode($query->result());

}

public function service_fetcher_review($id){
    header('Access-Control-Allow-Origin: *');

    $query = $this->db->query("select * from `service_review` where service_id = ?", array($id));
    $txt="";
    foreach ($query->result_array() as $row)
    {
        $txt .=  $row['review_text'];
    }

    require_once __DIR__ . '\abc\autoload.php';
    $sentiment = new \PHPInsight\Sentiment();
    $scores = $sentiment->score($txt);
    echo json_encode($scores);
}
public function rateCounter(){
    header('Access-Control-Allow-Origin: *');
    require_once __DIR__ . '\abc\autoload.php';
    $sentiment = new \PHPInsight\Sentiment();
    $cmd=$this->input->post('comment');
    $cookie=$this->input->post('cookieCatch');
    $serviceId=$this->input->post('serviceId');

    $scores = $sentiment->score($cmd);
    $class = $sentiment->categorise($cmd);
    $sql = "INSERT INTO `service_review` (`service_id`, `profile_details_id`, `review_text`, `neutral`, `positive`, `negative`, `date`) VALUES (?, ?, ?, ? ,? ,?, now())";
    $query = $this->db->query($sql, array($serviceId,$cookie,$cmd,$scores['neu'],$scores['pos'],$scores['neg']));
    $aa=array("service_id"=>"$serviceId");
    array_push($scores,$aa);
    echo json_encode($scores);
}
public function save_myyorder_intodb(){
    header('Access-Control-Allow-Origin: *');
    $profid=$this->input->post('order_myy_profid');
    $serid=$this->input->post('order_myy_serviceid');
    $omserid=$this->input->post('order_myy_date');
    $dur=$this->input->post('order_myy_dur');

    $query = $this->db->query("select * from `service_add` where id = ?", array($serid));
    $price="";
    $prof_booker_id="";
    foreach ($query->result_array() as $row)
    {
        $price =  $row['price'];
        $prof_booker_id = $row['prof_details_id'];
    }
    if($price!=""){
        $price*=$dur;
    }

    $query = $this->db->query("select * from `prof_cookie_cache` where rnd_no = ?", array($profid));
    foreach ($query->result_array() as $row)
    {
        $profid =  $row['prof_details_id'];
    }


    $sql = "INSERT INTO `order_service` (`id`, `prof_id`, `service_id`, `start_date`, `duration`, `cost`, `datetime`) VALUES (NULL, ?, ?, ?, ?, ?, now())";
    $query = $this->db->query($sql, array($profid,$serid,$omserid,$dur,$price));
    $msg="You Have Got New Job Request for $"+$price +" on $omserid with a duration of $dur days";
    $sql = "INSERT INTO `notification` (`id`, `prof_details_id`, `prof_booker_id`, `msg`, `datetime`) VALUES (NULL, ?, ?, ?, now())";
    $query = $this->db->query($sql, array($profid,$prof_booker_id,$msg));
    echo json_encode($price);
}
function fetchnotification($id){
    header('Access-Control-Allow-Origin: *');

    $sql = "SELECT * FROM `notification` where prof_details_id = ?";
    $query = $this->db->query($sql, array($id));
    echo json_encode($query->result());
}




public function orderServiceIndex()
{
    header('Access-Control-Allow-Origin: *');


    $sql = "SELECT * FROM `service_add` where `id` IN (select service_id from service_review order by positive desc)";
    $query = $this->db->query($sql);
    echo json_encode($query->result());


    //$query = $this->db->query($sql, array($this->input->post('name',$this->input->post('email'),$this->input->post('password'),$this->input->post('pincode'),$this->input->post('mob_no'),$this->input->post('gender'))));
}
public function loginCheck_signIn(){
    header('Access-Control-Allow-Origin: *');
    $name=$this->input->post('name');
    $password=$this->input->post('password');
    $profid="";
    $sql = "SELECT * FROM `prof_details` where email like ? and password like ? ";
    $query = $this->db->query($sql, array($name,$password));
    echo json_encode($query->result());

    /*$a = ''; $b = '';$c='';
    foreach ($query->result() as $row)
    {
        $a =  $row['email'];
        $b =  $row['password'];
        $c = $row['id'];
    }if($name == $a && $password == $b){
        $sql = "UPDATE `prof_cookie_cache` SET rnd_no=? where prof_details_id=?";
        $rnd=rand(90000,999999);
        $query = $this->db->query($sql, array($rnd,$c));
        echo json_encode($rnd);
    }else{
        echo json_encode("");
    }
*/

}
public function loginCheck_signIn2($id){
    header('Access-Control-Allow-Origin: *');
    $query = $this->db->query("select * from prof_cookie_cache where prof_details_id = '$id'");
    echo json_encode($query->result());
}
    public function fetchAddprofile_data($id){
        header('Access-Control-Allow-Origin: *');
        $query = $this->db->query("select * from prof_details where id = (select prof_details_id from prof_cookie_cache where rnd_no= ?)",array($id));
        echo json_encode($query->result());
    }

    public function fetchwalletdet($id){
        header('Access-Control-Allow-Origin: *');
        $query = $this->db->query("select * from order_service where prof_id = (select prof_details_id from prof_cookie_cache where rnd_no= ?)",array($id));
        echo json_encode($query->result());
    }
    public function fetchwalletdet2($id){
        header('Access-Control-Allow-Origin: *');
        $query = $this->db->query("select sum(cost) as cost from order_service where prof_id = (select prof_details_id from prof_cookie_cache where rnd_no= ?)",array($id));
        echo json_encode($query->result());
    }
}