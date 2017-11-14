const videojs = require('video.js');
require('!style-loader!css-loader!video.js/dist/video-js.css')
require('!script-loader!./dist/viblast-player/viblast.js');

const videoTagId = 'player';
const player = videojs(videoTagId, {}, initVplayer);

function initVplayer() {
	// var viblastApi = viblast('#video-tag')
	// viblastApi.setup({
	// 	stream: "//cdn3.viblast.com/streams/hls/airshow/playlist.m3u8",
	// 	key: "N8FjNTQ3NDdhZqZhNGI5NWU5ZTI"
	// });

	// const viblastApi = videojs(videoTag).viblast;
	this.source({
		src: "//cdn3.viblast.com/streams/hls/airshow/playlist.m3u8",
		key: "N8FjNTQ3NDdhZqZhNGI5NWU5ZTI"
	});
}

// function getVideoTag() {
// 	return document.getElementById(videoTagId);
// }

function unloadVideojs() {
	player.dispose();
}