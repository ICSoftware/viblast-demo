// window.VIDEOJS_NO_DYNAMIC_STYLE = true;

require('!style-loader!css-loader!video.js/dist/video-js.css')
const videojs = require('video.js');
require('videojs-contrib-dash/es5/videojs-dash.js');
require('videojs-contrib-hls/es5/videojs-contrib-hls.js');

const videoTagId = 'player';

const playerOptions = {
  controls: true,
  autoplay: true,
  fluid: true,
  preload: 'metadata',
  playbackRates: [0.5, 1, 1.5, 2],
  controlBar: {
    children: {
      'playToggle': {},
      'progressControl': {},
      'remainingTimeDisplay': {},
      'playbackRateMenuButton': {},
      'fullscreenToggle': {},
    }
  }
};

// Player hook
videojs.hook('beforesetup', function(videoEl, options) {
  videoEl.className += 'video-js';
  options.autoplay = false;
  return options;
});

export let player = videojs(videoTagId, playerOptions, function() { });

player.src({
  // src: '//vjs.zencdn.net/v/oceans.mp4',
  // type: 'video/mp4'
  // src: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',
  // type: 'application/x-mpegURL'
  src: 'https://s3.amazonaws.com/_bc_dml/example-content/sintel_dash/sintel_vod.mpd',
  // src: 'https://media.axprod.net/TestVectors/v7-MultiDRM-MultiKey/Manifest_1080p.mpd',
  type: 'application/dash+xml'
});

const playbackRateEl = document.getElementById('playback-rate');
function updatePlaybackRate(){
  playbackRateEl.innerText = player.playbackRate();
}
// setInterval(function(){
//   updatePlaybackRate();
// }, 200);

// document.querySelector('#unload-player').addEventListener('click', function unloadVideojs() {
//   player.dispose();
// });

// Creating modal
const ModalDialog = videojs.getComponent('ModalDialog');

export const modal = new ModalDialog(player, {
  // We don't want this modal to go away when it closes.
  temporary: false,
  uncloseable: true
});


modal.on('beforemodalopen', function(ev, hash) {
  player.pause();
})

player.addChild(modal);


const markupTimes = [15, 40.75, 28];
const markupContent = [
  `<svg height="400" width="450">
    <path id="lineAB" d="M 100 350 l 150 -300" stroke="red" stroke-width="3" fill="none" />
    <path id="lineBC" d="M 250 50 l 150 300" stroke="red" stroke-width="3" fill="none" />
    <path d="M 175 200 l 150 0" stroke="green" stroke-width="3" fill="none" />
    <path d="M 100 350 q 150 -300 300 0" stroke="blue" stroke-width="5" fill="none" />
    <!-- Mark relevant points -->
    <g stroke="black" stroke-width="3" fill="black">
      <circle id="pointA" cx="100" cy="350" r="3" />
        <circle id="pointB" cx="250" cy="50" r="3" />
        <circle id="pointC" cx="400" cy="350" r="3" />
    </g>
    <!-- Label the points -->
    <g font-size="30" font-family="sans-serif" fill="black" stroke="none" text-anchor="middle">
        <text x="100" y="350" dx="-30">A</text>
        <text x="250" y="50" dy="-10">B</text>
        <text x="400" y="350" dx="30">C</text>
    </g>
    Sorry, your browser does not support inline SVG.
  </svg>`,

  `<svg width="100" height="100">
    <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
  </svg>`,

  '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
     '<foreignObject width="100%" height="100%">' +
     '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">' +
       '<em>I</em> like ' +
       '<span style="color:white; text-shadow:0 0 2px blue;">' +
       'cheese</span>' +
     '</div>' +
     '</foreignObject>' +
  '</svg>'
];


let currentMarkupIndex;
export function cycleThroughMarkups(){
  if(currentMarkupIndex === undefined || currentMarkupIndex === markupTimes.length -1)
    currentMarkupIndex = 0;
  else
    currentMarkupIndex++;

  player.currentTime(markupTimes[currentMarkupIndex]);

  // Adding content to modal
  const el = document.createElement('div');
  el.innerHTML = markupContent[currentMarkupIndex];
  modal.fillWith(el);
  modal.open();
}

// https://developers.google.com/web/updates/2017/06/play-request-was-interrupted

let playPromise;

player.on('play', function(){
  playPromise = Promise.resolve();
});

export function play(){
  playPromise = player.play();
}

export function pause(){
  playPromise.then(function() {
    player.pause();
  });
}

let video, c1, ctx1, width, height;

window.addEventListener('load', function(){
  video = document.querySelector('video');
  c1 = document.getElementById('c1');
  ctx1 = c1.getContext('2d');
  video.addEventListener('play', function() {
    width = video.videoWidth / 2;
    height = video.videoHeight / 2;
    c1.width = video.videoWidth;
    c1.height = video.videoHeight;
    timerCallback();
  }, false);
});

function timerCallback() {
  if (video.paused || video.ended) {
    return;
  }
  computeFrame();
  requestAnimationFrame(function() {
    timerCallback();
  });
}

function computeFrame() {
  ctx1.drawImage(video, 0, 0, width, height);
  let frame = ctx1.getImageData(0, 0, width, height);
  let l = frame.data.length / 4;

  // for (let i = 0; i < l; i++) {
  //   let r = frame.data[i * 4 + 0];
  //   let g = frame.data[i * 4 + 1];
  //   let b = frame.data[i * 4 + 2];
  //   if (g > 100 && r > 100 && b < 43)
  //     frame.data[i * 4 + 3] = 0;
  // }
  // ctx2.putImageData(frame, 0, 0);
}
