function login() {
  var uname = document.getElementById("username ").value;
  var passwd = document.getElementById("password").value;

  var xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }
  xhr.open("post", "http://127.0.0.1/api/login", "true");
  xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
  xhr.send("username=" + uname + "&password=" + passwd);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var data = xhr.responseText;
      console.log(typeof(data));
      var n_data = JSON.parse(data);
      if (n_data.code == 1) {
        alert(n_data.message)
        window.location.href = '/admin';
      }
    }
  }
}