function messagelist() {
  var div = document.getElementById("list");
  var content = Array();
  var name = Array();
  var date = Array();
  var xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }
  xhr.open("get", "http://127.0.0.1/api/messageList", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var data = xhr.responseText;
      var message = JSON.parse(data)
      for (var i = message.length - 1; i >= 0; i--) {
        content[i] = message[i].content;
        date[i] = message[i].date;
        name[i] = message[i].uname;
        add(name[i], content[i], date[i]);
      }

      function add(name, content, date) {
        var listDiv = document.createElement('div');
        listDiv.setAttribute("class", "listDiv");
        var oDt = document.createElement('h4');
        oDt.innerHTML = name + "说：";
        var oDd1 = document.createElement('p');
        oDd1.innerHTML = content;
        oDd1.className = ("spen");
        var oDd2 = document.createElement('p');
        oDd2.innerHTML = date;
        oDd2.className = ("date");
        div.appendChild(listDiv);
        listDiv.appendChild(oDt);
        listDiv.appendChild(oDd1);
        listDiv.appendChild(oDd2);
      }
    }
  }
  xhr.send();
}

function isNull(str) {
  if (str == "") return true;
  var regu = "^[ ]+$";
  var re = new RegExp(regu);
  return re.test(str);
}

function addmessage() {
  var name = document.getElementById('username').value;
  var lyConten = document.getElementById('lyConten').value;
  if (isNull(name)) {
    alert('署名不能为空');
  } else {
    if (isNull(lyConten)) {
      alert('留言内容不能为空');
    } else {
      var xhr = null;
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
      }
      xhr.open("post", "http://127.0.0.1/api/addMessage", "true");
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.send("name=" + name + "&lyConten=" + lyConten);
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          var data = xhr.responseText;
          if (data) {
            alert("留言成功！");
            window.location.reload(true);
            document.getElementById("username").value = null;
            document.getElementById("lyConten").value = null;
          } else {
            alert('留言失败！');
          }
        }
      }
    }
  }
}

window.onload = function() {
  messagelist();
}