var arr = ["../mp3/D1ofaquavibe - The Party Troll(bq).mp3",
    "../mp3/Chris Decay - Superstar (Miami Classic Mix)(bq).mp3",
    "../mp3/Gavin Henry - Original Mix.mp3",
    "../mp3/Klaus Badelt - He's A Pirate.mp3",
    "../mp3/SKa2orMusic - 出山(Alan Walker Style Bootleg).mp3",
    "../mp3/TomLeevis - J'adore.mp3",
    "../mp3/六三四 (Musashi) - 沸き上がる闘志 (燃起的斗志).mp3",
    "../mp3/浜口史郎 (はまぐち しろう) - ルフィ猛攻！ (路飞的猛攻).mp3",
    "../mp3/高梨康治 (たかなし やすはる) - FAIRY TAIL メインテーマ.mp3",
    "../mp3/Geisha-dinoSor.mp3",
];



function liuyan() {
    var uname = document.getElementById("username").value;
    var lyConten = document.getElementById("lyConten").value;
    console.log(uname, lyConten);
    if (uname == '' && lyConten == '') {
        alert("你还没有输入内容");
    } else {
        var xhr = null;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
        xhr.open("get", "../php/liuyan.php?username=" + uname + "&lyConten=" + lyConten, "true");
        xhr.send(null);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var data = xhr.responseText;
                if (data == "OK") {
                    alert("留言成功！");
		    window.location.reload(true);
                    document.getElementById("username").value = null;
                    document.getElementById("lyConten").value = null;
                } else {
                    alert("留言失败！");
                }
            }
        }
    }
}

function query() {
    var div = document.getElementById("list");
    var content = Array();
    var name = Array();
    var date = Array();
   // var a = "xiao";
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    xhr.open("get", "../php/query.php", "true");
    xhr.send(null);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var data = xhr.responseText;
            data = JSON.parse(data);
            for (var i = 0; i < data.length; i++) {
                content[i] = data[i].content;
                date[i] = data[i].date;
                name[i] = data[i].uname;
                add(name[i], content[i], date[i]);
            }
        }
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


window.onload = function() {
    query();
    audioPlay();
}

window.onbeforeunload = function() {
    var  n  =  window.event.screenX  -  window.screenLeft; 
    var  b  =  n  >  document.documentElement.scrollWidth - 20; 
    if (b  &&  window.event.clientY  <  0  ||  window.event.altKey)  {  //页面关闭

    } else {      // 页面刷新   
        audioPlay();
    } 

}

function audioPlay() {
    var myAudio = new Audio();
    myAudio.preload = true;
    myAudio.controls = false;
    myAudio.src = arr[Math.floor(Math.random() * arr.length)];
    myAudio.addEventListener('ended', playEndedHandler, false);
    myAudio.play();
    myAudio.volume = 0.10;
    document.getElementById("audioBox").appendChild(myAudio);
    myAudio.loop = false;
    if (myAudio.ended) {
        audioPlay();
    }

    function playEndedHandler() {
        myAudio.src = arr[Math.floor(Math.random() * arr.length)];
        myAudio.play();
        // console.log(arr.length);
        !arr.length && myAudio.removeEventListener('ended', playEndedHandler, false);
    }
}