function logout() {
  var xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }
  xhr.open("get", "http://yql520.com/admin/logout", "true");
  xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var data = xhr.responseText;
      // console.log(typeof(data));
      var n_data = JSON.parse(data);
      if (n_data.code == 1) {
        alert(n_data.message);
        window.location.href = '/admin';
        window.location.reload(true);
      }
    }
  }
  xhr.send();
}