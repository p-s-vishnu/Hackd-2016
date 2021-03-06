
if( getCookie("cookieCatch") == "" ){
    myApp.popup('.login-screen');
}


var my_web_url="http://172.20.150.11/zahara/index.php";

function chkpin(){
    var formData = myApp.formToJSON('#signup');
    load_url(my_web_url+"/pinchecker/check/"+formData.pincode,chkpin_callback);
    //alert(load_data);
    //var formData2 = {
    //    'pincode': '9'
    //}
    //myApp.formFromJSON('#signup', formData2);
}

function chkpin_callback(load_data){
    if(JSON.stringify(load_data)!='[]'){
        var formData2 = {
            'pincode': load_data[0].pincode,
            'taluk': ''+load_data[0].taluk,
            'district': ''+load_data[0].district,
            'state': ''+load_data[0].state_name
        };
        myApp.formFromJSON('#signup', formData2);
    }else{
        var formData2 = {
            'taluk': ' ',
            'district': ' ',
            'state': ' '
        };
        myApp.formFromJSON('#signup', formData2);
        myApp.alert('Please Provide Valid PinCode');
    }
}
/*SignUp*/
function signup(){

    var formData = myApp.formToJSON('#signup');
    if(formData.fulname == ''){
        myApp.alert('Please Provide Your Full Name');
    }else if(formData.gender == ''){
        myApp.alert('Please Provide Gender');
    }else if(formData.dob == ''){
        myApp.alert('Please Provide Date of birth');
    }else if(formData.taluk == ''||formData.district == ''||formData.state == ''){
        myApp.alert('Please Provide Your PinCode');
    }else if(validateemail(formData.email) && formData.email == ''){
        myApp.alert('Please Valid Email');
    }else if(validatephno(formData.phno)){
        myApp.alert('Please Valid Phone Number');
    }else if(formData.password == ''){
        myApp.alert('Please Provide Password');
    }else{
        load_url_json(my_web_url+"/login_checker/signup/",formData,signup_callback);
    }
    //alert(JSON.stringify(formData));
}

function signup_callback(data){
    if(JSON.stringify(data)!='[]') {

        setCookie("cookieCatch",JSON.stringify(data),365);
        location.reload();
        //myApp.alert(JSON.stringify(data));
    }else{
        myApp.alert('Error');
    }
}

function validateemail(email) {
    var x = email;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        return true;
    }else{
        return false;
    }
}

function validatephno(phno){
    var phone = phno;
    var phoneNum = phone.replace(/[^\d]/g, '');
    if(phoneNum.length > 6 && phoneNum.length < 11) {  return false;  }
    else{return true;}
}

function isValidDate(dateString)
{
    // First check for the pattern
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};
