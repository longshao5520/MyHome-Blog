var arr = ["lib/mp3/D1ofaquavibe - The Party Troll(bq).mp3",
    "lib/mp3/Chris Decay - Superstar (Miami Classic Mix)(bq).mp3",
    "lib/mp3/Gavin Henry - Original Mix.mp3",
    "lib/mp3/Klaus Badelt - He's A Pirate.mp3",
    "lib/mp3/SKa2orMusic - 出山(Alan Walker Style Bootleg).mp3",
    "lib/mp3/TomLeevis - J'adore.mp3",
    "lib/mp3/六三四 (Musashi) - 沸き上がる闘志 (燃起的斗志).mp3",
    "lib/mp3/浜口史郎 (はまぐち しろう) - ルフィ猛攻！ (路飞的猛攻).mp3",
    "lib/mp3/高梨康治 (たかなし やすはる) - FAIRY TAIL メインテーマ.mp3",
    "lib/mp3/Geisha-dinoSor.mp3",

];

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