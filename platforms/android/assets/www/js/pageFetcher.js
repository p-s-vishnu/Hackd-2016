
function fetchAddservice1() {
    load_url(my_web_url+"/jobFetcher/fetch",fetchAddservice1_callback);
}
function fetchAddservice1_callback(data){
    var k=document.getElementById("addService_jobType");
    document.getElementById("cookieCatch_add_service").value=getCookie("cookieCatch");
    k.innerHTML = "";
    for(i = 0 ; i< data.length; i++){
        k.innerHTML += "<option value='"+data[i].name+"' >"+data[i].name+"</option>";
    }
    fetchAddserviceState();
}
function fetchAddserviceState() {
    load_url(my_web_url+"/jobFetcher/fetchState",fetchAddserviceState_callback);
}
function fetchAddserviceState_callback(data){
    var k=document.getElementById("addService_state");
    k.innerHTML = "";
    for(i = 0 ; i< data.length; i++){
        k.innerHTML += "<option value='"+data[i].state_name+"' >"+data[i].state_name+"</option>";
    }
}
function addService_changeDistrict(){
    load_url(my_web_url+"/jobFetcher/fetchDistrict/"+document.getElementById("addService_state").value,addService_changeDistrict_callback);
}
function addService_changeDistrict_callback(data){
    var k=document.getElementById("addService_District");
    k.innerHTML = "";
    for(i = 0 ; i< data.length; i++){
        k.innerHTML += "<option value='"+data[i].district+"' >"+data[i].district+"</option>";
    }
}
function addService_changeTaluk() {
    load_url(my_web_url+"/jobFetcher/fetchTaluk/"+document.getElementById("addService_state").value+"/"+document.getElementById("addService_District").value,addService_changeTaluk_callback);
}
function addService_changeTaluk_callback(data){
    var k=document.getElementById("addService_taluk");
    k.innerHTML = "";
    for(i = 0 ; i< data.length; i++){
        k.innerHTML += "<option value='"+data[i].taluk+"'>"+data[i].taluk+"</option>";
    }
}
function saveService(){
    var formData = myApp.formToJSON('#addServiceForm');
    //alert(JSON.stringify(formData));
    load_url_json(my_web_url+"/jobFetcher/addService/",formData,saveService_callback);
}
function saveService_callback(data) {
    if(JSON.stringify(data)!='[]') {

        myApp.alert(JSON.stringify(data)+"serviceId Created");
        setTimeout(function (){location.reload();},600 );
        //myApp.alert(JSON.stringify(data));
    }else{
        myApp.alert('Error');
    }
}

/* Order Service from here */
function orderService() {
    var formData = myApp.formToJSON('#addServiceForm2');

    load_url_json(my_web_url+"/jobFetcher/orderService/",formData,orderService_callback);
}

function orderService_callback(data){//alert(JSON.stringify(data));
 for(i = 0 ; i< data.length; i++){
    profileFetcher_(data[i]);
}
}

var profileFetcher__data;
function profileFetcher_(data){
    profileFetcher__data=data;
    load_url(my_web_url+"/jobFetcher/profileFetcher_/"+data.prof_details_id,profileFetcher__callback);
}
function profileFetcher__callback(data){
    addCard_Service("mySearchOrders",profileFetcher__data.id,"img/nurse1.png",data[0].name,profileFetcher__data.job_type,profileFetcher__data.taluk+" , "+profileFetcher__data.district+" , "+profileFetcher__data.state,profileFetcher__data.state,"");
}
    //addCard_Service("mySearchOrders","img/nurse1.png","anil","21","tell me something","2250","3.5");

var review_service;
function addCard_Service(myinner_id,service_id,imageurl,prof_name,job_type,location,time,description,price,reviews){
    var myinner=document.getElementById(myinner_id);
    myinner.innerHTML+="<div class='ui stackable doubled  container'>" +
        "<div class='ui fluid card'>" +
            "<img src='"+imageurl+"'></image>" +
            "<div class='content'> " +
            "<div class='header'>"+prof_name+" </div> " +
            "<div class='meta'> <a href='#'>Job Type :"+job_type+" </a> " +
            "<p>User Location :"+location+"</p> </div> <div class='content'>"+description+"</div><div class='content' id='but_service"+service_id+"'> " +
            "<i class='red heart icon'></i> <div class='right floated'>" +
            "<a  class='item-link close-panel item-content close-popup' href='order_myy.html' >" +
            "<i class='briefcase icon'onclick='setTimeout(function(){order_my_buffer("+service_id+");},500)'></i></a>" +
            " </div> <br/> </div> <div class='ui divider'></div> <div class='extra content'> " +
            "<div class='ui large transparent left icon input'><i class='message outline icon'></i> " +
            "<form id='myReviewer'><input type='text' placeholder='comment...'name='comment' id='ServiceComment"+service_id+"'>" +
            "<input type='hidden' name='serviceId' value='"+service_id+"'>" +
            "<input type='hidden' name='cookieCatch' value='"+getCookie("cookieCatch")+"' id='cookieCatch_add_service'>" +
            "</form>" +
            "<button class='ui button' onclick='rateCounter("+service_id+")' >'Comment'</button> </div> </div> </div> </div></div>";

    review_service=service_id;
    load_url(my_web_url+"/jobFetcher/service_fetcher_review/"+service_id,service_fetcher_review__callback);
}
function service_fetcher_review__callback(data){
    var a=document.getElementById("but_service"+review_service).innerHTML;
    document.getElementById("but_service"+review_service).innerHTML=JSON.stringify(data);
    document.getElementById("but_service"+review_service).innerHTML+=a;
}

function  rateCounter(a) {
    var formData = myApp.formToJSON('#myReviewer');

    load_url_json(my_web_url+"/jobFetcher/rateCounter/",formData,rateCounter_callback);
}
function rateCounter_callback(data) {
    var a=document.getElementById("but_service"+data[0].service_id).innerHTML;
    document.getElementById("but_service"+data[0].service_id).innerHTML="neutral:"+data[0].neu;
    document.getElementById("but_service"+data[0].service_id).innerHTML="Positive:"+data[0].pos;
    document.getElementById("but_service"+data[0].service_id).innerHTML="Negative:"+data[0].neg;
    document.getElementById("but_service"+data[0].service_id).innerHTML+=a;
}
function order_my_buffer(service_id){
    document.getElementById("order_myy_serviceid").value=service_id;
    document.getElementById("order_myy_profid").value=getCookie("cookieCatch");
}
function save_myyorder_intodb(){
    var formData = myApp.formToJSON('#order_myy');
    //myApp.alert('Total Cost :'+JSON.stringify(formData));
    load_url_json(my_web_url+"/jobFetcher/save_myyorder_intodb/",formData,save_myyorder_intodb_callback);
}
function save_myyorder_intodb_callback(data){
    myApp.alert('Total Cost :'+JSON.stringify(data));
    setTimeout(function(){location.reload()},10000);
}
function fetchnotification(){
    load_url(my_web_url+"/jobFetcher/fetchnotification/"+getCookie("cookieCatch"),fetchnotification__callback);
}
function fetchnotification__callback(data) {
    var ulll = document.getElementById("fetchnotification_ull");
    ulll.innerHTML = "";
    for(i = 0 ; i< data.length; i++){
        ulll.innerHTML+="<li class='item-content'> <div class='item-media'><i class='fa fa-heart'></i></div> <div class='item-inner'> <div class='item-title'>"+data[i].msg+"</div> <div class='item-after'></div> </div> </li>";
    }
}

function orderServiceIndex() {
    load_url(my_web_url+"/jobFetcher/orderServiceIndex/",orderServiceIndex_callback);
}
function orderServiceIndex_callback(data){//alert(JSON.stringify(data));
    for(i = 0 ; i< data.length; i++){
        profileFetcherIndex_(data[i]);
    }
}

var profileFetcherIndex__data;
function profileFetcherIndex_(data){
    profileFetcherIndex__data=data;
    load_url(my_web_url+"/jobFetcher/profileFetcher_/"+data.prof_details_id,profileFetcherIndex__callback);
}
function profileFetcherIndex__callback(data){
    addCard_Service("mySearchOrdersIndex",profileFetcherIndex__data.id,"img/nurse1.png",data[0].name,profileFetcherIndex__data.job_type,profileFetcherIndex__data.taluk+" , "+profileFetcherIndex__data.district+" , "+profileFetcherIndex__data.state+"");
}
function make_log_out(){
    setCookie("cookieCatch","",365);
    location.reload();
}

function fetchAddprofile_data(){
    //alert(getCookie("cookieCatch"));
    load_url(my_web_url+"/jobFetcher/fetchAddprofile_data/"+getCookie("cookieCatch"),fetchAddprofile_data__callback);
}
function fetchAddprofile_data__callback(data1) {
    //alert(JSON.stringify(data1[0].name));
    document.getElementById("profName").innerHTML = data1[0].name;
    document.getElementById("profNumb").innerHTML = data1[0].mobile_no;
    document.getElementById("profEmail").innerHTML = data1[0].email;
    document.getElementById("profGender").innerHTML = data1[0].gender;
}


function loginCheck_signIn(){
    var formData = myApp.formToJSON('#loginCheck_signIn');
    //myApp.alert('Total Cost :'+JSON.stringify(formData));
    load_url_json(my_web_url+"/jobFetcher/loginCheck_signIn/",formData,loginCheck_signIn_callback1);
}

function loginCheck_signIn_callback1(data){
    //alert(JSON.stringify(data));
    if(JSON.stringify(data)!='[]') {
        var formData = myApp.formToJSON('#loginCheck_signIn');
        loginCheck_signIn2(data[0].id);
        //setCookie("cookieCatch",JSON.stringify(data[0].id),365);
        //location.reload();
        myApp.alert(JSON.stringify(data));
    }else{
        myApp.alert('Error');
    }
}
function loginCheck_signIn2(data){
    load_url(my_web_url+"/jobFetcher/loginCheck_signIn2/"+data,loginCheck_signIn2_callback1);
}
function loginCheck_signIn2_callback1(data){
    setCookie("cookieCatch",data[0].rnd_no,365);
    location.reload();
}

function fetchwalletdet(){
    load_url(my_web_url+"/jobFetcher/fetchwalletdet/"+getCookie("cookieCatch"),fetchwalletdet__callback);
}
function fetchwalletdet__callback(data){
    var j=document.getElementById("WalletHistory");
    for(i = 0 ; i< data.length; i++){
        /*j.innerHTML+="<div class='row'>"+
            "<div class='col-100 tablet-50'>"+
            "<div class='single-revenue'>"+
            "<div class='revenue-icon'></div>"+
            "<div class='revenue-title'>"+"
        "<h4  id='wallet_tab1'></h4>"+
        "<p>+data[0].service_id+" , "+data[0].cost+" , "+data[0].datetime+</p>"+
        "</div></div></div>"*/
        j.innerHTML+="<ui class='raised very padded text container segment'><p>"+data[0].service_id+" , "+data[0].cost+" , "+data[0].datetime+"</p></ui>";
        //j.innerHTML+="<li class='ui item raised teal container'> <div class='item-media'></div> <div class='item-inner'> <div class='item-title'>"+data[0].service_id+" , "+data[0].cost+" , "+data[0].datetime+"</div> <div class='item-after'></div> </div> </li>";
    }
    fetchwalletdet2();

}

function fetchwalletdet2(){
    load_url(my_web_url+"/jobFetcher/fetchwalletdet2/"+getCookie("cookieCatch"),fetchwalletdet2__callback);
}
function fetchwalletdet2__callback(data){
    var j=document.getElementById("wallet_tab1");
    j.innerHTML=data[0].cost;


}