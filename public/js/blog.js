var $loginBox = $('#loginBox');
var $registerBox = $('#registerBox');
var $userInfo = $('#userInfo');
$(function() {
    var $loginBox = $('#loginBox');
    var $registerBox = $('#registerBox');
    var $userInfo = $('#userInfo');

    //切换注册面板
    $loginBox.find('a').on('click', function() {
        $registerBox.show();
        $loginBox.hide();
    });

    //切换登录面板
    $registerBox.find('a').on('click', function() {
        $loginBox.show();
        $registerBox.hide();
    });
});


function login() {
    var uname = document.getElementById("username ").value;
    var passwd = document.getElementById("password").value;
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    xhr.open("post", "http://127.0.0.1:3000/api/login", "true");
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    xhr.send("username=" + uname + "&password=" + passwd);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var data = xhr.responseText;
            // console.log(JSON.parse(data));
            // var n_data = JSON.parse(data);
            window.location.reload();
            // alert(n_data.message);
            // var un = document.getElementById("username");
            // var info = document.getElementById("info");
            // un.innerHTML = n_data.userInfo.username;
            // info.innerHTML = "你好，欢迎光临我的博客";
            // if (n_data.userInfo._id == "5d9da076e3a7fb073bce60b0") {
            //     document.getElementById("tishi1").style.display = "block";
            //     info.innerHTML = "你好，你是管理员";
            // } else {
            //     document.getElementById("tishi1").style.display = "none";
            //     info.innerHTML = "你好，欢迎光临我的博客";
            // }
            // if (!n_data.code) {
            //     document.getElementById("userInfo").style.display = "block";
            //     document.getElementById("loginBox").style.display = "none";
            // }
        }
    }
}

function register() {
    var uname = document.getElementById("r_username").value;
    var passwd = document.getElementById("r_password").value;
    var r_passwd = document.getElementById("r_repassword").value;
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    xhr.open("post", "http://127.0.0.1:3000/api/register", "true");
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    xhr.send("username=" + uname + "&password=" + passwd + "&repassword=" + r_passwd);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var data = xhr.responseText;
            // console.log(JSON.parse(data));
            var n_data = JSON.parse(data);
            var tishi = document.getElementById("tishi");
            tishi.innerHTML = n_data.message;
            if (!n_data.code) {
                document.getElementById("loginBox").style.display = "block";
                document.getElementById("registerBox").style.display = "none";
            }
        }
    }
}