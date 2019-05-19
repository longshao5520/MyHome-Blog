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