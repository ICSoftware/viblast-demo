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

// Player hook
videojs.hook('beforesetup', function(videoEl, options) {
	videoEl.className += 'video-js';
	options.autoplay = false;
	return options;
});

export let player = videojs(videoTagId, playerOptions, function() { });
// player.addClass('video-js');

// document.querySelector('#unload-player').addEventListener('click', function unloadVideojs() {
// 	player.dispose();
// });

// Creating modal
const ModalDialog = videojs.getComponent('ModalDialog');

export const modal = new ModalDialog(player, {
  // We don't want this modal to go away when it closes.
  temporary: false
});

// Adding content to modal
const el = document.createElement('div');
el.id = 'gleb';
el.innerHTML = `
	<svg height="400" width="450">
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
	</svg>
`;

modal.content(el);

// Modal hook
modal.on('beforemodalclose', function(ev, hash) {
	console.log(arguments)
})

player.addChild(modal);

player.on('pause', function() {
  modal.open();
});


console.log(player.currentTime(20));