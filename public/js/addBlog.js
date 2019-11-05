function isNull(str) {
  if (str == "") return true;
  var regu = "^[ ]+$";
  var re = new RegExp(regu);
  return re.test(str);
}

function addblog() {
  var blogName = document.getElementById('blogName').value;
  var blogLable = document.getElementById('blogLable').value;
  var blogAbs = document.getElementById('blogAbs').value;
  var blogCon = document.getElementById('blogCon').value;
  if (isNull(blogName)) {
    alert('文章名字不能为空');
  } else {
    if (isNull(blogLable)) {
      alert('文章标签不能为空');
    } else {
      if (isNull(blogAbs)) {
        alert('文章摘要不能为空');
      } else {
        if (isNull(blogCon)) {
          alert('文章内容不能为空');
        } else {
          var xhr = null;
          if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
          } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
          }
          xhr.open("post", "http://yql520.com/api/addBlog", "true");
          xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
          xhr.send("blogName=" + blogName + "&blogLable=" + blogLable + "&blogAbs=" + blogAbs + "&blogCon=" + blogCon);
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
              var data = xhr.responseText;
              if (data) {
                alert("发布成功！");
                window.location.reload(true);
                document.getElementById('blogName').value = null;
                document.getElementById('blogLable').value = null;
                document.getElementById('blogAbs').value = null;
                document.getElementById('blogCon').value = null;
              } else {
                alert('发布失败！');
              }
            }
          }
        }
      }

    }
  }
}