'use strict';

let audioContext = new AudioContext();

const start = document.getElementById('button__start');

function startLoop(audioBuffer, pan = 0, rate = 1) {
  let sourceNode = audioContext.createBufferSource();

  sourceNode.buffer = audioBuffer;
  sourceNode.loop = true;
  // sourceNode.loopStart = 2.98;
  // sourceNode.loopEnd = 3.80;

  sourceNode.playbackRate.value = rate;

  let pannerNode = audioContext.createStereoPanner();
  pannerNode.pan.value = pan;

  sourceNode.connect(pannerNode);
  pannerNode.connect(audioContext.destination);

  // sourceNode.start(0, 2.98);
  sourceNode.start(0);
}

// データのフェッチ〜デコード〜再生
// fetch('itsgonnarain.mp3')
fetch('../assets/sounds/1.wav')
.then(function(response) {
  // データを arrayBuffer オブジェクトで受け取る
  // arrayBuffer = JavaScript でバイナリデータを扱う。直接の読み書きはできない
  return response.arrayBuffer();
})
.then(function(arrayBuffer) {
  // audioContextに突っ込んだ arrayBuffer をデコードする
  return audioContext.decodeAudioData(arrayBuffer);
})
.then(function(audioBuffer) {
  // デコードしたArrayBufferをAudioBufferに変換する
  let sourceNode = audioContext.createBufferSource();
  sourceNode.buffer = audioBuffer;
  sourceNode.connect(audioContext.destination);

  start.addEventListener('click', function(){
    // sourceNode.start();
    this.style.display = 'none';
    document.body.classList.add('is-start');
    document.body.classList.remove('is-start');
    document.body.classList.add('is-loop');
    startLoop(audioBuffer, -1);
    startLoop(audioBuffer, 1, 1.002);
  });

  sourceNode.onended = function() {
    console.log('ended');
    document.body.classList.remove('is-start');
    document.body.classList.add('is-loop');
    startLoop(audioBuffer, -1);
    startLoop(audioBuffer, 1, 1.002);
  }
})
.catch(function(e){
  console.error(e);
});

    //要素の取得
    var elements = document.getElementsByClassName("drag-and-drop");

    //要素内のクリックされた位置を取得するグローバル（のような）変数
    var x;
    var y;

    //マウスが要素内で押されたとき、又はタッチされたとき発火
    for(var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("mousedown", mdown, false);
        elements[i].addEventListener("touchstart", mdown, false);
    }

    //マウスが押された際の関数
    function mdown(e) {

        //クラス名に .drag を追加
        this.classList.add("drag");

        //タッチデイベントとマウスのイベントの差異を吸収
        if(e.type === "mousedown") {
            var event = e;
        } else {
            var event = e.changedTouches[0];
        }

        //要素内の相対座標を取得
        x = event.pageX - this.offsetLeft;
        y = event.pageY - this.offsetTop;

        //ムーブイベントにコールバック
        document.body.addEventListener("mousemove", mmove, false);
        document.body.addEventListener("touchmove", mmove, false);
    }

    //マウスカーソルが動いたときに発火
    function mmove(e) {

        //ドラッグしている要素を取得
        var drag = document.getElementsByClassName("drag")[0];

        //同様にマウスとタッチの差異を吸収
        if(e.type === "mousemove") {
            var event = e;
        } else {
            var event = e.changedTouches[0];
        }

        //フリックしたときに画面を動かさないようにデフォルト動作を抑制
        e.preventDefault();

        //マウスが動いた場所に要素を動かす
        drag.style.top = event.pageY - y + "px";
        drag.style.left = event.pageX - x + "px";

        //マウスボタンが離されたとき、またはカーソルが外れたとき発火
        drag.addEventListener("mouseup", mup, false);
        document.body.addEventListener("mouseleave", mup, false);
        drag.addEventListener("touchend", mup, false);
        document.body.addEventListener("touchleave", mup, false);

    }

    //マウスボタンが上がったら発火
    function mup(e) {
        var drag = document.getElementsByClassName("drag")[0];

        //ムーブベントハンドラの消去
        document.body.removeEventListener("mousemove", mmove, false);
        drag.removeEventListener("mouseup", mup, false);
        document.body.removeEventListener("touchmove", mmove, false);
        drag.removeEventListener("touchend", mup, false);

        //クラス名 .drag も消す
        drag.classList.remove("drag");
    }