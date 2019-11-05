function blogList() {
  var div = document.getElementById("blogList");
  var blogID = Array();
  var blogName = Array();
  var blogLable = Array();
  var blogAbs = Array();
  var blogTime = Array();
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }
  xhr.open("get", "http://yql520.com/api/blogList", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var data = xhr.responseText;
      var message = JSON.parse(data)
      for (var i = message.length - 1; i >= 0; i--) {
        blogID[i] = message[i].id;
        blogName[i] = message[i].blog_name;
        blogLable[i] = message[i].blog_lable;
        blogAbs[i] = message[i].blog_abs;
        blogTime[i] = message[i].blog_time;
        add(blogID[i], blogName[i], blogAbs[i], blogTime[i]);
      }

      function add(blogID, blogName, blogAbs, blogTime) {
        var listDiv = document.createElement('div');
        listDiv.setAttribute("class", "listDiv");
        var oDt = document.createElement('h3');
        oDt.innerHTML = "<a href='/doc/" + blogID + "'>" + blogName + "</a>";
        var oDd1 = document.createElement('p');
        oDd1.innerHTML = blogAbs;
        oDd1.className = ("spen");
        var oDd2 = document.createElement('p');
        oDd2.innerHTML = blogTime;
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
blogList();
// window.onload = function() {
//     blogList();
// }