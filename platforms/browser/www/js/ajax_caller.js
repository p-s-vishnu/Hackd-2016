

function load_url(url,callback){
    myApp.showPreloader();
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            callback_ajax (myArr,callback);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function load_url_json(url,json_data,callback){
    myApp.showPreloader();
    $.post(url, json_data,
        function(data)
        {
            callback_ajax (JSON.parse(data),callback);
        });
}

function callback_ajax(data,callback){
    myApp.hidePreloader();
    callback(data);
}

function setCookie(cname,cvalue,exdays){
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000) );
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";"+expires + ";path=/";

}

function getCookie(cname ){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i< ca.length; i++){
        var c = ca[i];
        while(c.charAt(0)== ' ' ){
            c = c.substring(1);

        }
        if(c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function checkCookie(){
    var user = getCookie("username");
    if(user != ""){
        alert('Welcome Again '+ user);
    }else {
        user = prompt("Please eneter your name" , "");
        if (user != "" && user != null){
            setCookie("username" , user,365);
        }
    }
}