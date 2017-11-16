// window.VIDEOJS_NO_DYNAMIC_STYLE = true;

const videojs = require('video.js');
require('!style-loader!css-loader!video.js/dist/video-js.css')

const videoTagId = 'player';

const playerOptions = {
	controls: true,
	autoplay: true,
	fluid: true,
	preload: 'metadata',
	sources: [{
		src: '//vjs.zencdn.net/v/oceans.mp4',
		type: 'video/mp4'
	}],
	controlBar: {
		fullscreenToggle: false
	},
	seekBar: {}
};

videojs.hook('beforesetup', function(videoEl, options) {
	videoEl.className += 'video-js';
	options.autoplay = false;
	return options;
});

let player = videojs(videoTagId, playerOptions, function() { });
// player.addClass('video-js');

// document.querySelector('#unload-player').addEventListener('click', function unloadVideojs() {
// 	player.dispose();
// });

const ModalDialog = videojs.getComponent('ModalDialog');

const modal = new ModalDialog(player, {
  // We don't want this modal to go away when it closes.
  temporary: false
});

const el = document.createElement('div');
el.id = 'gleb';
el.innerText = 'Gleb';
modal.content(el);

modal.on('beforemodalclose', function(ev, hash) {
	console.log(arguments)
})

player.addChild(modal);

player.on('pause', function() {
  modal.open();
});

player.on('play', function() {
  modal.close();
});