const videojs = require('video.js');
require('!style-loader!css-loader!video.js/dist/video-js.css')

const videoTagId = 'player';
const player = videojs(videoTagId, {
	controls: true,
	autoplay: true,
	width: 600
}, initVplayer);

function initVplayer() {
}

function unloadVideojs() {
	player.dispose();
}