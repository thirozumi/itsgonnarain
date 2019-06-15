'use strict';

const audioContext = new AudioContext();

const sound_path = '../assets/sounds/1.wav';
const start = document.getElementById('start');
const visuals = document.getElementById('visuals');

function startLoop (audioBuffer, pan = 0, rate = 1) {
  let sourceNode = audioContext.createBufferSource();
  let pannerNode = audioContext.createStereoPanner();

  sourceNode.buffer = audioBuffer;
  sourceNode.loop = true;
  sourceNode.playbackRate.value = rate;
  pannerNode.pan.value = pan;
  sourceNode.connect(pannerNode);
  pannerNode.connect(audioContext.destination);

  sourceNode.start();
}

fetch(sound_path)
  .then(function(response) {
    return response.arrayBuffer();
  })
  .then(function(arrayBuffer) {
    return audioContext.decodeAudioData(arrayBuffer);
  })
  .then(function(audioBuffer) {
    start.addEventListener('click', function() {
      const first = document.querySelector('.visual');
      const slide = function () {
      const before = document.querySelector('.is-show');
        if (before) {
          before.classList.remove('is-show');
          const next = before.nextElementSibling;
          if (next) {
            next.classList.add('is-show')
          } else {
            first.classList.add('is-show');
          }
        } else {
          first.classList.add('is-show');
        }
      }
      setInterval(slide, 1017); // 118bpm to m/s
      visuals.style.display = 'block';
      startLoop(audioBuffer, -1, 1);
      startLoop(audioBuffer, 1, 1.002);
    });
  })
  .catch(function(e){
    console.error(e);
  });
