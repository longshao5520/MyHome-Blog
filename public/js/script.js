var arr = ["/public/mp3/1.mp3",
  "/public/mp3/2.mp3",
  "/public/mp3/3.mp3",
  "/public/mp3/4.mp3",
  "/public/mp3/5.mp3",
  "/public/mp3/6.mp3",
  "/public/mp3/7.mp3",
  "/public/mp3/8.mp3",
  "/public/mp3/9.mp3",
  "/public/mp3/10.mp3",
];

function audioPlay() {
  var myAudio = new Audio();
  myAudio.preload = true;
  myAudio.controls = false;
  myAudio.src = arr[Math.floor(Math.random() * arr.length)];
  myAudio.addEventListener('ended', playEndedHandler, false);
  //   myAudio.play();
  myAudio.oncanplaythrough = function() {
    myAudio.play();
  };
  myAudio.volume = 0.1;
  document.getElementById("audioBox").appendChild(myAudio);
  myAudio.loop = false;
  if (myAudio.ended) {
    audioPlay();
  }

  function playEndedHandler() {
    myAudio.src = arr[Math.floor(Math.random() * arr.length)];
    myAudio.play();
    // myAudio.oncanplaythrough = function() {
    //   myAudio.play();
    // };
    !arr.length && myAudio.removeEventListener('ended', playEndedHandler, false);
  }
}

window.onload = function() {
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
window.onscroll = function() {
  //变量t是滚动条滚动时，距离顶部的距离
  // var t = document.documentElement.scrollTop || document.body.scrollTop;
  // var nav = document.getElementsByTagName('nav');
  //当滚动到距离顶部200px时，返回顶部的锚点显示
  // if (t <= 0) {
  // nav.style = "navbar-fixed-top";
  // } else { //恢复正常
  // nav.style -= "navbar-fixed-top";
  // }
}